import React, { useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button';


let username = createContext();

/**
 * Login Page (Requirement 1.0.0)
 */
const LoginPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");

    /**
     * Set value on change
     * @param {event} e on change event
     */
    const handleChange = e => setName(e.target.value);

    /**
     * Save name and go to Game Page on submit
     * @param {event} e submit event
     */
    const handleSubmit = e => {
        e.preventDefault();
        username = name;
        if (username === '' || username === null) {
            username = 'Anonymous';
        }
        navigate('/game');
    }

    return (
        <div>
            <h2>Enter Name</h2>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <TextField id="outlined-basic" label="Enter Name" variant="outlined" value={name} onChange={handleChange} />
                    <Button className='sbtn' variant="outline-light" type="submit">Begin</Button>
                </form>
            </div>
        </div>
    );
}

export { username };
export default LoginPage;