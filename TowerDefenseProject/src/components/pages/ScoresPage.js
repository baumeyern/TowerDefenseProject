import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


//Display player score and list of high scores
const ScoresPage = () => (
    <div>
        <h1>Highscores</h1>
        <div className="container">
            <Link to='/'>
                <Button variant="outline-light">Home</Button>
            </Link>
        </div>
    </div>
);

export default ScoresPage;