import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

// generator function
function* fetchCurrentGameId(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
        // player router js needs to have the matching url. 
        const response = yield axios.get(`/api/players/${action.payload.playerId}`, config);
        console.log('This is response.data for get lastId', response.data);
        yield put({ type: 'SET_CURRENT_GAME_ID', payload: response.data });

    }
    catch (error) {
        console.log(' Failed in fetchPlayerGames get request failed', error);
    }
}

function* currentGameIdSaga() {
    yield takeLatest('UPDATE_STATS', fetchCurrentGameId)
}

export default currentGameIdSaga;