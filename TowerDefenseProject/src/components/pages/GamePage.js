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
import useSound from "use-sound";
import useAudio from "../objects/Audio";
import { Checkbox } from "@mui/material";
import Audio1 from "../assets/audioClips/songformydeath.mp3";
import Timer from '../objects/timer';


import circleImg from "../objects/circle.png";
const circle = new Image();
circle.src = circleImg;

let canvasLeft = 0;
let canvasTop = 0;

export let towers = [];
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
let waveTimer = Date.now();
let start = true;


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

//Game Audio is off by default
function Radio() {
    const audio = useAudio(Audio1, { volume: 0.8, playbackRate: 1.2 });
    const [isChecked, setIsChecked] = React.useState(false);

    return (
        <div>
            <p className="audio">
                Toggle for audio{" "}
                <Checkbox
                    onChange={() => setIsChecked(!isChecked)}
                    className="audio-bttn"
                    onClick={() => {
                        isChecked ? audio.play() : audio.stop();
                    }}
                />
            </p>
        </div>
    );
}

const AudioFile = () => {
    //Audio();
    return <div>{Radio()}</div>;
};

window.addEventListener("keypress", function (e) {
    
});

const selectTower = () => {
    for (let b = 0; b < grid.length; b++) {
        if (mouse.x && mouse.y && collision(grid[b], mouse) && grid[b].tower) {
            selected = grid[b].tower;
            break;
        } else {
            selected = false;
        }
    }
}


const init = () => {
    towers = [];
    bullets = [];
    enemies = [];
    grid = [];
    selected = false;
    livesCounter = 10;
    moneyCounter = 0;
    scoreCounter = 0;
    waveCounter = 0;
    enemyCounter = 0;
    waveTimer = Date.now();
}

