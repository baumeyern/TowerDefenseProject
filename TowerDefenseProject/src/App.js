import React from 'react';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import GamePage from './components/pages/GamePage';
import GameBoard from './components/pages/GameBoard';
import GameBoard2 from './components/pages/GameBoard2';
import ScoresPage from './components/pages/ScoresPage';
import FootNav from './components/FootNav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
    return (
        <div>
        
        <Router>
        <Container maxWidth="lg">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/game" element={<GamePage />} />
                <Route path="/gameboard" element={<GameBoard />} />
                <Route path="/gameboard2" element={<GameBoard2 />} />
                <Route path="/scores" element={<ScoresPage />} />
            </Routes>
        </Container>
    </Router>

    <div className='content-wrap'>
        <FootNav />
        </div>
        
        </div>
      
        

    );
}

export default App;
