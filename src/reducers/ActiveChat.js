const initialState = 0;

export const activeChatReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'SET_CHAT':
			state = action.payload;
			return state;
		default:
			return state;
	};
};