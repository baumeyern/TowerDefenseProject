import React from 'react';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import GamePage from './components/pages/GamePage';
import ScoresPage from './components/pages/ScoresPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
    return (
        <Router>
            <Container maxWidth="lg">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/game" element={<GamePage />} />
                    <Route path="/scores" element={<ScoresPage />} />
                </Routes>
            </Container>
        </Router>


    );
}

export default App;
