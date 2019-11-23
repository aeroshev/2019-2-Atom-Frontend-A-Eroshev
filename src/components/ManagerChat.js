import React, { useContext } from 'react';
import { HeaderChat } from './HeaderChat';
import { MessageList } from './MessageList';
import { FormInput } from './FormInput';
import styles from '../styles/ManagerChat.module.css';


export class ManagerChat extends React.Component {
	constructor(props) {
		super(props);

		const info = this.parseData();

		this.state = {
			messageMap: info.messageMap,
			activeChat: props.activeChat,
		};

		this.sendMessage = this.sendMessage.bind(this);
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

		return data;
	}

	sendMessage(message) {
		const { messageMap, activeChat } = this.state;
		console.log(messageMap);
		if (activeChat !== null ){
			messageMap[activeChat].push({ 
				id: messageMap[activeChat].length, 
				content: message,
				time: new Date().getTime(),
			});
			this.setState({messageMap,})
			console.log(messageMap);

			localStorage.setItem('messageMap', JSON.stringify(messageMap));
		}
	}

	render() {
		return(
			<div>
				<HeaderChat status={this.state.statusInfo} />
				<MessageList messageList={this.state.messageMap} activeChat={this.state.activeChat}/>
				<FormInput sendMessage={this.sendMessage} />
			</div>
		);
	}
}
