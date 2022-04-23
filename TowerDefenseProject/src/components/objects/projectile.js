
import circleImg from "./circle.png";
const circle = new Image();
circle.src = circleImg;

export function Projectile(x, y, type, target) {
    this.x = x;
    this.y = y;
    this.width = 5;
    this.height = 5;
    this.type = type;
    this.target = target;
    this.end = false;
    if (this.type === 1) {
        this.slow = true;
        this.speed = 5;
        this.pwr = 1
    }
    else {
        this.speed = 5;
        this.pwr = 2;
    }
}

Projectile.prototype = {
    draw: function (ctx) {
        ctx.drawImage(circle, this.x, this.y, this.width, this.height);
    },
    move: function () {
        if (this.target && !this.end) {
            let distX = this.target.mid.x - this.x;
            let distY = this.target.mid.y - this.y;
            let angle = Math.atan2(distY, distX);

            this.x += this.speed * Math.cos(angle);
            this.y += this.speed * Math.sin(angle);
            //console.log((distX < 0 ? -distX : distX) + (distY < 0 ? -distY : distY));
            //console.log(distY);
            if ((distX < 0 ? -distX : distX) + (distY < 0 ? -distY : distY) < this.speed) {
                this.target.hit(this);
                this.end = true;
            }
        }
        else {
            this.end = true;
        }
    },

}