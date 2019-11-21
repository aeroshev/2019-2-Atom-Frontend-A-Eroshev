import React from 'react';
import { ChatList } from './ChatList';
import { HeaderDialogList } from './HeaderDialogList';
import { ButtonNewChat } from './ButtonNewChat';

export class ManagerChatList extends React.Component {
	constructor(props) {
		super(props);
		// this.loadTest();

		const info = this.parseData();

		this.state = {
			chatList: info.chatList,
		};

		this.createChat = this.createChat.bind(this);
	}

	loadTest() {
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

		return;
	}

	parseData() {
		let data;
		try {
			data = {
				chatList: JSON.parse(localStorage.getItem('chatList')),
			};
		} catch (Error) {
			localStorage.clear();
			console.log('Error local storage');
			data = {
				chatList: null,
			};
		}
		return data;
	}

	createChat(nameChat) {
		const { chatList } = this.state;
		this.setState({chatList: [...chatList, {
			id: chatList.length,
			dialogName: nameChat,
			lastMessage: '',
			timeLastMessage: new Date().getTime(),
			messageStatus: '',
		}]});
		localStorage.setItem('chatList', JSON.stringify(chatList));
	}

	render() {
		return (
			<div>
				<HeaderDialogList/>
				<ChatList chatList={this.state.chatList} />
				<ButtonNewChat createChat={this.createChat} />
			</div>
		);
	}
}

