import { useEffect } from "react";
import { mouse, towers } from "../pages/GamePage";
import { collision } from "../utils/utils";
import { Tower } from "../objects/tower";

export function Panel(x, y) {
  this.x = x;
  this.y = y;
  this.width = 250;
  this.height = 600;

  useEffect(() => {
    const place = () => {
      if (mouse.x && mouse.y && collision(this, mouse)) {
        towers.push(new Tower(this.x, this.y, 4));
      }
    };
    window.addEventListener("click", place);
    return () => {
      window.removeEventListener("click", place);
    };
  }, []);
}

Panel.prototype = {
  draw: function (ctx) {
    ctx.strokeStyle = "white";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    if (mouse.x && mouse.y && collision(this, mouse)) {
      ctx.fillStyle = "rgba(255, 255, 255, .5)";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  },
  Score: function (ctx) {
    let scoreLabel = <h3>Score:</h3>;
  },
  Fps: function (ctx) {},
  Tower: function (getContext) {},
  Play: function (start) {},
  Stop: function (pause) {},
  Time: function (ctx) {},
};