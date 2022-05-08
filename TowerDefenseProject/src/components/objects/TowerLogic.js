class TowersC {
  1001;
}

/**
 * (Requrement 4.0.0)
 * @param {number} x The x coordinate of the top left corner
 * @param {number} y The y coordinate of the top left corner
 * @param {number} type The number indicating the type of enemy
 */
function Towerfunc(x, y, type) {
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
module.exports = Towerfunc;
