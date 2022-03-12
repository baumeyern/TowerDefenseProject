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
    </div>
);

export default GamePage;