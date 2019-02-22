import createSocket from './createSocket';

export const mySocketMiddleware = (url) => {

    let socket = null;

    return storeAPI => next => action => {
        switch(action.type) {
            case "USER_CONNECTED": {
                // connect to the socket only if the user logged in
                socket = createSocket(url);
                // storeAPI.dispatch({type: 'CONNECTED'})
                socket.on("SOCKET_NEW_MESSAGE", (data) => {
                    storeAPI.dispatch({
                        type : "SOCKET_MESSAGE_RECEIVED",
                        payload : data
                    });
                });
                return;
            }
            case "EMIT_TO_SOCKET": {
                //if the action is not formed like
                // {
                //     type: 'EMIT_TO_SOCKET',
                //     meta:
                //         event: 'event_which_server_listens'
                //         payload: payload
                // }
                // pass to the next action
                if (!action.meta && !action.meta.event) {
                    return(next(action))
                }
                // else emit to the server
                socket.emit(action.meta.event, action.meta.payload);
                return next(action);
            }
            case "SOCKET_DISCONNECT": {
                if(socket !== null){
                    console.log('disconnect socket')
                    storeAPI.dispatch({type: 'DISCONNECTED'})
                    socket.disconnect();
                }
                return next(action);
            }
            default: {
                return next(action) 
            }
        }
    }
}