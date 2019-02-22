const initialState = {
    messages: [{message: "initial"}],
    isRecieving: false,
    didRecieve: false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case "NEW_MESSAGE_FROM_SOCKET":
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        default :
            return state
    }
}