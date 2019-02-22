const initialState = {
    isConnected: false,
    isConnecting: false,
    isLoaded: false,
    messageRecieved: false
}

export default function socketReducer(state=initialState, action) {
    switch (action.type) {
        case "CONNECTED":
            return {
                ...state,
                isConnected: true
            }
        case "DISCONNECTED":
            return {
                ...state,
                isConnected: false
            }
        case "NEW_MESSAGE_FROM_SOCKET":
            return {
                ...state,
                messageRecieved: true
            }
        case "SET_LOADED":
            return {
                ...state,
                isLoaded: action.boolean
            }
        default:
            return state
    }
}