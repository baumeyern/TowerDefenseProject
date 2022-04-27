import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Popup = (props) => {

    const { state, ...rest } = props;
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (state === 'end') {
            setShow(true);
        }
    }, [state])


    return (
    <div className='popup-container'>
        {
        show ?
                    (<div className='popup'>
                        <header className='popup-header'>
                            <h1 className='popup-title'>Game Over</h1>
                        </header>
                        <main className='popup'>
                            You Lose! Click the button to see your score.
                        </main>
                        <footer className='popup-footer'>
                            <Link to='/scores' >
                                <button className='popup-button'>Leaderboard</button>
                            </Link>
                        </footer>
                    </div>
                    ) :
                    (null)
            }
        </div>
        )
}

export default Popup;