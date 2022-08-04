const playerStats = (state = [], action) => {
    switch (action.type) {
        case 'GET_PLAYER_GAMES':
            return action.payload;
        default:
            return state;
    }
}

export default playerStats;