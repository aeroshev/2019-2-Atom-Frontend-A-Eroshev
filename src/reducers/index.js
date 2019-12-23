import { combineReducers } from 'redux';
import { activeChatReducer } from './ActiveChat';
import { attachmentReducer } from './Attachment';


const rootReducer = combineReducers({
    chat: activeChatReducer,
    attachment: attachmentReducer,
});

export default rootReducer;