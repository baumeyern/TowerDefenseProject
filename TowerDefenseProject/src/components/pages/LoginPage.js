import React from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';

const LoginPage = () => (
    <div>
        <h1>Login Page</h1>
        <TextField required id="outlined-basic" label="Enter Name" variant="outlined" />
    </div>
);

export default LoginPage;