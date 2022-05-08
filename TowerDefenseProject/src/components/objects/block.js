import { collision } from '../utils/utils';
import pathImage from '../assets/images/EnemyPath1.png';
import tileImage from '../assets/images/EnemyPath.png';

const path = new Image();
path.src = pathImage;
const tile = new Image();
tile.src = tileImage;

/**
 * Defines Block object for use in the game board
 * (Requirement 2.0.1)
 * @param {number} x The x coordinate of the top left corner
 * @param {number} y The y coordinate of the top left corner
 * @param {number} type The number indicating the type of cell
 */
export function Block(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.width = 50;
    this.height = 50;
    this.hover = false;
    //Tower placed on block (Requirement 4.0.1)
    this.tower = null;
}

Block.prototype = {
    /**
     * Display image at current x, y coordinates depending on type and highlights placable
     * tiles when the mouse is over them
     * @param {CanvasRenderingContext2D} ctx Context of <canvas> element
     */
    draw: function (ctx) {
        if (this.type === 0) {
            ctx.drawImage(tile, this.x, this.y);
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
    /**
     * Checks if mouse is currently over the cell
     * @param {object} mouse Mouse location relative to the <canvas>
     */
    mouseIsOver: function (mouse) {
        if (mouse.x && mouse.y && collision(this, mouse)) {
            this.hover = true;
        } else {
            this.hover = false;
        }
    },
    /**
     * Removes Tower if sold
     */
    removeSoldTowers: function () {
        if (this.tower && this.tower.sold) {
            this.tower = null;
        }
    }
}