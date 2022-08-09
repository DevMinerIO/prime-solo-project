const teamStats = (state = [], action) => {
    switch (action.type) {
        case 'GET_TEAM_STATS':
            return action.payload;
        default:
            return state;
    }
}

export default teamStats;