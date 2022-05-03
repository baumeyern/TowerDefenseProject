import React, { useState, createContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button';

let username = createContext();

const LoginPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const handleChange = e => setName(e.target.value);

    const handleSubmit = e => {
        e.preventDefault();
        username = name;
        //Send name to database
        navigate('/game');
    }

    return (
        <div>
            <h2>Enter Name</h2>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <TextField required id="outlined-basic" label="Enter Name" variant="outlined" value={name} onChange={handleChange} />
                    <Button className='sbtn' variant="outline-light" type="submit">Begin</Button>
                </form>
            </div>
        </div>
    );
}

export { username };
export default LoginPage;