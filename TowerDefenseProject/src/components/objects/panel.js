import { useEffect, useRef } from "react";
import { mouse, towers } from "../pages/GamePage";
import { collision } from "../utils/utils";
import { Tower } from "../objects/tower";
import Canvas from "../objects/Canvas";

export function Panel(x, y) {
  this.x = x;
  this.y = y;
  this.width = 250;
  this.height = 600;
}

Panel.prototype = {
  draw: function (ctx) {
    ctx.fillStyle = "rgba(0, 210, 255, 0.22)";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.fillRect(900, 0, 250, 600);
  },
  Score: function (ctx) {
    ctx.font = `30px Verdana`;
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillText("Score: ", 910, 50, 690);
  },
  Fps: function (ctx) {
    ctx.font = `30px Verdana`;
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillText("FPS: ", 910, 90, 690);
  },
  DTower: function (ctx) {
    //ctx.fillRect(920, 200, 40, 0);
  },
  Play: function (start) {},
  Stop: function (pause) {},
  Time: function (ctx) {},
};
