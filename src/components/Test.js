export function Test() {
	let date = new Date(parseInt(new Date().getTime(), 10));
    date = date.toString().split(' ')[4].split(':');
    
	const dialogBox1 = {
        id: 1,
		dialogName: 'Chat number 1',
		lastMessage: 'Last Message',
        messageTime: date[0] + ':' + date[1],
    	messageStatus: 'no read',
	};

	const dialogBox2 = {
        id: 2,
        dialogName: 'Chat number 2',
		lastMessage: 'Last message',
		messageTime: date[0] + ':' + date[1],
		messageStatus: 'read',
	};

	const arr = [dialogBox1, dialogBox2];
	localStorage.setItem('chatList', JSON.stringify(arr));

	const messageBox1 = {
		id: 1,
		attachment: null,
		owner: 'self',
		content: 'Hello',
		time: date[0] + ':' + date[1],
	};

	const messageBox2 = {
		id: 2,
		attachment: null,
		owner: 'self',
		content: 'World!',
		time: date[0] + ':' + date[1],
	};

	const messageBox3 = {
		id: 3,
		attachment: null,
		owner: 'outside',
		content: 'World!',
		time: date[0] + ':' + date[1],
	};
	

	const map = {1: [messageBox1, messageBox3], 2: [messageBox2]};
    localStorage.setItem('messageMap', JSON.stringify(map));
}