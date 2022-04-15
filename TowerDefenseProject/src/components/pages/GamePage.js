import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Canvas from '../objects/Canvas';
import { Enemy } from "../objects/enemy";
import { Block } from '../objects/block';
import { Tower } from '../objects/tower';
import { Projectile } from '../objects/projectile';
import { collision } from '../utils/utils';

import circleImg from "../objects/circle.png";
const circle = new Image();
circle.src = circleImg;

export let towers = [];
export let bullets = [];
export let enemies = [];
export let grid = [];
export let path = [];
export let towerType = 1;

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
    x: undefined,
    y: undefined,
    width: .1,
    height: .1,
}

window.addEventListener("keypress", function (e) {
    //console.log(mouse.x + ', ' + mouse.y);
    if (bullets.length > 0) {
        console.log(bullets[0].x + ', ' + bullets[0].y);
    }

});

function GamePage() {
    let prev = Date.now(), frameCount = 0;
    
    for (let y = 0; y < 12; y ++) {
        for (let x = 0; x < 18; x ++) {
            grid.push(new Block(x*50, y*50, map1[y][x]));
        }
    }
    grid.forEach(block => {
        if (block.type === 1) {
            path.push(block);
        }
    });
    console.log(path);
    enemies.push(new Enemy(path[0].x-50, path[0].y, 3))
    const draw = (ctx) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        grid.forEach(block => {
            block.draw(ctx);
        });
        for (let t = 0; t < towers.length; t++) {
            towers[t].draw(ctx);
            towers[t].shoot(bullets);
        }
        for (let b = 0; b < bullets.length; b++){
            bullets[b].draw(ctx);
            bullets[b].move(enemies[0]);
            if (bullets[b].x > ctx.canvas.width || bullets[b].x < -10 || bullets[b].y < -10 || bullets[b].y > ctx.canvas.height || bullets[b].end) {
                bullets.splice(b, 1);
                b--;
            }
        }
        for (let e = 0; e < enemies.length; e++) {
            enemies[e].draw(ctx);
            enemies[e].move(map1Waypoints);
            if (enemies[e].end) {
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

    return (
        <div>
            <h1>Game Page</h1>
            <div className="container">
                <Canvas draw={draw} width='900' height='600' />
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