import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Canvas from '../objects/Canvas';
import Draggable from '../objects/Draggable';
import Panel from '../objects/Panel';
import { Enemy } from "../objects/enemy";
import { Block } from '../objects/block';
import { Tower } from '../objects/tower';
import { Projectile } from '../objects/projectile';
import { collision, inRange, convertToRoman, useInterval } from '../utils/utils';
import Radio from '../objects/Audio';
import Timer, { useTimer } from '../objects/timer';
import Popup from '../objects/Popup';
import useMousePosition from '../objects/useMousePosition';


import circleImg from "../objects/circle.png";
const circle = new Image();
circle.src = circleImg;

let canvasLeft = 0;
let canvasTop = 0;

//export let towers = [];
export let bullets = [];
export let enemies = [];
export let grid = [];
export let selected = false;
export let livesCounter = 10;
export let moneyCounter = 20;
export let scoreCounter = 0;
export let waveCounter = 0;
export let enemyCounter = 0;
//export let gameState = 'playing';
//export let paused = true;
//let waveTimer = Date.now();
//let start = true;


const map1 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
];

const map1Waypoints = [
    { x: 0, y: 50 },
    { x: 750, y: 50 },
    { x: 750, y: 250 },
    { x: 100, y: 250 },
    { x: 100, y: 400 },
    { x: 700, y: 400 },
    { x: 700, y: 600 },
]

export const mouse = {
    x: -1,
    y: -1,
    width: .1,
    height: .1,
}


window.addEventListener("keypress", function (e) {
    
});




