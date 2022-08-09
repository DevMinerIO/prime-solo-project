const gameSchedule = (state = [], action) => {
    switch (action.type) {
        case 'GET_GAME_SCHEDULE':
            return action.payload;
        default:
            return state;
    }
}

export default gameSchedule;