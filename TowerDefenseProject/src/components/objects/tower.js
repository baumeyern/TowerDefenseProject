
export function Tower(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.width = 60;
    this.height = 60;
    if (this.type === placeholder) {
        this.health = 3;
        this.fireRate = 2;
        this.projectile = placeholder;
    }
}

Tower.prototype = {
    draw: function (ctx) {

    },
    update: function () {

    }
}
