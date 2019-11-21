import React from 'react';
import { HeaderChat } from './HeaderChat';
import { MessageList } from './MessageList';
import { FormInput } from './FormInput';
import MyContext from './Context';
import styles from '../styles/ManagerChat.module.css';


export class ManagerChat extends React.Component {
	constructor(props) {
		super(props);

		const info = this.parseData();

		this.state = {
			messageList: info.messageList,
			statusInfo: info.statusInfo,
		};

		this.sendMessage = this.sendMessage.bind(this);
	}

	loadTest() {
		const time = new Date();

		const dialogBox1 = {
			id: 0,
			chatID: 0,
			content: 'Hello',
			time: time.getTime(),
		};

		const dialogBox2 = {
			id: 1,
			chatID: 1,
			content: 'Wold!',
			time: time.getTime(),
		};

		const arr = [dialogBox1, dialogBox2];
		localStorage.setItem('messageList', JSON.stringify(arr));
		localStorage.setItem('statusInfo', JSON.stringify([{id: 0, status: 'online'}, {id: 1, status: 'ofline'}]))

		return;
	}

	parseData() {
		let data;
		try {
			data = {
				messageList: JSON.parse(localStorage.getItem('messageList')),
				statusInfo: JSON.parse(localStorage.getItem('statusInfo')),
			};
		} catch (Error) {
			localStorage.clear();
			console.log('Error local storage');
			data = {
				messageList: null,
				statusInfo: null,
			};
		}
		return data;
	}

	sendMessage(message) {
		const { messageList } = this.state;
		this.setState({messageList: [...messageList, { 
			id: messageList.length, 
			chatID: 0,
			content: message,
			time: new Date().getTime(),
		}]});
		localStorage.setItem('messageList', JSON.stringify(messageList));
	}

	render() {
		return(
			<div>
				<HeaderChat status={this.state.statusInfo} />
				<MessageList messageList={this.state.messageList} />
				<FormInput sendMessage={this.sendMessage} />
			</div>
		);
	}
}
