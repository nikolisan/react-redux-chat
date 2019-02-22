
export const setLoaded = (boolean) => {
  return {
      type : "SET_LOADED",
      boolean
  }
}

export const userLoginToSocket = () => {
    return (dispatch) => {    
        return dispatch({
          type: 'socket',
          types: ["CONNECT", "CONNECT_SUCCESS", "CONNECT_FAIL"],
          promise: (socket) => socket.connect()
        });
    }
}

export function disconnect() {
  return {
    type: 'socket',
    types: ["DISCONNECT", "DISCONNECT_SUCCESS", "DISCONNECT_FAIL"],
    promise: socket => socket.disconnect(),
  }
}

export const receive = () => {
    return (dispatch) => {
      const newMessage = (message) => {
        return dispatch({
          type: "NEW_MESSAGE_FROM_SOCKET",
          payload: message,  
        });
      };
  
      return dispatch({
        type: 'socket',
        types: ["RECEIVE_", "RECEIVE_SUCC", "RECEIVE_FAIL"],
        promise: (socket) => socket.on('ReceiveMessage', newMessage),
      });
    }
}

export const sendUsername = (user) => {
    return (dispatch) => {
      return dispatch({
        type: 'socket',
        types: ["SEND_USER", "SEND_USER_SUCCESS", "SEND_USER_FAIL"],
        promise: (socket) => socket.emit('SET_USERNAME', user),
      });
    }
}

export const emit = (message) => {
  return (dispatch) => {
    return dispatch({
      type: 'socket',
      types: ["SEND", "SEND_SUCCESS", "SEND_FAIL"],
      promise: (socket) => socket.emit('SEND_MESSAGE', message),
    });
  }
}