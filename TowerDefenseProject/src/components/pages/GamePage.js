import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Canvas from '../objects/Canvas';
import Panel from '../objects/Panel';
import { Enemy } from "../objects/enemy";
import { Block } from '../objects/block';
import { Tower } from '../objects/tower';
import { Projectile } from '../objects/projectile';
import { collision, inRange } from '../utils/utils';

import circleImg from "../objects/circle.png";
const circle = new Image();
circle.src = circleImg;

let canvasLeft = 0;
let canvasTop = 0;

export let towers = [];
export let bullets = [];
export let enemies = [];
export let grid = [];
export let towerType = 2;
export let selected = false;
export let lives = 10;
let waveTimer = Date.now();


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
    inCanvas: false,
}

window.addEventListener("keypress", function (e) {
    console.log(mouse.x+', '+mouse.y)
});

const selectTower = () => {
    for (let t = 0; t < towers.length; t++) {
        if (mouse.x && mouse.y && collision(towers[t], mouse)) {
            selected = towers[t];
            break;
        } else {
            selected = false;
        }
    }
}

const placeTower = (type) => {
    grid.forEach(block => {
        if (block.hover && block.type !== 1 && !block.hasTower) {
            towers.push(new Tower(block.x, block.y, type));
            block.hasTower = true;
        }
    })
}


function GamePage() {
    let prev = Date.now(), frameCount = 0;
    
    for (let y = 0; y < 12; y ++) {
        for (let x = 0; x < 18; x ++) {
            grid.push(new Block(x*50, y*50, map1[y][x]));
        }
    }

    const draw = (ctx) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        grid.forEach(block => {
            block.draw(ctx);
            block.mouseIsOver(mouse);
        });
        if (enemies.length === 0 && (Date.now() - waveTimer) / 1000 >= 10) {
            for (let i = 0; i < 5; i++) {
                enemies.push(new Enemy(map1Waypoints[0].x - (i * 60), map1Waypoints[0].y, 1));
            }
            waveTimer = Date.now();
        }
        for (let t = 0; t < towers.length; t++) {
            towers[t].draw(ctx);
            let enemiesInRange = enemies.filter(function (enemy) {
                return towers[t].inRange(enemy);
            });
            //console.log(enemiesInRange);
            towers[t].shoot(bullets, enemiesInRange);
        }
        if (selected) {
            selected.drawRange(ctx);
        }
        for (let b = 0; b < bullets.length; b++){
            bullets[b].draw(ctx);
            bullets[b].move();
            if (bullets[b].x > ctx.canvas.width || bullets[b].x < -10 || bullets[b].y < -10 || bullets[b].y > ctx.canvas.height || bullets[b].end) {
                bullets.splice(b, 1);
                b--;
            }
        }
        for (let e = 0; e < enemies.length; e++) {
            enemies[e].draw(ctx);
            enemies[e].move(map1Waypoints);
            //enemies[e].hit(bullets);
            if (enemies[e].end || enemies[e].dead) {
                lives -= enemies[e].atk;
                enemies.splice(e, 1);
                e--;
            }
        }
        const time = Date.now();
        frameCount++;
        if (time > prev + 1000) {
            let fps = Math.round((frameCount * 1000) / (time - prev));
            prev = time;
            frameCount = 0;
            //console.info(fps);
        }
    }
    const makeEvents = canvas => {
        window.addEventListener('click', selectTower);
        let canvasPos = canvas.getBoundingClientRect();
        canvasLeft = canvasPos.left;
        canvasTop = canvasPos.top;
        window.addEventListener('resize', function (e) {
            canvasPos = canvas.getBoundingClientRect();
            canvasLeft = canvasPos.left;
            canvasTop = canvasPos.top;
        });

        document.addEventListener('mousemove', function (e) {
            mouse.x = e.x - canvasLeft;
            mouse.y = e.y - canvasTop;
            //console.log((mouse.x) + ', ' + (mouse.y));
        });
        //canvas.addEventListener('click', placeTower);
        return() => {
            window.removeEventListener('click', selectTower);
            window.removeEventListener('resize', function (e) {
                canvasPos = canvas.getBoundingClientRect();
            });
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

    return (
        <div>
            <h1>Game Page</h1>
            <div className="container">
                <Canvas draw={draw} events={makeEvents} width='900' height='600' />
                <Panel place={placeTower}/>
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