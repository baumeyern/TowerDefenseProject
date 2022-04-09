
import { mouse } from '../pages/GamePage';
import { collision } from '../utils/utils';

export function Block(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
}

Block.prototype = {
    draw: function (ctx) {
        ctx.strokeStyle = 'white';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        if (mouse.x && mouse.y && collision(this, mouse)) {
            ctx.fillStyle = "rgba(255, 255, 255, .5)";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    },
}