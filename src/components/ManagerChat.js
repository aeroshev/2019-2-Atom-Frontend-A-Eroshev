import React from 'react';
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
		};

		this.sendMessage = this.sendMessage.bind(this);
	}

	parseData() {
		let data;
		try {
			data = {
				messageMap: JSON.parse(localStorage.getItem('messageMap')),
			};
		} catch (Error) {
			localStorage.clear();
			console.log('Error local storage');
			data = {
				messageMap: null,
			};
		}

		return data;
	}

	sendMessage(message) {
		const { messageMap, activeChat } = this.state;
		console.log(activeChat);

		if (this.props.activeChat !== null ){
			messageMap[this.props.activeChat].push({ 
				id: messageMap[this.props.activeChat].length, 
				content: message,
				time: new Date().getTime(),
			});
			this.setState({messageMap,});

			localStorage.setItem('messageMap', JSON.stringify(messageMap));
		}
	}

	render() {
		const {
			messageMap,
		} = this.state;

		return(
			<div className={styles.wrap} style={this.props.displayChat}>
				<HeaderChat closeChat={this.props.closeChat} />
				<MessageList messageList={messageMap} activeChat={this.props.activeChat} />
				<FormInput sendMessage={this.sendMessage} />
			</div>
		);
	}
}
