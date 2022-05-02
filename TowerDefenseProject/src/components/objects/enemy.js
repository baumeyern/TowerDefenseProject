import { useEffect } from 'react';
import { collision } from '../utils/utils';
import circleImg from "./circle.png";
import type1Image from '../assets/images/Type1.png';
import type2Image from '../assets/images/Type2.png';
import type3Image from '../assets/images/Type3.png';
import type4Image from '../assets/images/NoFace.png';

const circle = new Image();
circle.src = circleImg;
const type1 = new Image();
type1.src = type1Image;
const type2 = new Image();
type2.src = type2Image;
const type3 = new Image();
type3.src = type3Image;
const type4 = new Image();
type4.src = type4Image;
/*
 * 
 * 
 */
export function Enemy(x, y, type) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.mid = { x: this.x + this.width / 2, y: this.y + this.height / 2 };
    this.type = type;
    this.waypoint = 0;
    this.distance = 0;
    this.hasDot = 0;
    this.end = false;
    this.dead = false;
    if (this.type === 1) {
        this.maxHealth = 150;
        this.health = 150;
        this.speed = .5 + Math.random() / 5;
        this.atk = 1;
        this.value = 2;
        this.score = 100;
    }
    else if (this.type === 2) {
        this.maxHealth = 100;
        this.health = 100;
        this.speed = 2 + Math.random() / 5;
        this.atk = 1;
        this.value = 5;
        this.score = 200;
    }
    else if (this.type === 3) {
        this.maxHealth = 200;
        this.health = 200;
        this.speed = .4 + Math.random() / 5;
        this.atk = 2;
        this.value = 7;
        this.score = 400;
    }
    else if (this.type === 4) {
        this.maxHealth = 500;
        this.health = 500;
        this.speed = .7 + Math.random() / 5;
        this.atk = 5;
        this.value = 20;
        this.score = 1000;
    }

}

Enemy.prototype = {
    draw: function (ctx) {
        if (this.type === 1) {
            ctx.drawImage(type1, this.x + 5, this.y + 5, 40, 40);
        }
        else if (this.type === 2) {
            ctx.drawImage(type2, this.x, this.y);
        }
        else if (this.type === 3) {
            ctx.drawImage(type3, this.x, this.y);
        }
        else if (this.type === 4) {
            ctx.drawImage(type4, this.x, this.y);
        }
    },
    drawHealth: function (ctx) {
        /*ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.width, this.height / 8);*/
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width * (this.health / this.maxHealth), this.height / 8);
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
            this.distance += this.speed;

            if ((distX < 0 ? -distX : distX) + (distY < 0 ? -distY : distY) < this.speed) {
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
                }
                    this.speed -= .25;
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
            this.speed *= 0.85;
        }
        if (bullet.dot) {
            this.hasDot += bullet.dot;
        }
        if (this.health <= 0) {
            this.dead = true;
        }
    },
    doDot: function () {
        if (this.hasDot) {
            this.health -= this.hasDot;
            if (this.health <= 0) {
                this.dead = true;
            }
        }
    }
}
