
import circleImg from "./circle.png";
import basicImage from '../assets/images/Basic_Amo.png';
import slowImage from '../assets/images/slow_Amo.png';
import aoeImage from '../assets/images/AOE_AMO.png';
import sniperImage from '../assets/images/Sniper_Amo.png';
import poisonImage from '../assets/images/Poison_Amo.png';

const circle = new Image();
circle.src = circleImg;
const basic = new Image();
basic.src = basicImage;
const slow = new Image();
slow.src = slowImage;
const aoe = new Image();
aoe.src = aoeImage;
const sniper = new Image();
sniper.src = sniperImage;
const poison = new Image();
poison.src = poisonImage;

export function Projectile(x, y, type, target) {
    this.x = x;
    this.y = y;
    this.width = 7;
    this.height = 7;
    this.type = type;
    this.target = target;
    this.end = false;
    if (this.type === 1) {
        this.speed = 6;
        this.pwr = 50
    }
    else if (this.type === 2) {
        this.speed = 4;
        this.pwr = 10;
        this.slow = true;
    }
    else if (this.type === 3) {
        this.speed = 5;
        this.pwr = 20;
    }
    else if (this.type === 4) {
        this.speed = 7;
        this.pwr = 100;
    }
    else if (this.type === 5) {
        this.speed = 5;
        this.pwr = 30;
        this.dot = .1;
    }
    else if (this.type === 6) {
        this.speed = 5;
        this.pwr = 5;
    }
}

Projectile.prototype = {
    draw: function (ctx) {
        if (this.type === 1) {
            ctx.drawImage(basic, this.x, this.y, this.width, this.height);
        }
        else if (this.type === 2) {
            ctx.drawImage(slow, this.x, this.y, this.width, this.height);
        }
        else if (this.type === 3) {
            ctx.drawImage(aoe, this.x, this.y, this.width, this.height);
        }
        else if (this.type === 4) {
            ctx.drawImage(sniper, this.x, this.y, this.width, this.height);
        }
        else if (this.type === 5) {
            ctx.drawImage(poison, this.x, this.y, this.width, this.height);
        }
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