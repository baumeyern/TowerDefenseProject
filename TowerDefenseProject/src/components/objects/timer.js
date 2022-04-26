import React, { useState, useEffect } from 'react';

const Timer = () => {
    const [seconds, setSeconds] = useState(0);
    const [active, setActive] = useState(false);

    const toggle = () => {
        setActive(!active);
    }

    useEffect(() => {
        let interval = null;
        if (active) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!active && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [active, seconds]);

    return (
        <div className='timer'>
            {seconds}
        </div>
    );
}

export default Timer;