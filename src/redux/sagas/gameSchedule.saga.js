import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

// generator function
function* fetchGameSchedule() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
        const response = yield axios.get('/api/games', config);
        console.log('This is response.data', response.data);
        yield put({ type: 'GET_GAME_SCHEDULE', payload: response.data });
    }
    catch (error) {
        console.log(' Failed in fetchPlayerGames get request failed', error);
    }
}

function* scheduleSaga() {
    yield takeLatest('FETCH_SCHEDULE', fetchGameSchedule)
}

export default scheduleSaga;