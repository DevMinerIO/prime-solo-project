import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

// generator function
function* fetchGameSchedule() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
        // const response = yield axios.get(`/api/games/${action.payload.teamId}`, config);
        const response = yield axios.get(`/api/games`, config);
        yield console.log('This is response.data when trying to get team_id', response.data);
        yield put({ type: 'GET_GAME_SCHEDULE', payload: response.data });

    }
    catch (error) {
        console.log(' Failed in fetchPlayerGames get request failed', error);
    }
}
function* setGameSchedule(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
        yield axios.post('/api/games', action.payload, config);
    } catch (error) {
        console.log(' Failed in setGameSchedule post request failed', error);
    }
}
function* removeGame(action) {
    console.log('this is the game we are going to delete!', action.payload);
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        yield axios.delete(`/api/games/${action.payload}`, config)
    }
    catch (error) {
        console.log('game was not able to be deleted', error);
    }


}


function* scheduleSaga() {
    yield takeLatest('FETCH_SCHEDULE', fetchGameSchedule);
    yield takeLatest('ADD_NEW_GAME', setGameSchedule);
    yield takeEvery('REMOVE_GAME', removeGame);
}

export default scheduleSaga;