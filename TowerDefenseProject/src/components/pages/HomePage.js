import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

console.log('aNd NiCk');
/**
 * Home Page displays buttons linking to the Login Page and the Scores Page (Requirement 1.3.0)
 */
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
            <p className='names'> A Game By Alec, Stephen, Will, & Nice guy </p>
        </div>
    </div>
);

export default HomePage;