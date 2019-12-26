export const setActiveChat = (newID) => {
	return {
		type: 'SET_CHAT',
		payload: newID,
	};
};
