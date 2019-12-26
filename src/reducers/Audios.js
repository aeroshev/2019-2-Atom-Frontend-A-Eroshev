const initialState = [];

export const audioReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'PUT_AUDIO_BLOB':
            state = [
                ...state, 
                action.payload
            ];
            return state;
        default:
            return state;
    };
};