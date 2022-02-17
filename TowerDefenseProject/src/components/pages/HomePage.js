import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


const HomePage = () => (
    <div>
        <h1>Welcome to Tower Defense</h1>
        <Link to='/login'>
            <div>
                <Button variant="primary">Login</Button>
            </div>
        </Link>
    </div>
);

export default HomePage;