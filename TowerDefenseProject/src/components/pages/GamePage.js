import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

import Canvas from "../objects/Canvas";
import { Enemy } from "../objects/enemy";
import { Block } from "../objects/block";
import { Tower } from "../objects/tower";
import { Panel } from "../objects/panel";
import { Projectile } from "../objects/projectile";
import { collision } from "../utils/utils";

import circleImg from "../objects/circle.png";
const circle = new Image();
circle.src = circleImg;

export let towers = [];
export let bullets = [];
export let enemies = [];
export let grid = [];
export let panel = [];

export const mouse = {
  x: undefined,
  y: undefined,
  width: 0.1,
  height: 0.1,
};

window.addEventListener("keypress", function (e) {
  console.log(mouse.x + ", " + mouse.y);
});

function GamePage() {
  let frameCount = 0;

  panel.push(new Panel(900, 0));
  for (let y = 0; y < 600; y += 150) {
    for (let x = 900; x < 1200; x += 150) {
      panel.push(new Block(x, y));
    }
  }
  //const test = new Enemy(400, 10, 3);
  //towers.push(new Tower(850, 200, 4));
  for (let y = 0; y < 600; y += 50) {
    for (let x = 0; x < 900; x += 50) {
      grid.push(new Block(x, y));
    }
  }

  const draw = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //panel.draw(ctx);
    ctx.fillStyle = "rgba(0, 210, 255, 0.22)";
    ctx.fillRect(900, 0, 250, 600);
    ctx.font = `30px Verdana`;
    //ctx.colorText = "white";
    ctx.fillStyle = "rgb(255, 255, 255)";

    ctx.fillText("Score: ", 910, 50, 690);

    grid.forEach((block) => {
      block.draw(ctx);
    });

    //test.draw(ctx)
    //test.update();
    for (let t = 0; t < towers.length; t++) {
      towers[t].draw(ctx);
      if (frameCount % 120 === 0) {
        towers[t].shoot(bullets);
        //console.log(frameCount);
        if (bullets.length > 0) {
          //console.log(bullets.length);
        }
      }
    }
    for (let b = 0; b < bullets.length; b++) {
      bullets[b].draw(ctx);
      bullets[b].update();
      if (bullets[b].x > ctx.canvas.width) {
        bullets.splice(b, 1);
        b--;
      }
    }

    frameCount++;
  };

  return (
    <div>
      <h1>Game Page</h1>
      <div className="container">
        <Canvas draw={draw} width="1200" height="900"></Canvas>
      </div>

      <div className="container">
        <Link to="/scores">
          <Button variant="outline-light">Leaderboard</Button>
        </Link>
      </div>
    </div>
  );
}

export default GamePage;
