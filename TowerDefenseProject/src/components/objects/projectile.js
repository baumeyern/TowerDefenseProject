
export function Projectile(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    if (this.type === 1) {

    }
    else {
        this.speed = 5;
        this.pwr = 1;


    }
}

Projectile.prototype = {
    draw: function (ctx) {

    },
    update: function () {
        this.x += this.speed;
    }

}