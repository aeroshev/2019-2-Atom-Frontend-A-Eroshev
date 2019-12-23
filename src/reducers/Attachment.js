const initialState = null;

export const attachmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PUT_ATTACHMENT':
            return state = action.payload;
        default:
            return state;
    };
}