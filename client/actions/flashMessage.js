import { ADD_FLASH_MESSAGE } from './types';

export const addFlashMessage = (message, success) => {
    return {
        type: ADD_FLASH_MESSAGE,
        payload: {
            message,
            success
        }
    }
}