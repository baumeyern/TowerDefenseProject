import type1Image from '../assets/images/Type1.png';
import type2Image from '../assets/images/Type2.png';
import type3Image from '../assets/images/Type3.png';
import type4Image from '../assets/images/NoFace.png';

const type1 = new Image();
type1.src = type1Image;
const type2 = new Image();
type2.src = type2Image;
const type3 = new Image();
type3.src = type3Image;
const type4 = new Image();
type4.src = type4Image;

/**
 * Defines Enemy object with different stats for different types
 * (Requirement 3.0.0)
 * @param {number} x The x coordinate of the top left corner
 * @param {number} y The y coordinate of the top left corner
 * @param {number} type The number indicating the type of enemy
 */
export function Enemy(x, y, type) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.mid = { x: this.x + this.width / 2, y: this.y + this.height / 2 };
    this.type = type;
    this.waypoint = 0;
    this.distance = 0;
    this.currentDot = 0;
    this.dotTimer = null;
    this.speedUp = false;
    this.slowed = false;
    this.end = false;
    this.dead = false;
    this.scaled = false;
    this.slowSpeed = 0;
    //Basic Enemy (Reqirement 3.1.0)
    if (this.type === 1) {
        this.maxHealth = 150;
        this.health = 150;
        this.speed = .5;
        this.atk = 1;
        this.value = 2;
        this.score = 10;
    }
    //Fast Enemy (Reqirement 3.2.0)
    else if (this.type === 2) {
        this.maxHealth = 100;
        this.health = 100;
        this.speed = 2;
        this.atk = 1;
        this.value = 4;
        this.score = 20;
    }
    //Tanky Enemy (Reqirement 3.3.0)
    else if (this.type === 3) {
        this.maxHealth = 200;
        this.health = 200;
        this.speed = .4;
        this.atk = 1;
        this.value = 4;
        this.score = 40;
    }
    //Boss Enemy (Reqirement 3.4.0)
    else if (this.type === 4) {
        this.maxHealth = 500;
        this.health = 500;
        this.speed = .7;
        //Removes 5 lives (Requirement 3.4.1)
        this.atk = 5;
        this.value = 10;
        this.score = 100;
    }
    //this.slowSpeed = this.speed * .75;
}

Enemy.prototype = {
    /**
     * Display image at current x, y coordinates depending on type
     * @param {CanvasRenderingContext2D} ctx Context of <canvas> element
     */
    draw: function (ctx) {
        if (this.type === 1) {
            ctx.drawImage(type1, this.x + 5, this.y + 5, 40, 40);
        }
        else if (this.type === 2) {
            ctx.drawImage(type2, this.x, this.y);
        }
        else if (this.type === 3) {
            ctx.drawImage(type3, this.x, this.y);
        }
        else if (this.type === 4) {
            ctx.drawImage(type4, this.x, this.y);
        }
    },
    /**
     * Displays health bar above enemy
     * @param {CanvasRenderingContext2D} ctx Context of <canvas> element
     */
    drawHealth: function (ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width * (this.health / this.maxHealth), this.height / 8);
    },
    /**
     * Moves the Enemy along the designated path (Requirement 3.0.1)
     * @param {Array} path Array of x, y coordinate waypoints of the map
     */
    move: function (path) {
        if (!this.end) {
            let distX = path[this.waypoint].x - this.x;
            let distY = path[this.waypoint].y - this.y;
            let angle = Math.atan2(distY, distX);

            this.x += this.speed * Math.cos(angle);
            this.y += this.speed * Math.sin(angle);
            this.mid.x = this.x + this.width / 2;
            this.mid.y = this.y + this.height / 2;
            this.distance += this.speed;

            if ((distX < 0 ? -distX : distX) + (distY < 0 ? -distY : distY) < this.speed) {
                this.waypoint++;
            }
        }
        if (this.waypoint >= path.length) {
            this.end = true;
        }
    },
    /**
     * Damages the Enemy by the power of the Projectile and sets afflictions
     * @param {Projectile} bullet Projectile object hitting the Enemy
     */
    hit: function (bullet) {
        this.health -= bullet.pwr;
        if (bullet.slow) {
            if (!this.slowed) {
                this.slowed = true;
            }
        }
        if (bullet.dot) {
            this.currentDot += bullet.dot;
            this.dotTimer = Date.now();
        }
        if (this.health <= 0) {
            this.dead = true;
        }
    },
    /**
     * Applies current afflictions 
     * @param {string} state Current game state
     * @param {number} fps Number indicating 
     */
    doAffliction: function (state, fps) {
        if (this.currentDot) {
            if (state === 'playing') {
                if (Date.now() - this.dotTimer > 1000) {
                    this.health -= this.currentDot;
                    this.dotTimer = Date.now();
                }
            } else if (state === 'paused') {
                if (fps) {
                    this.dotTimer += Math.round(1000 / fps);
                }
            }
            if (this.health <= 0) {
                this.dead = true;
            }
        }
        if (this.slowed) {
            this.speed = this.slowSpeed;
        }
    },
    /**
     * Increases Enemy health based on the wave
     * (Reqirement 6.0.5)
     * @param {number} wave current wave
     */
    scale: function (wave) {
        if (!this.scaled) {
            this.maxHealth *= (1 + (.1 * (wave - 1)));
            this.health *= (1 + (.1 * (wave - 1)));
            this.scaled = true;
        }
    },
    /**
     * Add variable max speed to Enemy
     * (Requirement 3.0.1)
     */
    randomSpeed: function () {
        if (!this.speedUp) {
            this.speed += Math.random() / 5;
            this.slowSpeed = this.speed * .75;
            this.speedUp = true;
        }
    }
}
