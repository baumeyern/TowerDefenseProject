import { useEffect, useRef } from "react";
import { mouse, towers } from "../pages/GamePage";
import { collision } from "../utils/utils";
import { Tower } from "../objects/tower";
import Canvas from "../objects/Canvas";

function AppPanel() {
  const canvas = useRef();
  let ctx = null;
  const towerIcons = [
    { x: 910, y: 220, w: 50, h: 50 },
    { x: 910, y: 120, w: 50, h: 50 },
  ];
  let isDown = false;
  let dragTarget = null;
  let startX = null;
  let startY = null;

  // initialize the canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;

    // get context of the canvas
    ctx = canvasEle.getContext("2d");
  }, []);

  useEffect(() => {
    draw();
  }, []);

  // draw rectangle
  const draw = () => {
    ctx.clearRect(
      0,
      0,
      canvas.current.clientWidth,
      canvas.current.clientHeight
    );
    towerIcons.map((info) => drawFillRect(info));
  };

  // draw rectangle with background
  const drawFillRect = (info, style = {}) => {
    const { x, y, w, h } = info;
    const { backgroundColor = "black" } = style;

    ctx.beginPath();
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(x, y, w, h);
  };

  // identify the click event in the rectangle
  const hitBox = (x, y) => {
    let isTarget = null;
    for (let i = 0; i < towerIcons.length; i++) {
      const towerIcon = towerIcons[i];
      if (
        x >= towerIcon.x &&
        x <= towerIcon.x + towerIcon.w &&
        y >= towerIcon.y &&
        y <= towerIcon.y + towerIcon.h
      ) {
        dragTarget = towerIcon;
        isTarget = true;
        break;
      }
    }
    return isTarget;
  };

  const handleMouseDown = (e) => {
    startX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    startY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
    isDown = hitBox(startX, startY);
  };
  const handleMouseMove = (e) => {
    if (!isDown) return;

    const mouseX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    const mouseY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
    const dx = mouseX - startX;
    const dy = mouseY - startY;
    startX = mouseX;
    startY = mouseY;
    dragTarget.x += dx;
    dragTarget.y += dy;
    draw();
  };
  const handleMouseUp = (e) => {
    dragTarget = null;
    isDown = false;
  };
  const handleMouseOut = (e) => {
    handleMouseUp(e);
  };

  return (
    <div className="AppPanel">
      <h3>
        <a
          href="http://www.cluemediator.com"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
      </h3>
      <canvas
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut}
        ref={canvas}
      ></canvas>
    </div>
  );
}

export default AppPanel;

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
    ctx.fillStyle = "rgba(0, 210, 255, 0.22)";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.fillRect(900, 0, 250, 600);
    ctx.font = `30px Verdana`;
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillText("Score: ", 910, 50, 690);
    ctx.beginPath();
    ctx.fillStyle = "rgb(255, 255, 255)";

    for (let i = 100; i < 600; i += 100) {
      ctx.strokeRect(1025, i, 125, 100);
      ctx.strokeRect(900, i, 125, 100);
    }

    // let panelTower = [];
    // const towerIcons = [
    //   { x: 930, y: 120, w: 50, h: 50 },
    //   { x: 1000, y: 220, w: 50, h: 50 },
    // ];
    // panelTower.push(towerIcons);

    // panelTower.forEach((towerIcons) => {
    //   towerIcons.draw(ctx);
    // });
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
