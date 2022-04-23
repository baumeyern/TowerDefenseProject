import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

import Canvas from "../objects/Canvas";
import { Enemy } from "../objects/enemy";
import { Block } from "../objects/block";
import { Tower } from "../objects/tower";
import { Panel } from "../objects/panel";
import { TowerIcon } from "../objects/towerIcon";
import { Projectile } from "../objects/projectile";
import { collision, inRange } from "../utils/utils";
import useDraggable from "../objects/useDraggable";
import useSound from "use-sound";
import useAudio from "../objects/Audio";
import Audio1 from "../../assets/audioClips/songformydeath.mp3";

import circleImg from "../objects/circle.png";
//import Player from "../objects/Audio";
//import Demo from "../objects/Audio";
const circle = new Image();
circle.src = circleImg;

export let towers = [];
export let bullets = [];
export let enemies = [];
export let grid = [];
export let panel = [];
export let towerIcon = [];
export let panelSize = 302;
export let panelTower = [];
export let towerType = 1;
export let selected = false;
export let lives = 10;

function Radio() {
  const audio = useAudio(Audio1, { volume: 0.8, playbackRate: 1.2 });

  return (
    <div>
      <h1>Sound</h1>
      <button onClick={() => audio.play()}>Play</button>
    </div>
  );
}

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
];

export const mouse = {
  x: -1,
  y: -1,
  width: 0.1,
  height: 0.1,
};

window.addEventListener("keypress", function (e) {
  //console.log(mouse.x + ', ' + mouse.y);
  if (enemies.length > 0) {
    console.log(enemies[0].mid.x + ", " + enemies[0].mid.y);
    console.log(enemies[0].health);
  }
});

// logic for if a tower is already placed
const selectTower = () => {
  for (let t = 0; t < towers.length; t++) {
    if (mouse.x && mouse.y && collision(towers[t], mouse)) {
      selected = towers[t];
      break;
    } else {
      selected = false;
    }
  }
};

const placeTower = () => {
  grid.forEach((block) => {
    if (block.hover && block.type != 1 && !block.hasTower) {
      towers.push(new Tower(block.x, block.y, towerType));
      block.hasTower = true;
    }
  });
};

const DraggableTower = ({ children }) => {
  const TowerRef = useRef(null);
  useDraggable(TowerRef);
  const audio = useAudio(Audio1, { volume: 0.8, playbackRate: 1.5 });

  return (
    <div>
      <div className="DraggableTowers" ref={TowerRef}>
        {children}
      </div>
    </div>
  );
};

const AudioFile = () => {
  //Audio();
  return <div>{Radio()}</div>;
};

function GamePage() {
  let prev = Date.now(),
    frameCount = 0;

  //   for (let i = 100; i < 600; i += 100) {
  //     ctx.strokeRect(1025, i, 125, 100);
  //     ctx.strokeRect(900, i, 125, 100);
  //     towerIcons.push(new towerIcons());
  //   }
  for (let y = 100; y <= 500; y += 125) {
    for (let x = 900; x <= 1080; x += 125) {
      towerIcon.push(new TowerIcon(x, y));
    }
  }
  //towerIcon.push(new TowerIcon(900, 100));

  panel.push(new Panel(900, 0));
  //   for (let y = 0; y < 600; y += 150) {
  //     for (let x = 900; x < 1200; x += 150) {
  //       panel.push(new Panel(x, y));
  //     }
  //   }

  for (let y = 0; y < 12; y++) {
    for (let x = 0; x < 18; x++) {
      grid.push(new Block(x * 50, y * 50, map1[y][x]));
    }
  }
  enemies.push(new Enemy(map1Waypoints[0].x - 50, map1Waypoints[0].y, 3));

  const draw = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    grid.forEach((block) => {
      block.draw(ctx);
      block.mouseIsOver(mouse);
    });
    //panelTower.push(new panelTower(900, 100));

    towerIcon.forEach((towerIcon) => {
      towerIcon.draw(ctx);
      // this is how we place the towers in the panel to drag and drop
      //ctx.drawImage(circle, 900, 100);
    });

    //Panel
    panel.forEach((panel) => {
      panel.draw(ctx);
      panel.Score(ctx);
      panel.Fps(ctx);
      panel.DTower(ctx);
    });
    //Panel.draw(ctx);
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
    for (let b = 0; b < bullets.length; b++) {
      bullets[b].draw(ctx);
      bullets[b].move();
      if (
        bullets[b].x > ctx.canvas.width ||
        bullets[b].x < -10 ||
        bullets[b].y < -10 ||
        bullets[b].y > ctx.canvas.height ||
        bullets[b].end
      ) {
        bullets.splice(b, 1);
        b--;
      }
    }
    // this send out the enemy
    for (let e = 0; e < enemies.length; e++) {
      enemies[e].draw(ctx);
      enemies[e].move(map1Waypoints);
      enemies[e].hit(bullets);
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
  };
  // add a var for which type of tower we are going to add to the canvas
  const makeEvents = (canvas) => {
    window.addEventListener("click", selectTower);
    let canvasPos = canvas.getBoundingClientRect();
    window.addEventListener("resize", function (e) {
      canvasPos = canvas.getBoundingClientRect();
    });

    canvas.addEventListener("mousemove", function (e) {
      mouse.x = e.x - canvasPos.left;
      mouse.y = e.y - canvasPos.top;
      //console.log((mouse.x) + ', ' + (mouse.y));
    });

    canvas.addEventListener("mouseleave", function (e) {
      mouse.x = undefined;
      mouse.y = undefined;
    });

    canvas.addEventListener("click", placeTower);
    return () => {
      window.removeEventListener("click", selectTower);
      window.removeEventListener("resize", function (e) {
        canvasPos = canvas.getBoundingClientRect();
      });
      canvas.removeEventListener("mousemove", function (e) {
        mouse.x = e.x - canvasPos.x;
        mouse.y = e.y - canvasPos.y;
        //console.log((mouse.x) + ', ' + (mouse.y));
      });
      canvas.removeEventListener("mouseleave", function (e) {
        mouse.x = undefined;
        mouse.y = undefined;
      });
      canvas.removeEventListener("click", placeTower);
    };
  };

  return (
    <div>
      <AudioFile></AudioFile>
      <h1>Game Page</h1>
      <DraggableTower>Tower</DraggableTower>
      <div className="container">
        <Canvas draw={draw} events={makeEvents} width="1200" height="900" />
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
