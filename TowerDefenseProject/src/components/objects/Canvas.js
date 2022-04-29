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
        console.log('update');
        const render = () => {
            draw(ctx);
            animationFrameID = window.requestAnimationFrame(render);
        }
        render();

        return () => {
            //console.log('removed');
            window.cancelAnimationFrame(animationFrameID);
            event();
        }
    }, [draw]);

    return <canvas ref={canvasRef} {...rest} />;
}

export default Canvas;