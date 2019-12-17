import { combineReducers } from 'redux';

const activeChatReducer = (state = 0, action) => {
    switch(action.type) {
        case 'SET_CHAT':
            return state = action.payload;
        default:
            return state;
    };
}

const currentUserReducer = (state = 0, action) => {
    switch(action.type) {
        case 'SET_USER':
            return state = action.payload;
        default:
            return state;
    };
}

const rootReducer = combineReducers({
    chat: activeChatReducer,
    user: currentUserReducer,
});

export default rootReducer;