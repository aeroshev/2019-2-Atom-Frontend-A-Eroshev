const initialState = {
    latitude: 0,
    longitude: 0,
}

export const coordinateReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_COORDINATE':
            return state = action.payload;
        case 'GET_LOCATION_URL':
            return state;
        default:
            return state;
    };
}
