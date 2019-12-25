const initialState = [];

export const localWeatherReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_LOCAL_WEATHER' :
            return state = [action.payload];
        case 'APPEND_WEATHER':
            return state = [
                ...state,
                ...action.payload
            ];
        default:
            return state;
    };
}