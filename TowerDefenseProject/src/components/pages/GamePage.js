import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Canvas from '../objects/Canvas';
import { Enemy } from "../objects/enemy.js";
import { Block } from '../objects/block';
import { collision } from '../utils/utils';

import circleImg from "../objects/circle.png";
const circle = new Image();
circle.src = circleImg;

export let towers = [];
export let bullets = [];
export let enemies = [];
export let grid = [];

export const mouse = {
    x: undefined,
    y: undefined,
    width: .1,
    height: .1,
}

window.addEventListener("click", function (e) {
    console.log(mouse.x + ', ' + mouse.y);
});

function GamePage() {
    const test = new Enemy(400, 10, 3);
    for (let y = 0; y < 600; y += 50) {
        for (let x = 0; x < 900; x += 50) {
            grid.push(new Block(x, y));
        }
    }
    grid.forEach(block => {
        console.log(block.x + ', ' + block.y);
    });

    const draw = (ctx) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        grid.forEach(block => {
            block.draw(ctx);
        });
        test.draw(ctx)
        test.update();
    }

    return (
        <div>
            <h1>Game Page</h1>
            <div className="container">
                <Canvas draw={draw} width='900' height='600'/>
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