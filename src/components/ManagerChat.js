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
			activeChat: props.activeChat,
			activeDrop: {
				display: 'none',
			},
		};

		this.sendMessage = this.sendMessage.bind(this);
		this.activateDropZone = this.activateDropZone.bind(this);
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

	activateDropZone() {
		const { display } = this.state.activeDrop;
		this.setState({
			activeDrop: {
				display: (display === 'none')? 'block' : 'none',
			}
		});
	}

	sendMessage(message) {
		const { messageMap, activeChat } = this.state;

		console.log(message);

		if (activeChat !== null ){
			messageMap[activeChat].push({ 
				id: messageMap[activeChat].length, 
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
			activeChat,
			activeDrop,
		} = this.state;

		return(
			<div className={styles.wrap}>
				<HeaderChat />
				<MessageList messageList={messageMap} activeChat={activeChat} dropStyle={activeDrop}/>
				<FormInput sendMessage={this.sendMessage} activateDropZone={this.activateDropZone}/>
			</div>
		);
	}
}
