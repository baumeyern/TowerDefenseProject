
import { Projectile } from './projectile';
import circleImg from "./circle.png";
const circle = new Image();
circle.src = circleImg;



export function Tower(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.width = 50;
    this.height = 50;
    this.fire = false;
    if (this.type === 1) {
        this.health = 3;
        this.fireRate = 2;
        this.projectile = 6;
    }
}

Tower.prototype = {
    draw: function (ctx) {
        ctx.drawImage(circle, this.x, this.y);
    },
    shoot: function (pList) {
        if (this.fire = true) {
            pList.push(new Projectile(this.x + this.width, this.y + this.height / 2));
        }
    }
}
