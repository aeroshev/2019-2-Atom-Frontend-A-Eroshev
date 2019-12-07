import React from 'react';
import { ChatList } from './ChatList';
import { HeaderDialogList } from './HeaderDialogList';
import { ButtonNewChat } from './ButtonNewChat';

export class ManagerChatList extends React.Component {
	constructor(props) {
		super(props);

		const info = this.parseData();

		this.state = {
			chatList: info.chatList,
		};

		this.createChat = this.createChat.bind(this);
	}

	// async getChats () {
	// 	try {
	// 		const response = await fetch('http://127.0.0.1:8000/chat/?usr=1', {
	// 			method: 'GET',
	// 			mode: 'cors',
	// 			credentials: 'include',
	// 		});
	// 		const jsonResponse = await response.json();
	// 		console.log(jsonResponse);
	// 	} catch(error) {
	// 		console.error(error);
	// 	}
	// }

	// componentDidMount () {
	// 	this.getChats();
	// }

	parseData() {
		let data;
		try {
			data = {
				chatList: JSON.parse(localStorage.getItem('chatList')),
			};
		} catch (Error) {
			localStorage.clear();
			data = {
				chatList: null,
			};
		}
		return data;
	}

	createChat(nameChat, username) {
		const { chatList } = this.state;

		let date = new Date(parseInt(new Date().getTime(), 10));
		date = date.toString().split(' ')[4].split(':');
	
		this.setState({chatList: [...chatList, {
			id: chatList.length,
			dialogName: nameChat,
			lastMessage: '',
			messageTime: date[0] + ':' + date[1],
			messageStatus: '',
			isGroup: false,
			isOnline: false,
			userName: username,
		}]});
	
		localStorage.setItem('chatList', JSON.stringify(chatList));
	}

	render() {
		const {
			chatList,
		} = this.state;
		return (
			<div>
				<HeaderDialogList/>
				<ChatList chatList={chatList} setActiveChat={this.props.setActiveChat}/>
				<ButtonNewChat createChat={this.createChat} />
			</div>
		);
	}
}

