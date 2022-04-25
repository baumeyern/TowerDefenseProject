import { useEffect } from "react";
import { Projectile } from "./projectile";
import { mouse } from "../pages/GamePage";
import { collision } from "../utils/utils";
import circleImg from "../../assets/Images/circle.png";
const circle = new Image();
circle.src = circleImg;

export function Tower(x, y, type) {
  this.x = x;
  this.y = y;
  this.type = type;
  this.width = 50;
  this.height = 50;
  this.mid = { x: this.x + this.width / 2, y: this.y + this.height / 2 };
  this.timer = Date.now();
  this.fire = true;
  if (this.type === 1) {
    this.range = 150;
    this.fireRate = 1;
    this.projectile = 1;
    this.price = 10;
  } else if (this.type === 2) {
    this.range = 110;
    this.fireRate = 1;
    this.projectile = 2;
    this.price = 20;
  } else if (this.type === 3) {
    this.range = 120;
    this.fireRate = 1;
    this.projectile = 3;
    this.price = 30;
  } else if (this.type === 4) {
    this.range = 110;
    this.fireRate = 1;
    this.projectile = 2;
    this.price = 40;
  }
}

Tower.prototype = {
  draw: function (ctx) {
    ctx.drawImage(circle, this.x, this.y, this.width, this.height);
  },
  drawRange: function (ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.arc(this.mid.x, this.mid.y, this.range, 0, Math.PI * 2, true);
    ctx.stroke();
  },
  inRange: function (enemy) {
    return (
      (this.mid.x - enemy.mid.x) * (this.mid.x - enemy.mid.x) +
        (this.mid.y - enemy.mid.y) * (this.mid.y - enemy.mid.y) <
      this.range * this.range
    );
  },
  shoot: function (bullets, enemies) {
    if (this.fire && enemies.length > 0) {
      if (this.type === 3) {
        for (let i = 0; i < enemies.length; i++) {
          bullets.push(
            new Projectile(this.mid.x, this.mid.y, this.projectile, enemies[i])
          );
        }
      }
      let enemy = enemies[0];
      if (this.type === 2) {
        enemy = enemies.sort((a, b) => b.speed - a.speed)[0];
      }
      //console.log(enemies);
      if (this.type !== 3) {
        bullets.push(
          new Projectile(this.mid.x, this.mid.y, this.projectile, enemy)
        );
      }
      //{ mid:{ x: enemies[0].mid.x, y: enemies[0].mid.y }}
      this.fire = false;
      this.timer = Date.now();
    } else if ((Date.now() - this.timer) / 1000 >= this.fireRate) {
      this.fire = true;
    }
    //console.log((Date.now() - this.timer) / 1000 );
  },
};
