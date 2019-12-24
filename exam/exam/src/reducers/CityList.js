const initialState = [707860, 519188, 1283378, 1270260, 708546];

export const cityReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_CITY_LIST': {
            return state = action.payload;
        }
        case 'GET_CITY_LIST': {
            return state;
        }
        default:
            return state;
    };
}