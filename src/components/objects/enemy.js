import { type } from "@testing-library/user-event/dist/type";
import { collision } from "../utils/utils";
import circleImg from "./circle.png";
import type2Img from "./Type2.png";
const circle = new Image();
circle.src = circleImg;
const type2 = new Image();
type2.src = type2Img;

export function Enemy(x, y, type) {
  this.x = x;
  this.y = y;
  this.width = 50;
  this.height = 50;
  this.mid = { x: this.x + this.width / 2, y: this.y + this.height / 2 };
  this.type = type;
  this.waypoint = 0;
  this.end = false;
  this.dead = false;
  if (this.type === 1) {
    this.maxHealth = 150;
    this.health = 150;
    this.speed = 0.5;
    this.atk = 1;
    this.value = 5;
    this.score = 100;
  } else if (this.type === 2) {
    this.maxHealth = 100;
    this.health = 100;
    this.speed = 2;
    this.atk = 1;
    this.value = 10;
    this.score = 200;
  } else if (this.type === 3) {
    this.maxHealth = 500;
    this.health = 500;
    this.speed = 0.75;
    this.atk = 5;
    this.value = 50;
    this.score = 1000;
  }
}

Enemy.prototype = {
  draw: function (ctx) {
    ctx.drawImage(circle, this.x, this.y);
    //this isnt working rn
    if (Enemy.type === 2) {
      ctx.drawImage(type2, this.x, this.y);
      console.log("here is type 2");
    }
  },
  drawHealth: function (ctx) {
    ctx.strokeStyle = "red";
    ctx.strokeRect(this.x, this.y, this.width, this.height / 6);
    ctx.fillStyle = "red";
    ctx.fillRect(
      this.x,
      this.y,
      this.width * (this.health / this.maxHealth),
      this.height / 6
    );
  },
  move: function (path) {
    if (!this.end) {
      let distX = path[this.waypoint].x - this.x;
      let distY = path[this.waypoint].y - this.y;
      let angle = Math.atan2(distY, distX);

      this.x += this.speed * Math.cos(angle);
      this.y += this.speed * Math.sin(angle);
      this.mid.x = this.x + this.width / 2;
      this.mid.y = this.y + this.height / 2;
      if (
        (distX < 0 ? -distX : distX) + (distY < 0 ? -distY : distY) <
        this.speed
      ) {
        this.waypoint++;
      }
    }
    //if (Math.round(this.x) === path[this.waypoint].x && Math.round(this.y) === path[this.waypoint].y) {
    if (this.waypoint >= path.length) {
      this.end = true;
    }
  },
  /*
    hit: function (bullets) {
        for (let i = 0; i < bullets.length; i++) {
            if (collision(this, bullets[i])) {
                this.health -= bullets[i].pwr;
                if (bullets[i].slow) {
                    this.speed -= .25;
                }
                bullets.splice(i, 1);
                i--;
            }
        }
        if (this.health <= 0) {
            this.dead = true;
        }
       
    }*/
  hit: function (bullet) {
    this.health -= bullet.pwr;
    if (bullet.slow) {
      this.speed *= 0.75;
    }
    if (this.health <= 0) {
      this.dead = true;
    }
  },
};
