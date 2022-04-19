import React, { useRef, useState } from "react";

function draw(ctx, location) {
  ctx.fillStyle = "deepskyblue";
  ctx.shadowColor = "dodgerblue";
  ctx.shadowBlur = 20;
  ctx.save();
  ctx.scale(SCALE, SCALE);
  ctx.translate(location.x / SCALE - OFFSET, location.y / SCALE - OFFSET);
  ctx.fill(HOOK_PATH);
  ctx.restore();
}

function layeredCanvas() {
  const [locations, setLocations] = React.useState([]);
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, window.innerHeight, window.innerWidth);
    locations.forEach((location) => draw(ctx, location));
  });

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={(e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        draw(ctx, { x: e.clientX, y: e.clientY });
      }}
    />
  );
}

export default layeredCanvas;
