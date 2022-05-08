import React, { useEffect, useRef} from 'react';

import { grid, enemies, bullets, mouse, selected } from '../pages/GamePage';

/**
 * Compoenent to render the HTML <canvas> component and displays the game board and images
 * @param {Properties} props Properties passed to component
 */
const Canvas = props => {

    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animationFrameID;
        /**
         * Displays images on the <canvas>
         */
        const render = () => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            grid.forEach(block => {
                block.draw(ctx);
                if (block.tower) {
                    block.tower.draw(ctx)
                }
            });
            enemies.forEach(enemy => {
                enemy.draw(ctx);
                enemy.drawHealth(ctx);
            });
            bullets.forEach((bullet, i, a) => {
                bullet.draw(ctx)
            });
            if (selected) {
                selected.drawRange(ctx);
            }
            animationFrameID = window.requestAnimationFrame(render);
        }
        render();

        return () => {
            window.cancelAnimationFrame(animationFrameID);
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        let canvasPos = canvas.getBoundingClientRect();
        let canvasLeft = canvasPos.left;
        let canvasTop = canvasPos.top;
        //Find new Bouding Rect of the <canvas> on window resize or scroll
        const changeBoundRect = (e) => {
            canvasPos = canvas.getBoundingClientRect();
            canvasLeft = canvasPos.left;
            canvasTop = canvasPos.top;
        }
        //Get mouse position based on the <canvas>
        const getCanvasMousePosition = (e) => {
            mouse.x = e.x - canvasLeft;
            mouse.y = e.y - canvasTop;
        }
        window.addEventListener('resize', changeBoundRect);
        window.addEventListener('scroll', changeBoundRect);
        document.addEventListener('mousemove', getCanvasMousePosition);
        return () => {
            window.removeEventListener('resize', changeBoundRect);
            window.removeEventListener('scroll', changeBoundRect);
            document.removeEventListener('mousemove', getCanvasMousePosition);
        }
    }, []);

    return <canvas ref={canvasRef} {...props} />;
}

export default (Canvas);