const initialState = [];

export const cityReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_CITY_LIST': {
            return state = action.payload;
        }
        default:
            return state;
    };
}