export const setActiveChat = (new_id) => {
    return {
        type: 'SET_CHAT',
        payload: new_id,
    };
}
