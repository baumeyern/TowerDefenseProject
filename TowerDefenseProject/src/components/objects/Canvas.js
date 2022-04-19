import React, { useEffect, useRef } from "react";
import { mouse } from "../pages/GamePage";
import PropTypes from "prop-types";

const Canvas = (props) => {
  const { draw, ...rest } = props;

  const canvasRef = useRef(null);
  // const { height, width } = props;
  //const ctxRef = useRef(null);

  //   const draws = (ctx, x, y, w, h) => {
  //     ctx.font = `30px Verdana`;
  //     ctx.fillStyle = "rgb(255, 255, 255)";
  //     ctx.fillText("Tower ", 910, 150, 690);
  //     ctx.fillRect(x, y, w, h);
  //   };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    //ctxRef.current = ctx;

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

    draw(ctx);
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

  return (
    <div>
      <canvas ref={canvasRef} {...rest} />
    </div>
  );
};
Canvas.propTypes = {
  draw: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired, // ADDED
  width: PropTypes.number.isRequired, // ADDED
};

export default Canvas;
