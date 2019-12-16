export const setActiveChat = (new_id) => {
    return {
        type: 'SET',
        payload: new_id,
    };
}