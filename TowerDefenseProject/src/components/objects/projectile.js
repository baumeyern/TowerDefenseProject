
import circleImg from "./circle.png";
const circle = new Image();
circle.src = circleImg;

export function Projectile(x, y, type) {
    this.x = x;
    this.y = y;
    this.width = 5;
    this.height = 5;
    this.type = type;
    this.end = false;
    if (this.type === 1) {

    }
    else {
        this.speed = 8;
        this.pwr = 1;
    }
}

Projectile.prototype = {
    draw: function (ctx) {
        ctx.drawImage(circle, this.x, this.y, this.width, this.height);
    },
    move: function (target) {
        let distX = (target.x + target.width/2) - this.x;
        let distY = (target.y + target.height/2) - this.y;
        let angle = Math.atan2(distY, distX);

        this.x += this.speed * Math.cos(angle);
        this.y += this.speed * Math.sin(angle);

        if ((distX < 0 ? -distX : distX) + (distY < 0 ? -distY : distY) < 2) {
            this.end = true;
        }
    }

}