export function Test() {
	let date = new Date(parseInt(new Date().getTime(), 10));
	date = date.toString().split(' ')[4].split(':');
	const currentTime = `${date[0]} : ${date[1]}`;
    
	const dialogBox1 = {
		id: 1,
		dialogName: 'Chat number 1',
		lastMessage: 'Last Message',
		messageTime: currentTime,
		messageStatus: 'no read',
		isGroup: false,
		isOnline: false,
		userName: 'Eroshev Artem',
	};

	const dialogBox2 = {
		id: 2,
		dialogName: 'Chat number 2',
		lastMessage: 'Last message',
		messageTime: currentTime,
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
		time: currentTime,
	};

	const messageBox2 = {
		id: 2,
		attachment: null,
		owner: 'self',
		text: 'World!',
		time: currentTime,
	};

	const messageBox3 = {
		id: 3,
		attachment: null,
		owner: 'outside',
		text: 'World!',
		time: currentTime,
	};
	

	const map = {1: [messageBox1, messageBox3], 2: [messageBox2]};
	localStorage.setItem('messageMap', JSON.stringify(map));
}