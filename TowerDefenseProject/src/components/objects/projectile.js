
import circleImg from "./circle.png";
const circle = new Image();
circle.src = circleImg;

export function Projectile(x, y, type) {
    this.x = x;
    this.y = y;
    this.width = 5;
    this.height = 5;
    this.type = type;
    if (this.type === 1) {

    }
    else {
        this.speed = 3;
        this.pwr = 1;


    }
}

Projectile.prototype = {
    draw: function (ctx) {
        ctx.drawImage(circle, this.x, this.y, this.width, this.height);
    },
    update: function () {
        this.x += this.speed;
    }

}