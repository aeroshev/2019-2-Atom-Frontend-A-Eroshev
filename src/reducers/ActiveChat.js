const initialState = 0;

export const activeChatReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_CHAT':
            return state = action.payload;
        default:
            return state;
    };
}