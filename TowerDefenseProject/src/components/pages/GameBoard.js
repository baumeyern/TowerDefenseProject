import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


let x =0;
export default function GameBoard(){
    const canvasRef = useRef(null);

    useEffect(() => {
        const render = () =>{
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(x, 50, 20, 0,2 * Math.PI);
        ctx.strokeStyle = "black";
        ctx.strokeWidth = 4;
        ctx.fill();
        ctx.stroke();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(0,5,5)";
        for (var x = 0; x < canvas.width; x += 10) {
            for (var y = 0; y < canvas.height; y += 10) {
               ctx.strokeRect(x, y, 10, 10); 
            }
        }
        x += 5;//this is the speed of the object
        requestAnimationFrame(render);
        };
        render();
    }, []);

    return <canvas id="canvas"  ref={canvasRef}  />;
}


