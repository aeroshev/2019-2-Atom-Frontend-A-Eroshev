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

	createChat(nameChat) {
		const { chatList } = this.state;

		let date = new Date(parseInt(new Date().getTime(), 10));
		date = date.toString().split(' ')[4].split(':');
	
		this.setState({chatList: [...chatList, {
			id: chatList.length + 1,
			dialogName: nameChat,
			lastMessage: '',
			timeLastMessage: date[0] + ':' + date[1],
			messageStatus: '',
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

