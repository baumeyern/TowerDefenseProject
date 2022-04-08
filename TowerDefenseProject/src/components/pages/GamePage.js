import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const GamePage = () => (
    <div>
        <h1>Game Page</h1>
        <div className="container">
            <Link to='/scores' >
                <Button variant="outline-light">Leaderboard</Button>
            </Link>
        </div>
        <div className="container">
            <Link to='/gameboard' >
                <Button variant="outline-light">Game Board</Button>
            </Link>
        </div>
        <div className="container">
            <Link to='/gameboard2' >
                <Button variant="outline-light">Game Board 2</Button>
            </Link>
        </div>
    </div>
);

export default GamePage;