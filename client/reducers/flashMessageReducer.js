import { ADD_FLASH_MESSAGE } from '../actions/types';
const initialState = {}

export default function(state=initialState, action) {
    switch(action.type) {
        case ADD_FLASH_MESSAGE:
            return action.payload;
        default:
            return state;
    }
}