const GamePage = (props) => {
    let prev = Date.now(), frameCount = 0;
    const [paused, setPaused] = useState(true);
    const [show, setShow] = useState(true);
    const [message, setMessage] = useState('');
    const [values, setValues] = useState({
        score: scoreCounter,
        money: moneyCounter,
        wave: 0,
        enemyTotal: 0,
        enemySpawned: 0,
        lives: 10
    });
    //const [waves, setWaves] = useState({wave: 0, enemyTotal: 0});
    //const [lives, setLives] = useState(10);
    //const [enemyTotal, setEnemyTotal] = useState(0);
    const buttonRef = useRef();
    let currentRef = buttonRef.current;
    let enemyTimer = Date.now();
    //const timer = useTimer();
    let enemyInterval;
    let enemiesSpawned = 0;
    if (start) {
        init();
        for (let y = 0; y < 12; y++) {
            for (let x = 0; x < 18; x++) {
                grid.push(new Block(x * 50, y * 50, map1[y][x]));
            }
        }
        start = false;
    }
    /*
    useEffect(() => {
        const spawnEnemies = (ctx) => {
            let interval;
            if (!paused) {
                interval = setInterval(() => {
                    enemies.push(new Enemy(map1Waypoints[0].x - 60, map1Waypoints[0].y, 1));
                }, 2000);
            } else {
                clearInterval(interval);
            }
            return () => clearInterval(interval);
        }
    }, [enemies, paused]);*/

    const pushEnemy = useCallback(() => {
        enemies.push(new Enemy(map1Waypoints[0].x - 60, map1Waypoints[0].y, 1));
        console.log(enemies);
    }, [enemies]);

    const draw = (ctx) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        grid.forEach(block => {
            block.draw(ctx);
            block.mouseIsOver(mouse);
            block.removeSoldTowers();
        });
        if (!paused) {
            if (values.enemyTotal === 0) {
                let updatedWave = values.wave + 1;
                setValues(previousState => { return { ...previousState, wave: updatedWave, enemyTotal: updatedWave, enemySpawned: 0 } });
                let bosses = 0
                if ((updatedWave) % 5 === 0) {
                    bosses = (updatedWave) / 5;
                    //console.log(bosses);
                }
                if (!enemyInterval) {
                    setTimeout(() => {
                        for (let i = 0; i < updatedWave; i++) {
                            let type;
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
                            enemies.push(new Enemy(map1Waypoints[0].x - 100 * (i + 1) + Math.floor(Math.random()*21), map1Waypoints[0].y, type));
                        }
                    }, 2000);
                    
                }
                //setValues({ score: values.score, lives: values.lives, money: values.money, wave: values.wave + 1})
                //waveTimer = Date.now();
                //console.log(enemies);
                //console.log(values.wave);
            }
        }
        
        for (let t = 0; t < towers.length; t++) {
            towers[t].draw(ctx);
            if (!paused) {
                let enemiesInRange = enemies.filter(function (enemy) {
                    return towers[t].inRange(enemy);
                });
                //console.log(enemiesInRange);
                towers[t].shoot(bullets, enemiesInRange);
                if (towers[t].sold) {
                    towers.splice(t, 1);
                    t--;
                }
            }
        }
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
            if (!paused) {
                bullets[b].move();
                if (bullets[b].x > ctx.canvas.width || bullets[b].x < -10 || bullets[b].y < -10 || bullets[b].y > ctx.canvas.height || bullets[b].end) {
                    bullets.splice(b, 1);
                    b--;
                }
            }
        }
        for (let e = 0; e < enemies.length; e++) {
            enemies[e].draw(ctx);
            enemies[e].drawHealth(ctx);
            if (!paused) {
                enemies[e].move(map1Waypoints);
                //enemies[e].hit(bullets);
                if (enemies[e].end || enemies[e].dead) {
                    if (enemies[e].end) {
                        let updatedLives = values.lives - enemies[e].atk;
                        let updatedEnemyTotal = values.enemyTotal - 1;
                        setValues(previousState => { return { ...previousState, enemyTotal: updatedEnemyTotal, lives: updatedLives } });
                        //console.log(lives);
                    }
                    else if (enemies[e].dead) {
                        let updatedScore = values.score + enemies[e].score;
                        let updatedMoney = values.money + enemies[e].value;
                        let updatedEnemyTotal = values.enemyTotal - 1;
                        setValues(previousState => { return { ...previousState, score: updatedScore, money: updatedMoney, enemyTotal: updatedEnemyTotal } });
                    }
                    //let updatedEnemyTotal = waves.enemyTotal - 1;
                    //setWaves({wave: waves.wave, enemyTotal: updatedEnemyTotal});
                    enemies.splice(e, 1);
                    e--;
                }
            }
        }
        if (true) {
            const time = Date.now();
            frameCount++;
            if (time > prev + 1000) {
                let fps = Math.round((frameCount * 1000) / (time - prev));
                prev = time;
                frameCount = 0;
                //console.log(grid.length);
            }
        }
    }
    const placeTower = (type) => {
        grid.forEach(block => {
            if (block.hover && block.type !== 1 && !block.tower) {
                let tower = new Tower(block.x, block.y, type);
                if (tower.price <= values.money) {
                    towers.push(tower);
                    //block.hasTower = true;
                    block.tower = tower;
                    setValues(previousState => { return {...previousState, money: values.money - towers[towers.length - 1].price } });
                }
                else {
                    //console.log('Not Enough Money');
                    setMessage('Not enough money. U R PoOr LoL!');
                }
            }
        });
    }
    const sellTower = () => {
        if (selected) {
            let refund = selected.sell();
            let updatedMoney = values.money + refund;
            setValues(previousState => { return { ...previousState, money: updatedMoney } });
        }
    }
    const makeEvents = canvas => {
        window.addEventListener('click', selectTower);
        window.addEventListener('mousedown', function (e) {
            setMessage('');
        });
        let canvasPos = canvas.getBoundingClientRect();
        canvasLeft = canvasPos.left;
        canvasTop = canvasPos.top;
        const changeBoundRect = (e) => {
            canvasPos = canvas.getBoundingClientRect();
            canvasLeft = canvasPos.left;
            canvasTop = canvasPos.top;
        }
        window.addEventListener('resize', changeBoundRect);
        window.addEventListener('scroll', changeBoundRect);
        document.addEventListener('mousemove', function (e) {
            mouse.x = e.x - canvasLeft;
            mouse.y = e.y - canvasTop;
            //console.log((mouse.x) + ', ' + (mouse.y));
        });
        //canvas.addEventListener('click', placeTower);
        return() => {
            window.removeEventListener('click', selectTower);
            window.removeEventListener('resize', changeBoundRect);
            window.removeEventListener('scroll', changeBoundRect);
            canvas.removeEventListener('mousemove', function (e) {
                mouse.x = e.x - canvasPos.x;
                mouse.y = e.y - canvasPos.y;
                //console.log((mouse.x) + ', ' + (mouse.y));
            });
            canvas.removeEventListener('mouseleave', function (e) {
                mouse.x = undefined;
                mouse.y = undefined;
            });
            //canvas.removeEventListener('click', placeTower);
        }
    }
    //<Panel place={placeTower} paused={!paused}/><div className='timer'>{timer}</div>
    return (
        <div>
            <AudioFile></AudioFile>
            <h1>Game Page</h1>
            <div className="waves-scores-wrapper">
                <div className="wave-label">Wave: {convertToRoman(values.wave)} : [{values.wave}]</div>
                <div className="score-label">Score: {values.score}</div>
                <Timer paused={paused}/>
            </div>
            <div className="game">
                <Canvas draw={draw} events={makeEvents} width='900' height='600' />
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
                            <Draggable place={placeTower} type={1} paused={paused} />
                            <Draggable place={placeTower} type={2} paused={paused} />
                            <Draggable place={placeTower} type={3} paused={paused} />
                            <Draggable place={placeTower} type={4} paused={paused} />
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
                                (<button className='play' onClick={function (e) { setPaused(false); setShow(!show) }}>Play</button>):
                                (<button className='pause' onClick={function (e) { setPaused(true); setShow(!show) }}>Pause</button>)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <Link to='/scores' >
                    <Button variant="outline-light">Leaderboard</Button>
                </Link>
            </div>
        </div>
    );
}

export default GamePage;