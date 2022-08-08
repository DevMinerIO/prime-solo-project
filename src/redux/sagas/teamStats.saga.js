import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

// generator function
function* fetchTeamStats() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
        const response = yield axios.get(`/api/player/team/${action.payload.teamId}`, config);
        console.log('This is response.data for TEAM:', response.data);
        yield put({ type: 'GET_TEAM_STATS', payload: response.data });

    }
    catch (error) {
        console.log(' Failed in fetchPlayerGames get request failed', error);
    }
}

function* teamSaga() {
    yield takeLatest('FETCH_TEAM_STATS', fetchTeamStats)
}

export default teamSaga;