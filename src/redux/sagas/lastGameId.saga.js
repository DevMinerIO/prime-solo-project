import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

// generator function
function* fetchLastGameId(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
        // player router js needs to have the matching url. 
        const response = yield axios.get(`/api/player/lastId/${action.payload.teamId}/${action.payload.playerId}`, config);
        console.log('This is response.data for get lastId', response.data);
        yield put({ type: 'SET_LAST_GAME_ID', payload: response.data });

    }
    catch (error) {
        console.log(' Failed in fetchPlayerGames get request failed', error);
    }
}

function* lastGameIdSaga() {
    yield takeLatest('GET_LAST_GAME_ID', fetchLastGameId)
}

export default lastGameIdSaga;