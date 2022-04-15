import { useEffect } from 'react';
import { mouse, towers, towerType } from '../pages/GamePage';
import { collision } from '../utils/utils';
import { Tower } from '../objects/tower';



export function Block(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.width = 50;
    this.height = 50;
    this.hasTower = false;

    useEffect(() => {
        const place = () => {
            if (mouse.x && mouse.y && collision(this, mouse) && this.type != 1 && !this.hasTower) {
                towers.push(new Tower(this.x, this.y, towerType));
                this.hasTower = true;
                //console.log(towers.length);
            }
        }
        window.addEventListener('click', place);
        return () => {
            window.removeEventListener('click', place);
        }
    }, []);
}

Block.prototype = {
    draw: function (ctx) {
        if (this.type === 0) {
            ctx.strokeStyle = 'white';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = 'black';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        
        if (mouse.x && mouse.y && collision(this, mouse) && this.type != 1) {
            ctx.fillStyle = "rgba(255, 255, 255, .5)";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}