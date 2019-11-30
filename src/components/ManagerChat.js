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
			setVisibleDropZone: false,
			dropFiles: [],
		};

		this.sendMessage = this.sendMessage.bind(this);
		this.triggerDropZone = this.triggerDropZone.bind(this);
		this.dragOver = this.dragOver.bind(this);
		this.dragLeave = this.dragLeave.bind(this);
		this.drop = this.drop.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (this.props.activeChat !== prevProps.activeChat){
			this.setState({
				activeChat: this.props.activeChat,
			});
		}
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

	triggerDropZone(status) {
		this.setState({setVisibleDropZone: status});
	}

	dragOver(event) {
		event.preventDefault();
		event.stopPropagation();

		this.triggerDropZone(true);
	}

	dragLeave(event) {
		this.triggerDropZone(false);
	}

	drop(event) {
		event.preventDefault();
		event.stopPropagation();

		this.triggerDropZone(false);

		const attachment = {
			name: 'drop',
			type: 'image',
			path: [window.URL.createObjectURL(event.dataTransfer.files[0])],
		}
		this.sendMessage(null, attachment);
	}

	sendMessage(message, newAttachment = null) {
		const { messageMap, activeChat } = this.state;

		let date = new Date(parseInt(new Date().getTime(), 10));
        date = date.toString().split(' ')[4].split(':');

		if (activeChat >= 0 && (message || newAttachment)) {
			if (messageMap[activeChat]) {
				messageMap[activeChat] = [...messageMap[activeChat], { 
					id: messageMap[activeChat].length + 2, 
					attachment: newAttachment,
					owner: 'self',
					text: message,
					time: date[0] + ':' + date[1],
				}];
				this.setState({messageMap: messageMap,});
			} else {
				const map = [...messageMap, [{
					id: 1, 
					attachment: newAttachment,
					owner: 'self',
					text: message,
					time: date[0] + ':' + date[1],
				}]];
	
				this.setState({messageMap: map,});
			}

			localStorage.setItem('messageMap', JSON.stringify(messageMap));
		}
	}

	render() {
		const {
			messageMap,
			activeChat,
		} = this.state;

		return(
			<div 
				className={styles.wrap}
				onDrop={this.drop}
				onDragOver={this.dragOver}
				onDragLeave={this.dragLeave}>
				<HeaderChat />
				<MessageList 
					messageMap={messageMap} 
					activeChat={activeChat} />
				<FormInput 
					sendMessage={this.sendMessage} />
			</div>
		);
	}
}