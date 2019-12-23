export const setActiveChat = (new_id) => {
    return {
        type: 'SET_CHAT',
        payload: new_id,
    };
}

export const putAttachment = (attachment) => {
    return {
        type: 'PUT_ATTACHMENT',
        payload: attachment,
    };
}
