import React, { useEffect, useRef } from "react";
import { mouse } from "../pages/GamePage";

const Canvas = (props) => {
  const { draw, ...rest } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    draw(ctx);
    let canvasPos = canvas.getBoundingClientRect();
    window.addEventListener("resize", function (e) {
      canvasPos = canvas.getBoundingClientRect();
    });

    canvas.addEventListener("mousemove", function (e) {
      mouse.x = e.x - canvasPos.left;
      mouse.y = e.y - canvasPos.top;
      //console.log((mouse.x) + ', ' + (mouse.y));
    });

    canvas.addEventListener("mouseleave", function (e) {
      mouse.x = undefined;
      mouse.y = undefined;
    });

    //drawGrid(ctx);
    let animationFrameID;

    const render = () => {
      draw(ctx);
      animationFrameID = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameID);
      window.removeEventListener("resize", function (e) {
        canvasPos = canvas.getBoundingClientRect();
      });
      canvas.removeEventListener("mousemove", function (e) {
        mouse.x = e.x - canvasPos.x;
        mouse.y = e.y - canvasPos.y;
        //console.log((mouse.x) + ', ' + (mouse.y));
      });
      canvas.removeEventListener("mouseleave", function (e) {
        mouse.x = undefined;
        mouse.y = undefined;
      });
    };
  }, [draw]);

  return <canvas ref={canvasRef} {...rest} />;
};

export default Canvas;
