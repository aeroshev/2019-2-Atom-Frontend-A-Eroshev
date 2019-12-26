import { combineReducers } from 'redux';
import { activeChatReducer } from './ActiveChat';
import { audioReducer } from './Audios';

const rootReducer = combineReducers({
	chat: activeChatReducer,
	audios: audioReducer,
});

export default rootReducer;