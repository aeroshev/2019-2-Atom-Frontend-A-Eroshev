import React, { useContext } from 'react';
import { HeaderChat } from './HeaderChat';
import { MessageList } from './MessageList';
import { FormInput } from './FormInput';
import ActiveChatContext from './Context';
import styles from '../styles/ManagerChat.module.css';


export class ManagerChat extends React.Component {
	constructor(props) {
		super(props);
		this.loadTest();

		const info = this.parseData();

		this.state = {
			messageList: info.messageMap,
			activeChat: props.activeChat,
			// statusInfo: info.statusInfo,
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

		const arr0 = [dialogBox1];
		const arr1 = [dialogBox2];
		const map = new Map();
		map.set(0, arr0);
		map.set(1, arr1);
		localStorage.setItem('messageMap', JSON.stringify(map));
		console.log(map);
		// localStorage.setItem('statusInfo', JSON.stringify([{id: 0, status: 'online'}, {id: 1, status: 'ofline'}]))

		return;
	}

	parseData() {
		let data;
		try {
			data = {
				messageMap: JSON.parse(localStorage.getItem('messageMap')),
				// statusInfo: JSON.parse(localStorage.getItem('statusInfo')),
			};
		} catch (Error) {
			localStorage.clear();
			console.log('Error local storage');
			data = {
				messageMap: null,
				// statusInfo: null,
			};
		}

		console.log(data);
		return data;
	}

	sendMessage(message) {
		const { messageMap } = this.state;

		this.setState({messageMap: [...messageMap, { 
			id: messageMap.length, 
			chatID: 0,
			content: message,
			time: new Date().getTime(),
		}]});

		const map = new Map();
		map.set(useContext(ActiveChatContext), messageMap)
		localStorage.setItem('messageMap', JSON.stringify(map));
	}

	render() {
		return(
			<div>
				<HeaderChat status={this.state.statusInfo} />
				<MessageList messageMap={this.state.messageMap} activeChat={this.activeChat}/>
				<FormInput sendMessage={this.sendMessage} />
			</div>
		);
	}
}
