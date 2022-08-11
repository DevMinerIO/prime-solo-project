import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

// coaches view details when clicking on a game. 
function* fetchTeamGameDetails(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
        const response = yield axios.get(`/api/player/${action.payload.gameId}/${action.payload.teamId}`, config);
        console.log('this is response for fetchTeamGameDetails:', response.data);
        yield put({ type: 'SET_GAME_DETAILS', payload: response.data });
        yield put({ type: 'FETCH_SCHEDULE' })
    }
    catch(error) {
        console.log('error in fetchTeamGameDetails in teamStats saga:', error);
    }
}
// generator function
function* fetchTeamStats(action) {
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
    yield takeLatest('FETCH_GAME_DETAILS', fetchTeamGameDetails)
}

export default teamSaga;