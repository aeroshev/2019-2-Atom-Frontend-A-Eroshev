export const setActiveChat = (new_id) => {
    return {
        type: 'SET_CHAT',
        payload: new_id,
    };
}

export const setCurrentUser = (new_id) => {
    return {
        type: 'SET_USER',
        payload: new_id,
    };
}