import React, { useEffect, useState, useRef } from 'react';

import circleImg from "./circle.png";
import fireImage from '../assets/images/FireTower.png';
import waterImage from '../assets/images/WaterTurtleTower.png';

const circle = new Image();
circle.src = circleImg;
const fire = new Image();
fire.src = fireImage;
const water = new Image();
water.src = waterImage;

const Draggable = (props) => {

    const { place, type, state, ...rest } = props;
    const [pressed, setPressed] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const ref = useRef();
    let imgSrc;

    useEffect(() => {
        const dragRef = ref.current;

        const handleMouseMove = (e) => {
            if (pressed) {
                setPosition({
                    x: position.x + e.movementX,
                    y: position.y + e.movementY
                });
                //console.log(e.movementX + ', ' + e.movementY);
                //console.log(e.x + ', ' + e.y);
                //mouse.x = e.x;
                //mouse.y = e.y;
                e.preventDefault();
            }
        }
        const handleMouseDown = (e) => {
            if (state === 'playing') {
                setPressed(true);
            }
        }
        const handleMouseUp = (e) => {
            if (pressed) {
                setPressed(false);
                place(type);
                setPosition({ x: 0, y: 0 });
            }
        }

        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);
        dragRef.addEventListener('mousedown', handleMouseDown);
        return () => {
            //console.log('remove');
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
            dragRef.removeEventListener('mousedown', handleMouseDown);
        }
    }, [position, pressed, state]);

    useEffect(() => {
        if (ref.current) {
            ref.current.style.transform = `translate(${position.x}px, ${position.y}px)`
        }
    }, [position]);

    if (type === 1) {
        imgSrc = fire.src;
    }
    else if (type === 2) {
        imgSrc = water.src;
    }
    else {
        imgSrc = circle.src;
    }

    return (
        <div ref={ref} {...rest}>
            <img src={imgSrc} alt='Tower' width='50' height='50' />
        </div>
    )
}

export default Draggable;