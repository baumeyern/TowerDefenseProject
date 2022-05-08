import axios from 'axios';

const baseUrl = 'https://backendapi20220502161045.azurewebsites.net/api/v1/';
const debugBaseUrl = 'https://localhost:5001/api/v1/';

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