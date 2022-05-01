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
import Timer from '../objects/timer';
import Popup from '../objects/Popup';


import circleImg from "../objects/circle.png";
const circle = new Image();
circle.src = circleImg;

export let canvasLeft = 0;
export let canvasTop = 0;

//export let towers = [];
export let bullets = [];
export let enemies = [];
export let deadEnemies = [];
export let grid = [];
export let selected = null;
export let livesCounter = 10;
export let moneyCounter = 20;
export let scoreCounter = 0;
export let waveCounter = 0;
export let enemyCounter = 0;
export let spawnCounter = 0;
export let state = 'start';
export let _ticks = 0;
//export let found = false;
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

export const map1Waypoints = [
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

const GamePage = (props) => {
    //let prev = Date.now(), frameCount = 0;
    const [gameState, setGameState] = useState('start');
    const [show, setShow] = useState(true);
    const [values, setValues] = useState({
        score: 0,
        money: 20,
        wave: 0,
        enemyTotal: 0,
        enemySpawned: 0,
        lives: 10
    });
    const stateRef = useRef(gameState);
    const valuesRef = useRef(values);
    const buttonRef = useRef();
    const currentRefB = buttonRef.current;
    const messageRef = useRef();
    const currentRefM = messageRef.current;
    
    //let waveTimer = Date.now();
    //const mouseMosition = useMousePosition();
    //console.log(valuesRef.current);
    const init = () => {
        bullets = [];
        enemies = [];
        grid = [];
        selected = null;
        livesCounter = 10;
        moneyCounter = 20;
        scoreCounter = 0;
        waveCounter = 0;
        enemyCounter = 0;
        spawnCounter = 0;
        state = 'start';
        stateRef.current = 'start';
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
        if (stateRef.current === 'start') {
            init();
            for (let y = 0; y < 12; y++) {
                for (let x = 0; x < 18; x++) {
                    grid.push(new Block(x * 50, y * 50, map1[y][x]));
                }
            }
            /*livesCounter = values.lives;
            moneyCounter = values.money;
            scoreCounter = values.score;
            waveCounter = values.wave;
            enemyCounter = values.enemyTotal;
            spawnCounter = values.enemySpawned;*/
            setGameState('paused');
            stateRef.current = 'waiting';
        }
        else if (gameState === 'end') {
            //Send score to database and time
        }
        /*
        else if (gameState === 'next') {
            setGameState('playing');
            setValues(previousState => { return { ...previousState, wave: previousState.wave + 1, enemyTotal: previousState.wave + 1, enemySpawned: 0 } });
        }*/
        
        if (gameState === 'playing') {
            if (values.enemyTotal <= 0) {
                //setValues(previousState => { return { ...previousState, wave: previousState.wave + 1, enemyTotal: previousState.wave + 1, enemySpawned: 0 } });
            }
        }

        if (values.lives <= 0) {
            setGameState('end');
        }
        state = gameState;

        
    }, [values, gameState]);
    
    /*useEffect(() => {
        //console.log('spawned: '+values.enemySpawned);
        if (values.enemySpawned > 0) {
            let type;
            if (values.wave > 3) {
                type = Math.floor(Math.random() * 2) + 1;
            } else {
                type = 1;
            }
            if (values.wave % 5 === 0) {
                if (values.enemySpawned > values.wave - (values.wave / 5)) {
                    type = 3;
                }
            }
            enemies.push(new Enemy(map1Waypoints[0].x - 60, map1Waypoints[0].y, type));
            //console.log(enemies);
        }
    }, [values.enemySpawned, values.wave]);*/

    /*useEffect(() => {
        console.log(enemies);
        enemies.forEach((enemy, i, a) => {
            if (enemy.end || enemy.dead) {
                a.splice(i, 1);
            }
        });
    }, [values.enemyTotal]);*/
    /*
    useEffect(() => {
        //let waveTimer = Date.now();
        let previous;
        let spawnID;

        const spawn = (timestamp) => {
            //console.log('runningu')
            let interval = timestamp - previous;
            let fps = Math.round(1000 / interval);
            previous = timestamp;
            //console.log(_ticks);
            if (state === 'playing') {
                if (values.enemySpawned < values.wave) {
                    //const time = Date.now();
                    _ticks++;
                    //let waitTime = 900;
                    /*
                    if (values.enemySpawned === 0) {
                        waitTime = 2000;
                    }
                    else {
                        waitTime = 900;
                    }
                    //console.log(waitTime);
                    if (fps) {
                        if (_ticks >= fps) {
                            setValues(previousState => { return { ...previousState, enemySpawned: previousState.enemySpawned + 1 } });
                            _ticks = 0;
                            //console.log('ran');
                        }
                    }
                } else {
                    //waveTimer = Date.now();
                    //console.log('changing');
                }
            }
            else if (state === 'paused') {
                //console.log(fps);
                //_ticks--;
            }

            /*
            let i = 0;
            let found = false;
            while (!found && i < enemies.length) {
                let enemy = enemies[i];
                if (enemy.end || enemy.dead) {
                    if (enemy.end) {
                        setValues(previousState => {
                            return {
                                ...previousState,
                                enemyTotal: previousState.enemyTotal - 1,
                                lives: previousState.lives - enemy.atk
                            }
                        });
                        found = true;
                        //console.log('end');
                    }
                    else if (enemy.dead) {
                        //console.log('dead');
                        setValues(previousState => {
                            return {
                                ...previousState,
                                score: previousState.score + enemy.score,
                                money: previousState.money + enemy.value,
                                enemyTotal: previousState.enemyTotal - 1
                            }
                        });
                        found = true;
                    }
                    //console.log('splice');
                    enemies.splice(i, 1);
                }
                i++;
            }
            
            if (deadEnemies.length > 0) {
                let enemy = deadEnemies[0]
                if (enemy.dead) {
                    setValues(previousState => {
                        return {
                            ...previousState,
                            score: previousState.score + enemy.score,
                            money: previousState.money + enemy.value,
                            enemyTotal: previousState.enemyTotal - 1
                        }
                    });
                } else if (enemy.end) {
                    setValues(previousState => {
                        return {
                            ...previousState,
                            enemyTotal: previousState.enemyTotal - 1,
                            lives: previousState.lives - enemy.atk
                        }
                    });
                }
                deadEnemies.splice(0, 1);
            }


            if (selected) {
                if (currentRefB) {
                    currentRefB.style.display = 'block';
                }
            } else {
                if (currentRefB) {
                    currentRefB.style.display = 'none';
                }
            }
            
            enemies.forEach((enemy, i, a) => {
                if (enemy.end || enemy.dead) {
                    deadEnemies.push(enemy);
                    a.splice(i, 1);
                }
            });
            
            spawnID = window.requestAnimationFrame(spawn);
        }
        spawn();

        return () => {
            //console.log('canceled');
            window.cancelAnimationFrame(spawnID);
        }
    }, [gameState, values.enemySpawned, values.wave, currentRefB]);
    */
    useEffect(() => {
        let previous;
        let animationID;

        const handleEnemies = (timestamp) => {
            let interval = timestamp - previous;
            let fps = Math.round(1000 / interval);
            previous = timestamp;
            //console.log(_ticks);
            if (state === 'playing') {
                if (enemyCounter === 0) {
                    waveCounter++;
                    enemyCounter = waveCounter;
                    spawnCounter = 0;
                }
                if (spawnCounter < waveCounter) {
                    let wait;
                    _ticks++;
                    if (fps) {
                        if (spawnCounter === 0) {
                            wait = fps * 2;
                        } else {
                            wait = fps;
                        }
                        if (_ticks >= wait) {
                            let type;
                            if (waveCounter > 3) {
                                type = Math.floor(Math.random() * 2) + 1;
                            } else {
                                type = 1;
                            }
                            if (waveCounter % 5 === 0) {
                                if (spawnCounter >= waveCounter - (waveCounter / 5)) {
                                    type = 3;
                                }
                            }
                            enemies.push(new Enemy(map1Waypoints[0].x - 60, map1Waypoints[0].y, type));
                            spawnCounter++;
                            _ticks = 0;
                        }
                    }
                }
            }

            enemies.forEach((enemy, i, a) => {
                if (enemy.end || enemy.dead) {
                    if (enemy.dead) {
                        scoreCounter += enemy.score;
                        moneyCounter += enemy.value;
                    }
                    else if (enemy.end) {
                        livesCounter -= enemy.atk;
                    }
                    enemyCounter--;
                    a.splice(i, 1);
                }
            });
            //console.log('wave: '+ waveCounter+' enemies: '+ enemyCounter +' spawn: '+spawnCounter+' score: '+scoreCounter+' money: '+moneyCounter+' lives: '+livesCounter)
            animationID = window.requestAnimationFrame(handleEnemies)
        }
        handleEnemies();

        return () => {
            window.cancelAnimationFrame(animationID);
        }

    }, []);

    useEffect(() => {
        let valuesID;
        const updateValues = () => {
            let currentVals = valuesRef.current;
            if (currentVals.score !== scoreCounter ||
                currentVals.money !== moneyCounter ||
                currentVals.wave !== waveCounter ||
                currentVals.enemyTotal !== enemyCounter ||
                currentVals.enemySpawned !== spawnCounter ||
                currentVals.lives !== livesCounter) {
                setValues({ score: scoreCounter, money: moneyCounter, wave: waveCounter, enemyTotal: enemyCounter, enemySpawned: spawnCounter, lives: livesCounter });
                valuesRef.current = values;
            }

            if (selected) {
                if (currentRefB) {
                    currentRefB.style.display = 'block';
                }
            } else {
                if (currentRefB) {
                    currentRefB.style.display = 'none';
                }
            }

            valuesID = window.requestAnimationFrame(updateValues);
        }
        updateValues();

        return () => {
            window.cancelAnimationFrame(valuesID);
        }
    }, [values, currentRefB]);

    const draw = (ctx) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        grid.forEach(block => {
            block.draw(ctx);
            block.mouseIsOver(mouse);
            block.removeSoldTowers();
            if (block.tower) {
                block.tower.draw(ctx)
                if (state === 'playing') {
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
            if (currentRefB) {
                currentRefB.style.display = 'block';
            }
        } else {
            if (currentRefB) {
                currentRefB.style.display = 'none';
            }
        }
        enemies.forEach(enemy => {
            enemy.draw(ctx);
            enemy.drawHealth(ctx);
            if (state === 'playing') {
                //console.log('running');
                enemy.move(map1Waypoints);
            }
        });
        /*for (let e = 0; e < enemies.length; e++) {
            let enemy = enemies[e];
            enemy.draw(ctx);
            enemy.drawHealth(ctx);
            if (gameState === 'playing') {
                enemy.move(map1Waypoints);
            }
        }*/
        bullets.forEach((bullet, i, a) => {
            bullet.draw(ctx)
            if (state === 'playing') {
                bullet.move();
                if (bullet.end) {
                    a.splice(i, 1);
                }
            }
        });
        /*
        for (let b = 0; b < bullets.length; b++) {
            bullets[b].draw(ctx);
            if (gameState === 'playing') {
                bullets[b].move();
                if (bullets[b].end) {
                    bullets.splice(b, 1);
                    b--;
                }
            }
        }*/
    }

    const placeTower = (type) => {
        for (let b = 0; b < grid.length; b++) {
            let block = grid[b];
            if (block.hover && block.type !== 1 && !block.tower) {
                let tower = new Tower(block.x, block.y, type);
                if (tower.price <= values.money) {
                    //towers.push(tower);
                    block.tower = tower;
                    setValues(previousState => { return { ...previousState, money: previousState.money - tower.price } });
                    break;
                }
                else {
                    if (currentRefM) {
                        currentRefM.style.opacity = 1;
                    }
                }
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
    useEffect(() => {
        const selectTower = () => {
            for (let b = 0; b < grid.length; b++) {
                if (grid[b].hover && grid[b].tower) {
                    selected = grid[b].tower;
                    break;
                } else {
                    selected = null;
                }
            }
        }
        window.addEventListener('click', selectTower);
        window.addEventListener('mousedown', function (e) {
            if (currentRefM) {
                currentRefM.style.opacity = 0;
            }
        });
        return () => {
            //console.log('removed');
            window.removeEventListener('click', selectTower);
            window.removeEventListener('mousedown', function (e) {
                if (currentRefM) {
                    currentRefM.style.opacity = 0;
                }
            });
        }
    }, [currentRefM, currentRefB]);

    //console.log('rendered');
    const makeEvents = canvas => {
        //console.log('Ran');
        //window.addEventListener('click', selectTower);
        window.addEventListener('mousedown', function (e) {
            if (currentRefM) {
                currentRefM.style.opacity = 0;
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
            //window.removeEventListener('click', selectTower);
            window.removeEventListener('resize', changeBoundRect);
            window.removeEventListener('scroll', changeBoundRect);
            document.removeEventListener('mousemove', getCanvasMousePosition);
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
                <Timer state={gameState} />
            </div>
            <div className="game">
                <Canvas events={makeEvents} width='900' height='600' />
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
                        <div className='sellButton'>
                            <button ref={buttonRef} className='sell' onClick={sellTower}>Sell</button>
                        </div>
                        <div ref={messageRef} className='message'>
                            Not enough money.
                            <br />
                            U R pOoR lOl!
                        </div>
                        <div className='play-pause'>
                            {show ?
                                (<button className='play' onClick={function (e) { setGameState('playing'); setShow(show => !show) }}>Play</button>) :
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
    );
    //<button onClick={function (e) { setGameState('start'); setShow(true); }}>Restart</button>
    /*{gameState === 'waiting' ?
                                (<button className='next-wave' onClick={function (e) { setGameState('next'); }}>Next Wave</button>) :
     * 
     */
}

export default GamePage;