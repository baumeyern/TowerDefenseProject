import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Popup = (props) => {

    const { state, ...rest } = props;
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (state === 'end') {
            setShow(true);
        }
    }, [state]);


    return (
        <>
        {
        show ?
                    (<div className='popup-container' {...rest}>
                        <div className='popup'>
                            <header className='popup-header'>
                                <h1 className='popup-title'>Game Over</h1>
                            </header>
                            <main className='popup-content'>
                                You ran out of lives!
                                <br/>
                                Click the button to see your score.
                            </main>
                            <footer className='popup-footer'>
                                <Link to='/scores' >
                                    <Button className='popup-button' variant='outline-light'>Leaderboard</Button>
                                </Link>
                            </footer>
                        </div>
                    </div>
                    ) :
                    (null)
            }
            </>
        )
}

export default Popup;