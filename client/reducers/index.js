import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import flashMessageReducer from './flashMessageReducer';
import socketReducer from './socketReducer';
import messagesReducer from './messagesReducer';

export default combineReducers({
   errors: errorReducer,
   auth: authReducer,
   flash: flashMessageReducer,
   socket: socketReducer,
   messages: messagesReducer,
});