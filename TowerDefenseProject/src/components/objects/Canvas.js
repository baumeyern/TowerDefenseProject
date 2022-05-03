import React, { useEffect, useRef, memo } from 'react';

import { grid, enemies, bullets, map1Waypoints, state, mouse, selected, moneyCounter } from '../pages/GamePage';

const Canvas = props => {

    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        //console.log('rendered');
        let animationFrameID;
        const render = () => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            grid.forEach(block => {
                /*
                 * 
                 */
                block.draw(ctx);
                block.mouseIsOver(mouse);
                block.removeSoldTowers();
                if (block.tower) {
                    block.tower.draw(ctx)
                    if (state === 'playing') {
                        let enemiesInRange = enemies.filter(function (enemy) {
                            return block.tower.inRange(enemy);
                        });
                        //console.log(enemiesInRange);
                        block.tower.shoot(bullets, enemiesInRange);
                    }
                }
            });
            enemies.forEach(enemy => {
                enemy.draw(ctx);
                enemy.drawHealth(ctx);
                if (state === 'playing') {
                    //console.log('running');
                    enemy.move(map1Waypoints);
                }
            });
            bullets.forEach((bullet, i, a) => {
                bullet.draw(ctx)
                if (state === 'playing') {
                    bullet.move();
                    if (bullet.end) {
                        a.splice(i, 1);
                    }
                }
            });
            if (selected) {
                selected.drawRange(ctx);
            }
            animationFrameID = window.requestAnimationFrame(render);
        }
        render();

        return () => {
            //console.log('removed');
            window.cancelAnimationFrame(animationFrameID);
        }
    }, []);

    useEffect(() => {
        //console.log('rendered');
        const canvas = canvasRef.current;
        let canvasPos = canvas.getBoundingClientRect();
        let canvasLeft = canvasPos.left;
        let canvasTop = canvasPos.top;
        const changeBoundRect = (e) => {
            canvasPos = canvas.getBoundingClientRect();
            canvasLeft = canvasPos.left;
            canvasTop = canvasPos.top;
        }
        const getCanvasMousePosition = (e) => {
            mouse.x = e.x - canvasLeft;
            mouse.y = e.y - canvasTop;
            //console.log((mouse.x) + ', ' + (mouse.y));
        }
        window.addEventListener('resize', changeBoundRect);
        window.addEventListener('scroll', changeBoundRect);
        document.addEventListener('mousemove', getCanvasMousePosition);
        return () => {
            //console.log('removed');
            window.removeEventListener('resize', changeBoundRect);
            window.removeEventListener('scroll', changeBoundRect);
            document.removeEventListener('mousemove', getCanvasMousePosition);
        }
    }, []);

    return <canvas ref={canvasRef} {...props} />;
}

export default (Canvas);