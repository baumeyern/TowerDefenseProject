import React, { useState, useEffect } from 'react';

/**
 * Timer component that displays time played in seconds
 * (Requirement 11.0.0)
 * @param {Properties} props Properties passed to component
 */
const Timer = (props) => {

    /** @param {string} state current state of the game */
    const { state, ...rest } = props;
    const [seconds, setSeconds] = useState(0);


    useEffect(() => {
        let interval = null;
        if (state === 'playing') {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (state === 'paused' && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [state, seconds]);

    return (
        <div className='timer' {...rest}>
            {seconds}
        </div>
    );
}

export default Timer;