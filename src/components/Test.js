export function Test() {
	let date = new Date(parseInt(new Date().getTime(), 10));
    date = date.toString().split(' ')[4].split(':');
    
	const dialogBox1 = {
        id: 0,
		dialogName: 'Chat number 1',
		lastMessage: 'Last Message',
        messageTime: date[0] + ':' + date[1],
		messageStatus: 'no read',
		isGroup: false,
		isOnline: false,
		userName: 'Eroshev Artem',
	};

	const dialogBox2 = {
        id: 1,
        dialogName: 'Chat number 2',
		lastMessage: 'Last message',
		messageTime: date[0] + ':' + date[1],
		messageStatus: 'read',
		isGroup: false,
		isOnline: true,
		userName: 'Pretty Bot',
	};

	const arr = [dialogBox1, dialogBox2];
	localStorage.setItem('chatList', JSON.stringify(arr));

	const messageBox1 = {
		id: 1,
		attachment: null,
		owner: 'self',
		text: 'Hello',
		time: date[0] + ':' + date[1],
	};

	const messageBox2 = {
		id: 2,
		attachment: null,
		owner: 'self',
		text: 'World!',
		time: date[0] + ':' + date[1],
	};

	const messageBox3 = {
		id: 3,
		attachment: null,
		owner: 'outside',
		text: 'World!',
		time: date[0] + ':' + date[1],
	};
	

	const map = [[messageBox1, messageBox3], [messageBox2]];
    localStorage.setItem('messageMap', JSON.stringify(map));
}