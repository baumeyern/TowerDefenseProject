import React, { useState } from 'react';
import Draggable from './Draggable';

import circleImg from "./circle.png";
const circle = new Image();
circle.src = circleImg;


const Panel = props => {

    const { place, state, ...rest } = props
    const [paused, setPaused] = useState(state);
    return (
        <div className="panel" {...rest}>
            <div className='panel-left'>
                <div className='towers'>
                    <Draggable place={place} type={1} paused={paused} />
                    <Draggable place={place} type={2} paused={paused} />
                    <Draggable place={place} type={3} paused={paused} />
                    <Draggable place={place} type={4} paused={paused} />
                </div>
            </div>
            <div className='panel-right'>
                <div className='buttons'>
                    <button className='pause' onClick={function (e) { setPaused(true) }}>Pause</button>
                    <button className='play' onClick={function (e) { setPaused(false) }}>Play</button>
                </div>
            </div>
        </div>
        )
}

export default Panel;