const initialState = 0;

export const localWeatherReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_LOCAL_WEATHER' :
            return state = action.payload;
        default:
            return state;
    };
}