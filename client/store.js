import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import rootReducer from './reducers';
import { mySocketMiddleware } from './middlewares/socket/index';
import SocketClient from './middlewares/socket/createSocket';


const initialState = {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const socketClient = new SocketClient('http://localhost:3000')
const myMiddleware = mySocketMiddleware(socketClient)

const logger = createLogger({
    collapsed: true
})

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
        applyMiddleware(myMiddleware, thunk)
    )
);

export default store;