const getLastGameId = (state = (''), action) => {
    switch (action.type) {
        case 'SET_LAST_GAME_ID':
            return action.payload;
        default:
            return state;
    }
}

export default getLastGameId;