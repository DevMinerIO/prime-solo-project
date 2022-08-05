const addStats = (state = {}, action) => {
    switch (action.type) {
        case 'POST_STATS':
            return action.payload;
        default:
            return state;
    }
}

export default addStats;