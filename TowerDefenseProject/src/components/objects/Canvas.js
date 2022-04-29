import React, { useEffect, useRef } from 'react';
import useMousePosition from './useMousePosition';

const Canvas = props => {

    const { draw, events, ...rest } = props;
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const event = events(canvas);
        let animationFrameID;
        console.log(event);
        const render = () => {
            draw(ctx);
            animationFrameID = window.requestAnimationFrame(render);
        }
        render();

        return () => {
            console.log('removed');
            window.cancelAnimationFrame(animationFrameID);
        }
    }, [draw, events]);

    return <canvas ref={canvasRef} {...rest} />;
}

export default Canvas;