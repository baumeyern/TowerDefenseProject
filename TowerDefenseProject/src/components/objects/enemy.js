
import circleImg from "./circle.png";
const circle = new Image();
circle.src = circleImg;


export function Enemy(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    if (this.type === 1) {

    }
    else {
        this.health = 5;
        this.speed = .5;
        this.atk = 2;
        this.width = 50;
        this.height = 50;
    }
}

Enemy.prototype = {
    draw: function (ctx) {
        ctx.drawImage(circle, this.x, this.y);
    },
    update: function () {
        this.x -= this.speed;
    }
}
