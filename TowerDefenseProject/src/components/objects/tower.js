
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
    this.timer = Date.now();
    this.fire = true;
    this.fireRate = 2;
    if (this.type === 1) {
        this.range = 100;
        this.fireRate = 1.5;
        this.projectile = 6;
    }
}

Tower.prototype = {
    draw: function (ctx) {
        ctx.drawImage(circle, this.x, this.y);
    },
    shoot: function (pList) {
        if (this.fire) {
            pList.push(new Projectile(this.x + this.width / 2, this.y + this.height / 2));
            this.fire = false;
            this.timer = Date.now();
        } else if ((Date.now() - this.timer) / 1000 >= this.fireRate) {
            this.fire = true;
        }
        else {
            //console.log(Math.round((Date.now() - this.timer) / 1000));
        }
    }
}
