import React from 'react';
import { HeaderChat } from './HeaderChat';
import { MessageList } from './MessageList';
import { FormInput } from './FormInput';
import MyContext from './Context';
import styles from '../styles/ManagerChat.module.css';


export class ManagerChat extends React.Component {
	constructor(props) {
		super(props);
		this.loadTest();

		const info = this.parseData();

		this.state = {
			messageList: info.messageList,
		};
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

		return;
	}

	parseData() {
		let data;
		try {
			data = {
				messageList: JSON.parse(localStorage.getItem('messageList'))
			};
		} catch (Error) {
			localStorage.clear();
			console.log('Error local storage');
			data = {
				messageList: null
			};
		}
		return data;
	}

	sendMessage(message) {
		const { messageList } = this.state;
		messageList.push({
			content: message,
			time: new Date().getTime(),
		});
		this.setState({
			messageList,
		});
	}

	render() {
		return(
			<div>
				<HeaderChat />
				<MessageList messageList={this.state.messageList} />
				<FormInput sendMessage={this.sendMessage} />
			</div>
		);
	}
}
