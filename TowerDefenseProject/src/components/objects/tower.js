import { Projectile } from './projectile';
import fireImage from '../assets/images/circle.png';
import waterImage from '../assets/images/WaterTurtleTower.png';
import nutImage from '../assets/images/Nut.png';
import coinImage from '../assets/images/Bitcoin.png';
import snakeImage from '../assets/images/Snake.png';
import sniperImage from '../assets/images/Sniper.png';

const fire = new Image();
fire.src = fireImage;
const water = new Image();
water.src = waterImage;
const nut = new Image();
nut.src = nutImage;
const coin = new Image();
coin.src = coinImage;
const snake = new Image();
snake.src = snakeImage;
const sniper = new Image();
sniper.src = sniperImage;


/**
 * (Requrement 4.0.0)
 * @param {number} x The x coordinate of the top left corner
 * @param {number} y The y coordinate of the top left corner
 * @param {number} type The number indicating the type of enemy
 */
export function Tower(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.width = 50;
    this.height = 50;
    this.mid = { x: this.x + this.width / 2, y: this.y + this.height / 2 };
    this.timer = Date.now();
    this.fire = true;
    this.sold = false;

    
    //Basic Tower (Reqirement 4.1.0)
    if (this.type === 1) {
        this.range = 150;
        this.fireRate = 1;
        this.projectile = 1;
        this.price = 10;
    }

    //Slow Tower (Reqirement 4.2.0)
    else if (this.type === 2) {
        this.range = 110;
        this.fireRate = 1.5;
        this.projectile = 2;
        this.price = 20;
    }
    
    //AOE Tower (Reqirement 4.3.0)
    else if (this.type === 3) {
        this.range = 130;
        this.fireRate = 1;
        this.projectile = 3;
        this.price = 30;
    }

    //Sniper Tower (Reqirement 4.4.0)
    else if (this.type === 4) {
        this.range = 400;
        this.fireRate = 3;
        this.projectile = 4;
        this.price = 40;
    }

    //Poison Tower (Reqirement 4.5.0)
    else if (this.type === 5) {
        this.range = 120;
        this.fireRate = 2;
        this.projectile = 5;
        this.price = 30;
    }

    //Bank Tower (Reqirement 4.6.0)
    else if (this.type === 6) {
        this.range = 0;
        this.price = 40;
    }
}

Tower.prototype = {
    /**
     * Display image at current x, y coordinates depending on type
     * @param {CanvasRenderingContext2D} ctx Context of <canvas> element
     */
    draw: function (ctx) {
        if (this.type === 1) {
            ctx.drawImage(fire, this.x, this.y);
        }
        else if (this.type === 2) {
            ctx.drawImage(nut, this.x, this.y)
        }
        else if (this.type === 3) {
            ctx.drawImage(water, this.x, this.y);
        }
        else if (this.type === 4) {
            ctx.drawImage(sniper, this.x, this.y);
        }
        else if (this.type === 5) {
            ctx.drawImage(snake, this.x, this.y);
        }
        else if (this.type === 6) {
            ctx.drawImage(coin, this.x, this.y);
        }
    },

    /**
     * Displays range circle
     * @param {CanvasRenderingContext2D} ctx Context of <canvas> element
     */
    drawRange: function (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.arc(this.mid.x, this.mid.y, this.range, 0, Math.PI * 2, true);
        ctx.stroke();
    },
    /**
     * Calculates in Enemy is in range
     * @param {Enemy} enemy Enemy object to check
     * @returns {boolean} true if enemy is in range of Tower, false otherwise
     */
    inRange: function (enemy) {
        return (this.mid.x - enemy.mid.x) * (this.mid.x - enemy.mid.x) + (this.mid.y - enemy.mid.y) * (this.mid.y - enemy.mid.y) < this.range * this.range
    },
    /**
     * Fires Projectile(s) at Enemies depending on Tower type
     * @param {Array} bullets Array of Projectiles
     * @param {Array} enemies Array of Enemy objects in range
     * @param {string} state Current state of the game
     * @param {number} fps Nember representing the frames per second of the game
     */
    shoot: function (bullets, enemies, state, fps) {
        if (state === 'playing' && this.fire && enemies.length > 0) {
            if (this.type === 3) {
                for (let i = 0; i < enemies.length; i++) {
                    bullets.push(new Projectile(this.mid.x, this.mid.y, this.projectile, enemies[i]));
                }
            }
            let sortDist = enemies.sort((a, b) => b.distance - a.distance);
            let enemy = sortDist[0];
            if (this.type === 2) {
                enemy = sortDist.sort((a, b) => b.speed - a.speed)[0];
            } else if (this.type === 4) {
                enemy = sortDist.sort((a, b) => b.health - a.health)[0];
            }
            if (this.type !== 3 && this.type !== 6) {
                bullets.push(new Projectile(this.mid.x, this.mid.y, this.projectile, enemy));
            }
            this.fire = false;
            this.timer = Date.now();
        }
        if (state === 'paused') {
            if (fps) {
                this.timer += Math.round(1000 / fps);
            }
        }
        else if ((Date.now() - this.timer) / 1000 >= this.fireRate) {
            this.fire = true;
        }
    },

    /**
     * Indicates Tower should be removed
     * @returns {number} Partial refund of price
     */
    sell: function () {
        this.sold = true;
        return this.price / 2;
    }
}
