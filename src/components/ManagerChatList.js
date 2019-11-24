import React from 'react';
import { ChatList } from './ChatList';
import { HeaderDialogList } from './HeaderDialogList';
import { ButtonNewChat } from './ButtonNewChat';
import styles from '../styles/ManagerChatList.module.css';

export class ManagerChatList extends React.Component {
	constructor(props) {
		super(props);

		const info = this.parseData();

		this.state = {
			chatList: info.chatList,
			animations: props.animations,
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
		const {
			chatList,
		} = this.state;

		return (
			<div className={styles.dialogList} style={this.props.displayMenu}>
				<HeaderDialogList/>
				<ChatList chatList={chatList} openChat={this.props.openChat}/>
				<ButtonNewChat createChat={this.createChat} />
			</div>
		);
	}
}

