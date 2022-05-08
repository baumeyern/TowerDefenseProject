import React, { useRef, useEffect, useState } from 'react';

import Canvas from '../ui/Canvas';
import Draggable from '../ui/Draggable';
import { Enemy } from "../objects/enemy";
import { Block } from '../objects/block';
import { Tower } from '../objects/tower';
import { convertToRoman } from '../utils/utils';
import Radio from '../ui/Audio';
import Timer from '../ui/Timer';
import Popup from '../ui/Popup';
import { username } from "./LoginPage";
import { postScore } from '../services/HighScoreService';

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
export let finalScore = 0;
export let _ticks = 0;


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
];

export const mouse = {
    x: -1,
    y: -1,
    width: .1,
    height: .1,
}

/**
 * Game Page displays the game board and runs the game logic (Requirement 1.1.0)
 */
const GamePage = () => {
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
    const [open, setOpen] = useState(false);
    const stateRef = useRef(gameState);
    const valuesRef = useRef(values);
    const buttonRef = useRef();
    const currentRefB = buttonRef.current;
    const messageRef = useRef();
    const currentRefM = messageRef.current;

    /**
     * Initialize variables to starting values
     */
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
        //Initialize variables and create game board (Requirement 2.0.0)
        if (stateRef.current === 'start') {
            init();
            for (let y = 0; y < 12; y++) {
                for (let x = 0; x < 18; x++) {
                    grid.push(new Block(x * 50, y * 50, map1[y][x]));
                }
            }
            setGameState('paused');
            stateRef.current = 'paused';
        }
        //Post score and name to database when game ends (Requirement 6.0.9)
        else if (gameState === 'end') {
            postScore(username, values.score.toString());

            finalScore = values.score;
        }
        //Game ends when lives reach 0 (Requirement 6.0.6)
        if (values.lives <= 0) {
            setGameState('end');
        }
        state = gameState;

    }, [values.lives, values.score, gameState]);
    
    useEffect(() => {
        let previous;
        let animationID;

        /**
         * Runs the logic associated with the game such as Enemy spawning, moving, and dying, Towers firing,
         * and Projectiles moving and despawning
         * @param {number} timestamp DOMHighResTimeStamp indicating the point in time when requestAnimationFrame()
         *                              starts to execute callback function. Used to calculate FPS.
         */
        const handleLogic = (timestamp) => {
            let interval = timestamp - previous;
            let fps = Math.round(1000 / interval);
            previous = timestamp;
            if (state === 'playing') {
                //Number of Enemies increases by one per wave (Reqirement 6.0.1)
                if (enemyCounter === 0) {
                    waveCounter++;
                    enemyCounter = waveCounter;
                    spawnCounter = 0;
                    grid.forEach(block => {
                        if (block.tower && block.tower.type === 6) {
                            moneyCounter += 5;
                        }
                    }); 
                }
                //Spawn logic
                if (spawnCounter < waveCounter) {
                    let wait;
                    _ticks++;
                    if (fps) {
                        if (spawnCounter === 0) {
                            wait = fps * 2;
                        }
                        else if (waveCounter >= 50) {
                            wait = fps / 2;
                        }
                        else {
                            wait = fps;
                        }
                        if (_ticks >= wait) {
                            let type;
                            //Tanky enemies have chance to spawn after wave 10
                            if (waveCounter >= 10) {
                                type = Math.floor(Math.random() * 3) + 1;
                            }
                            //Fast enemies have chance to spawn after wave 5 (Requirement 6.0.3)
                            else if (waveCounter >= 5) {
                                type = Math.floor(Math.random() * 2) + 1;
                            }
                            //Only Basic enemies spawn for 4 waves (Reqirement 6.0.2)
                            else {
                                type = 1;
                            }
                            //Boss enemies spawn every 5 rounds (Requirement 6.0.4)
                            if (waveCounter % 5 === 0) {
                                if (spawnCounter >= waveCounter - (waveCounter / 5)) {
                                    type = 4;
                                }
                            }
                            enemies.push(new Enemy(map1Waypoints[0].x - 60, map1Waypoints[0].y, type));
                            spawnCounter++;
                            _ticks = 0;
                        }
                    }
                }
            }
            //Enemy logic
            enemies.forEach((enemy, i, a) => {
                enemy.randomSpeed();
                enemy.scale(waveCounter);
                enemy.doAffliction(state, fps);
                if (state === 'playing') {
                    enemy.move(map1Waypoints);
                }
                if (enemy.end || enemy.dead) {
                    //Enemy gives money and score on defeat (Requirements 7.0.1 & 8.0.0)
                    if (enemy.dead) {
                        scoreCounter += enemy.score;
                        moneyCounter += enemy.value;
                    }
                    //Enemy removes lives on reaching the end based on type (Requirement 3.0.2)
                    else if (enemy.end) {
                        livesCounter -= enemy.atk;
                    }
                    enemyCounter--;
                    a.splice(i, 1);
                }
            });
            //Game Board logic
            grid.forEach(block => {
                block.mouseIsOver(mouse);
                block.removeSoldTowers();
                //Tower logic
                if (block.tower) {
                    let enemiesInRange = enemies.filter(function (enemy) {
                        return block.tower.inRange(enemy);
                    });
                    block.tower.shoot(bullets, enemiesInRange, state, fps);
                }
            });
            //Projectile logic
            bullets.forEach((bullet, i, a) => {
                if (state === 'playing') {
                    bullet.move();
                    //Projectile despawns upon reaching target (Requirement 5.0.2)
                    if (bullet.end) {
                        a.splice(i, 1);
                    }
                }
            });
            animationID = window.requestAnimationFrame(handleLogic)
        }
        handleLogic();

        return () => {
            window.cancelAnimationFrame(animationID);
        }

    }, []);

    useEffect(() => {
        let valuesID;

        /**
         * Updates the values for the DOM components with current values
         */
        const updateValues = () => {
            let currentVals = valuesRef.current;
            if (currentVals.score !== scoreCounter ||
                currentVals.money !== moneyCounter ||
                currentVals.wave !== waveCounter ||
                currentVals.enemyTotal !== enemyCounter ||
                currentVals.enemySpawned !== spawnCounter ||
                currentVals.lives !== livesCounter) {
                setValues({ score: scoreCounter, money: moneyCounter, wave: waveCounter, enemyTotal: enemyCounter, enemySpawned: spawnCounter, lives: livesCounter });
                valuesRef.current = { score: scoreCounter, money: moneyCounter, wave: waveCounter, enemyTotal: enemyCounter, enemySpawned: spawnCounter, lives: livesCounter };
            }
            //Displays sell button if a tower is selected
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

    /**
     * Place Tower onto current Block if player has enough money for use in Draggable EventListener
     * @param {number} type Type of tower to place
     */
    const placeTower = (type) => {
        for (let b = 0; b < grid.length; b++) {
            let block = grid[b];
            if (block.hover && block.type !== 1 && !block.tower) {
                let tower = new Tower(block.x, block.y, type);
                if (tower.price <= values.money) {
                    block.tower = tower;
                    moneyCounter -= tower.price;
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


    //Calls the sell tower function for use in the Sell button
    const sellTower = () => {
        if (selected) {
            let refund = selected.sell();
            moneyCounter += refund;
        }
    }

    useEffect(() => {
        //Sets selected as the Tower the mouse is over for use in the EventListener
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

        //Removes not enough money message from view on mouse-down
        window.addEventListener('mousedown', function (e) {
            if (currentRefM) {
                currentRefM.style.opacity = 0;
            }
        });

        //Removes EventListeners after page re-render
        return () => {
            window.removeEventListener('click', selectTower);
            window.removeEventListener('mousedown', function (e) {
                if (currentRefM) {
                    currentRefM.style.opacity = 0;
                }
            });
        }
    }, [currentRefM, currentRefB]);

    return (
        <div>
            <div className='top'>
                <Radio />
                { /* End game button with confirmation pop-up (Requirement 6.0.7) */ }
                <div className='alert-container'>
                    <div className='top-btn'>
                        <button className='end-btn' onClick={function (e) { setOpen(true); }}>End Game</button>
                    </div>
                        {open ?
                            (<div className='popup-alert'>
                                <main className='alert-content'>
                                    Are you sure?
                                </main>
                                <footer className='alert-footer'>
                                    <button className='yes' onClick={function (e) { setGameState('end') }}>Yes</button>
                                    <button className='no' onClick={function (e) { setOpen(false) }}>No</button>
                                </footer>
                            </div>) :
                            (null)}
                </div>
            </div>
            <div className="waves-scores-wrapper">
                <div className="wave-label">Wave: {convertToRoman(values.wave)}</div>
                <div className='enemy-count'>Enemies: {values.enemyTotal}</div>
                <div className="score-label">Score: {values.score}</div>
                <Timer state={gameState} />
            </div>
            <div className="game">
                { /* Display game board */ }
                <Canvas width='900' height='600' />
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
                            <Draggable place={placeTower} type={5} state={gameState} />
                            <Draggable place={placeTower} type={6} state={gameState} />
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
        </div>
    );
}

export default GamePage;