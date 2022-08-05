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
        console.log('This is response.data', response.data);
        yield put({ type: 'GET_PLAYER_GAMES', payload: response.data });
        yield put({
            type: 'GET_LAST_GAME_ID', payload: {
                teamId: response.data[0].team_id,
                playerId: response.data[0].id
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