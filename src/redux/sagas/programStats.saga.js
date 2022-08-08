import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

// generator function
function* fetchProgramStats() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
        const response = yield axios.get('/api/program', config);
        console.log('This is response.data', response.data);
        yield put({ type: 'GET_PROGRAM_STATS', payload: response.data });
    }
    catch (error) {
        console.log(' Failed in fetchPlayerGames get request failed', error);
    }
}

function* programSaga() {
    yield takeLatest('FETCH_PROGRAM_STATS', fetchProgramStats)
}

export default programSaga;