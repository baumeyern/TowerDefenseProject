import { useEffect, useRef } from "react";
import { mouse, towers } from "../pages/GamePage";
import { collision } from "../utils/utils";
import { Tower } from "../objects/tower";
import Canvas from "../objects/Canvas";

export function TowerIcon(x, y) {
  this.x = x;
  this.y = y;
  this.width = 125;
  this.height = 125;

  useEffect(() => {}, []);
}

TowerIcon.prototype = {
  draw: function (ctx) {
    // for (let i = 100; i < 600; i += 100) {
    //   ctx.strokeRect(1025, i, 125, 100);
    //   ctx.strokeRect(900, i, 125, 100);
    // }
    ctx.strokeStyle = "white";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    if (mouse.x && mouse.y && collision(this, mouse)) {
      ctx.fillStyle = "rgba(255, 255, 255, .5)";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  },
};
