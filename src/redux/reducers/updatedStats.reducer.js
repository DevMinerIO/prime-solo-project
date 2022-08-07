const updatedStats = (state = (''), action) => {
    switch (action.type) {
        case 'SET_STATS_UPDATE':
            return action.payload;
        default:
            return state;
    }
}

export default updatedStats;