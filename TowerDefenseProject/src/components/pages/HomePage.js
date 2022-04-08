import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const HomePage = () => (
    <div>
        <h1>Tower<br/>Defense</h1>
        <div className="container">
            <Link to='/login'>
                <Button variant="outline-light">Play</Button>
            </Link>
        </div>
        <div className="container">
            <Link to='/scores'>
                <Button variant="outline-light">Highscores</Button>
            </Link>
        </div>
        <div className="container">
        <Link to='/gameboard'>
            <Button variant="outline-light">GameBoard</Button>
        </Link>
    </div>
    <div className="container">
        <Link to='/gameboard2'>
            <Button variant="outline-light">GameBoard 2</Button>
        </Link>
    </div>
    </div>
);

export default HomePage;