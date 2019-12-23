import { combineReducers } from 'redux';
import { activeChatReducer } from './ActiveChat';

const rootReducer = combineReducers({
    chat: activeChatReducer,
});

export default rootReducer;