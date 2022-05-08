import axios from 'axios';

const baseUrl = 'https://backendapi20220502161045.azurewebsites.net/api/v1/';
const debugBaseUrl = 'https://localhost:5001/api/v1/';

/**
 * Gets tops scores to display on the Scores Page
 * @returns {AxiosResponse.data} Database data
 */
export async function getTopScores() {
    try {
        var response = axios.get(baseUrl + `HighScore/GetAll`, { mode: 'cors' });
        return (await response).data;
    }
    catch (error)
    {
        console.trace(error);
    }
}

/**
 * Posts the user's name and final score to the database
 * @param {string} name name to post to database
 * @param {string} score score to post to database
 */
export async function postScore(name, score) {
    try {
        var response = axios.post(baseUrl + `HighScore/Insert`, { Name: name, Score: score }, {
            mode: 'cors',
            headers: { 'Content-Type': 'application/json; charset=utf-8', },
            credentials: "include",
        });
        return (await response).data;
    }
    catch (error) {
        console.trace(error);
    }
}