export function Test() {
    const time = new Date();
    
	const dialogBox1 = {
        id: 0,
		dialogName: 'some',
		lastMessage: '',
        timeLastMessage: time.getTime(),
    	messageStatus: 'read',
	};

	const dialogBox2 = {
        id: 1,
        dialogName: 'some',
		lastMessage: '',
		timeLastMessage: time.getTime(),
		messageStatus: 'read',
	};

	const arr = [dialogBox1, dialogBox2];
	localStorage.setItem('chatList', JSON.stringify(arr));

	const messageBox1 = {
		id: 0,
		content: 'Hello',
		time: time.getTime(),
	};

	const messageBox2 = {
		id: 1,
		content: 'Wold!',
		time: time.getTime(),
	};

	const map = {0: [messageBox1], 1: [messageBox2]};
    localStorage.setItem('messageMap', JSON.stringify(map));
}