import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { getTopScores } from '../services/HighScoreService';
import { useEffect, useState } from 'react';

var calledScores = false;

//Display player score and list of high scores
const ScoresPage = () => {
    const [scores, setScores] = useState([]);

    useEffect(async () => {
        if (calledScores)
            return;
        calledScores = true;
        const response = await getTopScores();
        setScores(response);
    });

    return (
        <div>
            <h1>Highscores</h1>
            <div className="container">
                <Link to='/'>
                    <Button variant="outline-light">Home</Button>
                </Link>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Score</th>
                            <th>Date</th>
                        </tr>
                        {scores.map(score => {
                            return (
                                <tr key="{score.Id}">
                                    <td>{score.name}</td>
                                    <td>{score.score}</td>
                                    <td>{score.date}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default ScoresPage;