const currentGameId = (state = (''), action) => {
    switch (action.type) {
        case 'SET_CURRENT_GAME_ID':
            return action.payload;
        default:
            return state;
    }
}

export default currentGameId;