import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

//generator function
function* setPlayerStats(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        yield axios.post('/api/player', action.payload, config);
        //POST_STATS Links to reducer
        yield put({ type: 'POST_STATS', payload: action.payload })
        yield put({ type:'FETCH_PLAYER_GAMES'})
    }
    catch (error) {
        console.log('ERROR with setPlayerStats:', error);
        }
}
function* playerStatsSaga() {
    // ADD_STATS is from GameStatsForm
    yield takeLatest('ADD_STATS', setPlayerStats);
}

export default playerStatsSaga;