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
				<ChatList chatList={this.state.chatList} setActiveChat={this.props.setActiveChat}/>
				<ButtonNewChat createChat={this.createChat} />
			</div>
		);
	}
}

