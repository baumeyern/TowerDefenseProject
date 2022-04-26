import React, { useEffect, useRef } from 'react';
import { mouse } from '../pages/GamePage';

const Canvas = props => {

    const { draw, events, ...rest } = props;
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        events(canvas);
        let animationFrameID;

        const render = () => {
            draw(ctx);
            animationFrameID = window.requestAnimationFrame(render);
        }
        render();

        return () => {
            window.cancelAnimationFrame(animationFrameID);
        }
    }, [draw, events]);

    return <canvas ref={canvasRef} {...rest} />;
}

export default Canvas;