const GamePage = (props) => {
    //let prev = Date.now(), frameCount = 0;
    const [gameState, setGameState] = useState('start');
    const [show, setShow] = useState(true);
    const [message, setMessage] = useState('');
    const [values, setValues] = useState({
        score: 0,
        money: 20,
        wave: 0,
        enemyTotal: 0,
        enemySpawned: 0,
        lives: 10
    });
    const buttonRef = useRef();
    let currentRef = buttonRef.current;
    let waveTimer = Date.now();
    //const mouseMosition = useMousePosition();

    const init = () => {
        //towers = [];
        bullets = [];
        enemies = [];
        grid = [];
        selected = false;
        setValues({
            score: 0,
            money: 20,
            wave: 0,
            enemyTotal: 0,
            enemySpawned: 0,
            lives: 10
        });
    }



    useEffect(() => {
        console.log(gameState);
        if (gameState === 'start') {
            init();
            for (let y = 0; y < 12; y++) {
                for (let x = 0; x < 18; x++) {
                    grid.push(new Block(x * 50, y * 50, map1[y][x]));
                }
            }
            setGameState('paused');
        }
 
        if (gameState === 'end') {
            //Send score to database and time
            console.log('WOW');
        }

        //console.log('LOL');

        if (values.lives <= 0) {
            setGameState('end');
            //console.log('lol');
        }

        if (gameState === 'playing') {
            if (values.enemyTotal === 0) {
                //let updatedWave = values.wave + 1;
                setValues(previousState => { return { ...previousState, wave: previousState.wave + 1, enemyTotal: previousState.wave + 1, enemySpawned: 0 } });
            }
        }

    }, [values, gameState]);

    const newDraw = (ctx) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        grid.forEach(block => {
            block.draw(ctx);
            block.mouseIsOver(mouse);
            block.removeSoldTowers();
            if (block.tower) {
                block.tower.draw(ctx)
                if (gameState === 'playing') {
                    let enemiesInRange = enemies.filter(function (enemy) {
                        return block.tower.inRange(enemy);
                    });
                    //console.log(enemiesInRange);
                    block.tower.shoot(bullets, enemiesInRange);
                }
            }
        });
        if (selected) {
            selected.drawRange(ctx);
            if (currentRef) {
                currentRef.style.display = 'Block';
            }
        } else {
            if (currentRef) {
                currentRef.style.display = 'None';
            }
        }
        for (let e = 0; e < enemies.length; e++) {
            let enemy = enemies[e];
            enemy.draw(ctx);
            enemy.drawHealth(ctx);
            if (gameState === 'playing') {
                enemy.move(map1Waypoints);
            }
        }
        for (let b = 0; b < bullets.length; b++) {
            bullets[b].draw(ctx);
            if (gameState === 'playing') {
                bullets[b].move();
                if (bullets[b].end) {
                    bullets.splice(b, 1);
                    b--;
                }
            }
        }

    }



    //console.log(mousePosition.x)
    const draw = (ctx) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        grid.forEach(block => {
            block.draw(ctx);
            block.mouseIsOver(mouse);
            block.removeSoldTowers();
            if (block.tower) {
                block.tower.draw(ctx)
                if (gameState === 'playing') {
                    let enemiesInRange = enemies.filter(function (enemy) {
                        return block.tower.inRange(enemy);
                    });
                    //console.log(enemiesInRange);
                    block.tower.shoot(bullets, enemiesInRange);
                }
            }
        });
        if (gameState === 'playing') {
            if (values.enemyTotal === 0) {
                let updatedWave = values.wave + 1;
                setValues(previousState => { return { ...previousState, wave: previousState.wave + 1, enemyTotal: previousState.wave + 1, enemySpawned: 0 } });
                /*waveTimer = Date.now();
                let bosses = 0;
                if ((updatedWave) % 5 === 0) {
                    bosses = (updatedWave) / 5;
                    console.log(bosses);
                }
                setTimeout(() => {
                    for (let i = 0; i < updatedWave; i++) {
                        let type
                        if (values.wave > 3) {
                            type = Math.floor(Math.random() * 2) + 1;
                        } else {
                            type = 1;
                        }
                        if (bosses > 0 && i === (updatedWave) - (bosses)) {
                            type = 3;
                            bosses--;
                            //console.log(type);
                        }
                        enemies.push(new Enemy(map1Waypoints[0].x - 100 * (i + 1) + Math.floor(Math.random() * 21), map1Waypoints[0].y, type));
                    }
                }, 2000);*/

                //setValues({ score: values.score, lives: values.lives, money: values.money, wave: values.wave + 1})
                //waveTimer = Date.now();
                //console.log(enemies);
                //console.log(values.wave);
            } /*else if (values.enemySpawned < values.wave) {
                const time = Date.now();
                let waitTime = 0;
                if (values.enemySpawned === 0) {
                    waitTime = 2000;
                }
                else {
                    waitTime = 900;
                }
                if (time >= waveTimer + waitTime) {
                    //console.log(bosses);
                    let type;
                    if (values.wave > 3) {
                        type = Math.floor(Math.random() * 2) + 1;
                    } else {
                        type = 1;
                    }
                    if (values.wave % 5 === 0) {
                        if (values.enemySpawned >= values.wave - (values.wave / 5)) {
                            //console.log('ran');
                            type = 3;
                        }
                        //console.log(type);
                    }
                    enemies.push(new Enemy(map1Waypoints[0].x - 60, map1Waypoints[0].y, type));
                    let updatedSpawn = values.enemySpawned + 1;
                    setValues(previousState => { return { ...previousState, enemySpawned: updatedSpawn } });
                    //console.log(enemies);
                    //enemysSpawned++;
                    waveTimer = time;
                }
            }*/
        }
        
        /*for (let t = 0; t < towers.length; t++) {
            //towers[t].draw(ctx);
            if (gameState === 'playing') {
                let tower = towers[t];
                let enemiesInRange = enemies.filter(function (enemy) {
                    return tower.inRange(enemy);
                });
                //console.log(enemiesInRange);
                towers[t].shoot(bullets, enemiesInRange);
                if (towers[t].sold) {
                    towers.splice(t, 1);
                    t--;
                }
            }
        }*/
         if (selected) {
             selected.drawRange(ctx);
             if (currentRef) {
                 currentRef.style.display = 'Block';
             }
         } else if (!selected) {
             if (currentRef) {
                 currentRef.style.display = 'None';
             }
         }
        
        for (let b = 0; b < bullets.length; b++){
            bullets[b].draw(ctx);
            if (gameState === 'playing') {
                bullets[b].move();
                if (bullets[b].end) {
                    bullets.splice(b, 1);
                    b--;
                }
            }
        }
        for (let e = 0; e < enemies.length; e++) {
            let enemy = enemies[e];
            enemy.draw(ctx);
            enemy.drawHealth(ctx);
            if (gameState === 'playing') {
                enemy.move(map1Waypoints);
                //enemies[e].hit(bullets);
                if (enemy.end || enemy.dead) {
                    if (enemy.end) {
                        setValues(previousState => { return { ...previousState, enemyTotal: previousState.enemyTotal - 1, lives: previousState.lives - enemy.atk } });
                        //console.log(lives);
                    }
                    else if (enemy.dead) {
                        setValues(previousState => { return { ...previousState, score: previousState.score + enemy.score, money: previousState.money + enemy.value, enemyTotal: previousState.enemyTotal - 1 } });
                    }
                    //let updatedEnemyTotal = waves.enemyTotal - 1;
                    //setWaves({wave: waves.wave, enemyTotal: updatedEnemyTotal});
                    enemies.splice(e, 1);
                    e--;
                }
            }


        }

        /*
        if (true) {
            const time = Date.now();
            frameCount++;
            if (time > prev + 1000) {
                let fps = Math.round((frameCount * 1000) / (time - prev));
                //prev = time;
                frameCount = 0;
                //console.log(grid.length);
            }
        }*/
    }

    const spawn = (fps) => {
        if (gameState === 'playing') {
            if (values.enemySpawned < values.wave) {
                const time = Date.now();
                let waitTime = 0;
                if (values.enemySpawned === 0) {
                    waitTime = 2000;
                }
                else {
                    waitTime = 900;
                }
                //console.log(waitTime);
                if (time >= waveTimer + waitTime) {
                    //console.log(bosses);
                    let type;
                    if (values.wave > 3) {
                        type = Math.floor(Math.random() * 2) + 1;
                    } else {
                        type = 1;
                    }
                    if (values.wave % 5 === 0) {
                        if (values.enemySpawned >= values.wave - (values.wave / 5)) {
                            //console.log('ran');
                            type = 3;
                        }
                        //console.log(type);
                    }
                    enemies.push(new Enemy(map1Waypoints[0].x - 60, map1Waypoints[0].y, type));
                    //let updatedSpawn = values.enemySpawned + 1;
                    setValues(previousState => { return { ...previousState, enemySpawned: previousState.enemySpawned + 1 } });
                    //console.log(enemies);
                    waveTimer = time;
                }
            } else {
                waveTimer = Date.now();
            }
        } else if (gameState === 'paused') {
            if (fps) {
                waveTimer += (1000 / fps);
            }
        }
        for (let e = 0; e < enemies.length; e++) {
            let enemy = enemies[e];
            if (enemy.end || enemy.dead) {
                if (enemy.end) {
                    setValues(previousState => { return { ...previousState, enemyTotal: previousState.enemyTotal - 1, lives: previousState.lives - enemy.atk } });
                }
                else if (enemy.dead) {
                    setValues(previousState => { return { ...previousState, score: previousState.score + enemy.score, money: previousState.money + enemy.value, enemyTotal: previousState.enemyTotal - 1 } });
                }
                enemies.splice(e, 1);
                e--;
            }
        }
    }
    const placeTower = (type) => {
        let towerPlaced = false;
        for (let b = 0; b < grid.length; b++) {
            let block = grid[b];
            if (block.hover && block.type !== 1 && !block.tower) {
                let tower = new Tower(block.x, block.y, type);
                if (tower.price <= values.money) {
                    //towers.push(tower);
                    block.tower = tower;
                    setValues(previousState => { return { ...previousState, money: previousState.money - tower.price } });
                    towerPlaced = true;
                    break;
                }
            }
        }
        if (!towerPlaced) {
            setMessage('Not enough money. U R pOoR lOl!');
        }

    }
    const selectTower = () => {
        for (let b = 0; b < grid.length; b++) {
            if (grid[b].hover && grid[b].tower) {
                selected = grid[b].tower;
                break;
            } else {
                selected = false;
            }
        }
    }
    const sellTower = () => {
        if (selected) {
            let refund = selected.sell();
            //let updatedMoney = values.money + refund;
            setValues(previousState => { return { ...previousState, money: previousState.money + refund } });
        }
    }
    //console.log('rendered');
    const makeEvents = canvas => {
        //console.log('Ran');
        window.addEventListener('click', selectTower);
        window.addEventListener('mousedown', function (e) {
            if (message !== '') {
                setMessage('');
            }
            
        });
        let canvasPos = canvas.getBoundingClientRect();
        canvasLeft = canvasPos.left;
        canvasTop = canvasPos.top;
        const changeBoundRect = (e) => {
            canvasPos = canvas.getBoundingClientRect();
            canvasLeft = canvasPos.left;
            canvasTop = canvasPos.top;
        }
        const getCanvasMousePosition = (e) => {
            mouse.x = e.x - canvasLeft;
            mouse.y = e.y - canvasTop;
            //console.log((mouse.x) + ', ' + (mouse.y));
        }
        window.addEventListener('resize', changeBoundRect);
        window.addEventListener('scroll', changeBoundRect);
        document.addEventListener('mousemove', getCanvasMousePosition);
        return () => {
            //console.log('removed');
            window.removeEventListener('click', selectTower);
            window.removeEventListener('resize', changeBoundRect);
            window.removeEventListener('scroll', changeBoundRect);
            document.removeEventListener('mousemove', getCanvasMousePosition);
            /*canvas.removeEventListener('mouseleave', function (e) {
                mouse.x = undefined;
                mouse.y = undefined;
            });*/
        }
    }
    //<Panel place={placeTower} paused={!paused}/><div className='timer'>{timer}</div>
    return (
        <div>
            <Radio />
            <h1>Game Page</h1>
            <div className="waves-scores-wrapper">
                <div className="wave-label">Wave: {convertToRoman(values.wave)}</div>
                <div className='enemy-count'>Enemies: {values.enemyTotal}</div>
                <div className="score-label">Score: {values.score}</div>
                <Timer state={gameState}/>
            </div>
            <div className="game">
                <Canvas draw={newDraw} spawn={spawn} events={makeEvents} width='900' height='600' />
                <div className="panel">
                    <div className='panel-top'>
                        <div className='money'>
                            ${values.money}
                        </div>
                        <div className='lives'>
                            Lives: {values.lives}
                        </div>
                    </div>
                    <div className='panel-mid'>
                        <div className='towers'>
                            <Draggable place={placeTower} type={1} state={gameState} />
                            <Draggable place={placeTower} type={2} state={gameState} />
                            <Draggable place={placeTower} type={3} state={gameState} />
                            <Draggable place={placeTower} type={4} state={gameState} />
                        </div>
                    </div>
                    <div className='panel-bottom'>
                        <div ref={ buttonRef } className='sellButton'>
                            <button className='sell' onClick={ sellTower }>Sell</button>
                        </div>
                        <div className='message'>
                            {message}
                        </div>
                        <div className='play-pause'>
                            {show ?
                                (<button className='play' onClick={function (e) { setGameState('playing'); setShow(show => !show) }}>Play</button>):
                                (<button className='pause' onClick={function (e) { setGameState('paused'); setShow(show => !show) }}>Pause</button>)}
                        </div>
                    </div>
                </div>
            </div>
            <Popup state={gameState} />
            <div className="container">
                <Link to='/scores' >
                    <Button variant="outline-light">Leaderboard</Button>
                </Link>
            </div>
            <button onClick={function (e) { setValues(previousState => { return { ...previousState, lives: previousState.lives - 1 } }); }}>lives</button>
        </div>
    )
    //<button onClick={function (e) { setGameState('start'); setShow(true); }}>Restart</button>
}

export default GamePage;