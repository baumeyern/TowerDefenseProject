//import { path } from '../pages/GamePage';
import circleImg from "./circle.png";
const circle = new Image();
circle.src = circleImg;


export function Enemy(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.waypoint = 0;
    this.end = false
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
    move: function (path) {
        if (!this.end) {
            let distX = path[this.waypoint].x - this.x;
            let distY = path[this.waypoint].y - this.y;
            let angle = Math.atan2(distY, distX);

            this.x += this.speed * Math.cos(angle);
            this.y += this.speed * Math.sin(angle);
        }
        if (this.x === path[this.waypoint].x && this.y === path[this.waypoint].y) {
            this.waypoint++;
        }
        if (this.waypoint >= path.length) {
            this.end = true;
        }

    }
}
