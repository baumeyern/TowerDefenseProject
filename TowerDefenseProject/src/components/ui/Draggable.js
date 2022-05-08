import React, { useEffect, useState, useRef } from 'react';

import fireImage from '../assets/images/circle.png';
import waterImage from '../assets/images/WaterTurtleTower.png';
import nutImage from '../assets/images/Nut.png';
import coinImage from '../assets/images/Bitcoin.png';
import snakeImage from '../assets/images/Snake.png';
import sniperImage from '../assets/images/Sniper.png';

const fire = new Image();
fire.src = fireImage;
const water = new Image();
water.src = waterImage;
const nut = new Image();
nut.src = nutImage;
const coin = new Image();
coin.src = coinImage;
const snake = new Image();
snake.src = snakeImage;
const sniper = new Image();
sniper.src = sniperImage;

/**
 * Drag & Drop component for use in placing the Towers
 * (Requirement 10.0.0)
 * @param {Properties} props Properties passed to component
 */
const Draggable = (props) => {
    /** 
     * @param {function} place Logic for placing Towers
     * @param {number} type type of Tower to place
     * @param {string} state current game state
     */
    const { place, type, state, ...rest } = props;
    const [pressed, setPressed] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const ref = useRef();
    let imgSrc, message;

    useEffect(() => {
        const dragRef = ref.current;

        //Tracks movement of mouse for use in mouse-move EventListener
        const handleMouseMove = (e) => {
            if (pressed) {
                setPosition({
                    x: position.x + e.movementX,
                    y: position.y + e.movementY
                });
                e.preventDefault();
            }
        }
        //Sets component as clicked if game is running for use in mouse-down EventListener
        const handleMouseDown = (e) => {
            if (state === 'playing') {
                setPressed(true);
            }
        }
        //Places tower if possible and returns component to original position for use in mouse-up EventListener
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

        //Remove EventListener on re-render
        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
            dragRef.removeEventListener('mousedown', handleMouseDown);
        }
    }, [position, pressed, state, place, type]);

    useEffect(() => {
        //Move component
        if (ref.current) {
            ref.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
        }
    }, [position]);

    //Display Tower image based on type
    if (type === 1) {
        imgSrc = fire.src;
        message = 'Basic ($10)';
    }
    else if (type === 2) {
        imgSrc = nut.src;
        message = 'Slow ($20)';
    }
    else if (type === 3) {
        imgSrc = water.src;
        message = 'AOE ($30)';
    }
    else if (type === 4) {
        imgSrc = sniper.src;
        message = 'Sniper ($40)';
    }
    else if (type === 5) {
        imgSrc = snake.src;
        message = 'Poison ($30)';
    }
    else if (type === 6) {
        imgSrc = coin.src;
        message = 'Bank ($40)';
    }

    return (
        <div {...rest}>
            <img ref={ref} src={imgSrc} alt='Tower' width='50' height='50' />
            <p>{message}</p>
        </div>
    )
}

export default Draggable;