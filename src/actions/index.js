export const setActiveChat = (newID) => {
	return {
		type: 'SET_CHAT',
		payload: newID,
	};
};

export const putAudio = (newAudio) => {
	return {
		type: 'PUT_AUDIO_BLOB',
		payload: newAudio,
	};
};