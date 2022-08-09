import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

// generator function
function* fetchPlayerGames() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
        const response = yield axios.get('/api/player', config);
        console.log('This is response.data for the all of the users games', response.data);
        console.log('users team id is:', response.data[0].team_id);
        yield put({ type: 'GET_PLAYER_GAMES', payload: response.data });
        yield put({
            type: 'GET_LAST_GAME_ID', payload: {
                teamId: response.data[0].team_id,
                playerId: response.data[0].id
            }
        });
        //get team_id for team page to display team stats for each player. 
        yield put({
            type: 'FETCH_TEAM_STATS', payload: {
                // this is the users team
                teamId: response.data[0].team_id
            }
        })

    }
    catch (error) {
        console.log(' Failed in fetchPlayerGames get request failed', error);
    }
}

function* playerSaga() {
    yield takeLatest('FETCH_PLAYER_GAMES', fetchPlayerGames)
}

export default playerSaga;