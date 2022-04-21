
import { collision } from '../utils/utils';
import circleImg from "./circle.png";
const circle = new Image();
circle.src = circleImg;


export function Enemy(x, y, type) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.mid = { x: this.x + this.width / 2, y: this.y + this.height / 2 };
    this.type = type;
    this.waypoint = 0;
    this.end = false
    this.dead = false;
    if (this.type === 1) {

    }
    else {
        this.health = 3;
        this.speed = .5;
        this.atk = 2;
    }
}

Enemy.prototype = {
    draw: function (ctx) {
        ctx.drawImage(circle, this.x, this.y);
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
        }
        if (this.x === path[this.waypoint].x && this.y === path[this.waypoint].y) {
            this.waypoint++;
        }
        if (this.waypoint >= path.length) {
            this.end = true;
        }
    },
    hit: function (bullets) {
        for (let i = 0; i < bullets.length; i++) {
            if (collision(this, bullets[i])) {
                this.health -= bullets[i].pwr;
                bullets.splice(i, 1);
                i--;
            }
        }
        if (this.health <= 0) {
            this.dead = true;
        }
    }
}
