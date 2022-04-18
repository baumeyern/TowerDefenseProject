import { useEffect } from 'react';
import { Projectile } from './projectile';
import { mouse } from '../pages/GamePage';
import { collision } from '../utils/utils';
import circleImg from "./circle.png";
const circle = new Image();
circle.src = circleImg;



export function Tower(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.width = 50;
    this.height = 50;
    this.timer = Date.now();
    this.fire = true;
    if (this.type === 1) {
        this.range = 150;
        this.fireRate = 1;
        this.projectile = 6;
    }
}

Tower.prototype = {
    draw: function (ctx) {
        ctx.drawImage(circle, this.x, this.y, this.width, this.height);
    },
    drawRange: function (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.range, 0, Math.PI * 2, true);
        ctx.stroke();
    },
    inRange: function (enemy) {
        return (this.x - enemy.x) * (this.x - enemy.x) + (this.y - enemy.y) * (this.y - enemy.y) < this.range * this.range
    },
    shoot: function (bullets, enemies) {
        if (this.fire && enemies.length > 0) {
            bullets.push(new Projectile(this.x + this.width / 2, this.y + this.height / 2, 2, enemies[0] ));
            //{ mid:{ x: enemies[0].mid.x, y: enemies[0].mid.y }}
            this.fire = false;
            this.timer = Date.now();
        } else if ((Date.now() - this.timer) / 1000 >= this.fireRate) {
            this.fire = true;
        }
        //console.log((Date.now() - this.timer) / 1000 );
    },
}
