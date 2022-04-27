import React, { useState, useEffect, useContext } from 'react';

const Timer = (props) => {

    const { state, ...rest } = props;
    const [seconds, setSeconds] = useState(0);


    useEffect(() => {
        let interval = null;
        if (state === 'playing') {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
                //console.log(interval);
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

const useTimer = () => useContext(Timer);

export default Timer;