import React from 'react';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import GamePage from './components/pages/GamePage';
import ScoresPage from './components/pages/ScoresPage';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Container from '@mui/material/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Creates HashRouter of the pages with given paths
 */
const App = () => {
    return (
        <HashRouter>
            <Container maxWidth="lg">
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route exact path="/game" element={<GamePage />} />
                    <Route exact path="/scores" element={<ScoresPage />} />
                </Routes>
            </Container>
        </HashRouter>
    );
}

export default App;
