import React, { useEffect, useRef } from 'react';
import useMousePosition from './useMousePosition';

const Canvas = props => {

    const { draw, spawn, events, ...rest } = props;
    const canvasRef = useRef(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let previous = 0;

        const event = events(canvas);
        let animationFrameID;
        //console.log('render');
        const render = (timestamp) => {
            let interval = timestamp - previous;
            let fps = Math.round(1000 / interval);
            //console.log(fps);
            previous = timestamp;
            draw(ctx);
            spawn(fps);
            animationFrameID = window.requestAnimationFrame(render);
        }
        render();

        return () => {
            //console.log('removed');
            window.cancelAnimationFrame(animationFrameID);
            event();
        }
    }, [draw, spawn, events]);

    return <canvas ref={canvasRef} {...rest} />;
}

export default Canvas;