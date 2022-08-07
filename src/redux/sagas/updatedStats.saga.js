import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

// generator function
function* fetchUpdatedStats(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
        // player router js needs to have the matching url. ${action.payload}
        yield axios.put(`/api/player/${action.payload.game_id}`, config);
        yield put({ type: 'SET_STATS_UPDATE', payload: action.payload });

    }
    catch (error) {
        console.log(' Failed in fetchUpdated stats put request failed', error);
    }
}

function* updatedStatsSaga() {
    yield takeLatest('UPDATE_STATS', fetchUpdatedStats)
}

export default updatedStatsSaga;