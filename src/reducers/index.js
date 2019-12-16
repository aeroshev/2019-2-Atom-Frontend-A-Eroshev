import { combineReducers } from 'redux';

const activeChatReducer = (state = 0, action) => {
    switch(action.type) {
        case 'SET':
            return state = action.payload;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    chat: activeChatReducer,
})

export default rootReducer;