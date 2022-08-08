
const programStats = (state = [], action) => {
    switch (action.type) {
        case 'GET_PROGRAM_STATS':
            return action.payload;
        default:
            return state;
    }
}

export default programStats;