import React from 'react';
import Draggable from './Draggable';

import circleImg from "./circle.png";
const circle = new Image();
circle.src = circleImg;


const Panel = props => {

    const {place, ...rest} = props
    const styles = {
        width: 900,
        height: 100,
        backgroundColor: 'black',
        display: 'block',
    }
    return (
        <div style={styles} className="panel" {...rest}>
            <div className='panel-left'>
                <div className='towers'>
                    <Draggable place={place} type={1} />
                    <Draggable place={place} type={2} />
                    <Draggable place={place} type={3} />
                    <Draggable place={place} type={4} />
                </div>
            </div>
            <div className='panel-right'>
            </div>
        </div>
        )
}

export default Panel;