import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { getTopScores } from '../services/HighScoreService';
import { useEffect, useState } from 'react';

var calledScores = false;

/*
 * Scores Page (Requirement 1.2.0)
 */
const ScoresPage = () => {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        async function fetchData() {
            if (calledScores)
                return;
            calledScores = true;
            const response = await getTopScores();
            setScores(response);
        }
        fetchData();
    }, []);
    return (
        <div>
            <h1>Highscores</h1>
            <div className="container">
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
                <Link to='/'>
                    <Button variant="outline-light">Home</Button>
                </Link>
            </div>
        </div>
    )
};

export default ScoresPage;