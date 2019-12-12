import React from 'react';
import { HeaderChat } from './HeaderChat';
import { MessageList } from './MessageList';
import { FormInput } from './FormInput';
import styles from '../styles/ManagerChat.module.css';


export class ManagerChat extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			messageMap: [],
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

	async getMessages() {
		const { messageMap } = this.state.messageMap;
		try {
			const response = await fetch(`https://127.0.0.1:8000/message/?chat=${this.state.activeChat}`, {
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
			});
			const jsonResponse = await response.json();
			
			this.setState({messageMap: [...messageMap, ...jsonResponse['response']]});
		} catch(error) {
			console.error(error);
		}
	}

	async postMessage(data) {
		const formData = new FormData();
		try {
			const response = await fetch('https://127.0.0.1:8000/message/new/', {
				method: 'POST',
				body: formData,
				mode: 'cors',
				credentials: 'include',
			});
			const jsonResponse = await response.json();
			return jsonResponse['id'];
		} catch(error) {
			console.error(error);
		}
	}

	componentDidMount() {
		this.getMessages();
	}

	triggerDropZone(status) {
		this.setState({setVisibleDropZone: status});
	}

	dragOver(event) {
		event.preventDefault();

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