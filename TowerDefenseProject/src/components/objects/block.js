import { useEffect } from 'react';
import { mouse, towers, towerType } from '../pages/GamePage';
import { collision } from '../utils/utils';
import { Tower } from '../objects/tower';

import pathImage from '../assets/images/EnemyPath1.png';
import testImage from '../assets/images/EnemyPath.png';
import tileImage from '../assets/images/TileSet.png';

const path = new Image();
path.src = pathImage;
const tile = new Image();
tile.src = tileImage;
const test = new Image();
test.src = testImage;


/*
 * Nodes (Requirement 2.0.1)
 */
export function Block(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.width = 50;
    this.height = 50;
    this.tower = null;
    this.hover = false;
}

Block.prototype = {
    draw: function (ctx) {
        if (this.type === 0) {
            ctx.drawImage(test, this.x, this.y);
            ctx.strokeStyle = 'grey';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        } else {
            ctx.drawImage(path, this.x, this.y);
        }
        if (this.hover && this.type !== 1) {
            ctx.fillStyle = "rgba(255, 255, 255, .5)";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    },
    mouseIsOver: function (mouse) {
        if (mouse.x && mouse.y && collision(this, mouse)) {
            this.hover = true;
        } else {
            this.hover = false;
        }
    },
    removeSoldTowers: function () {
        if (this.tower && this.tower.sold) {
            this.tower = null;
        }
    }
}