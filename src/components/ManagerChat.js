import React from 'react';
import { HeaderChat } from './HeaderChat';
import { MessageList } from './MessageList';
import { FormInput } from './FormInput';
import styles from '../styles/ManagerChat.module.css';


export class ManagerChat extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			messageList: [],
			currentUserId: 0,
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
		try {
			const response = await fetch(`https://127.0.0.1:8000/message/?chat=${this.state.activeChat}`, {
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
			});
			const jsonResponse = await response.json();
			console.log(jsonResponse);

			if (response.status === 400) {
				console.error('This user do not have access to chat');
			} else {
				this.setState({messageList: jsonResponse['response']['messages_list']});
				this.setState({currentUserId: jsonResponse['response']['current_user_id']});
			}
		} catch(error) {
			console.error(error);
		}
	}

	async postMessage(data) {
		const formData = new FormData();
		formData.append('chat', data.message.chat);
		formData.append('text', data.message.text);
		formData.append('type', data.attachment.type);
		formData.append('document', data.attachment.document);
		formData.append('image', data.attachment.image);
		formData.append('audio', data.attachment.audio);

		try {
			const response = await fetch('https://127.0.0.1:8000/message/new/', {
				method: 'POST',
				body: formData,
				mode: 'cors',
				credentials: 'include',
			});
			const jsonResponse = await response.json();
			
			console.log(jsonResponse);
			if (response.status === 400) {
				console.error(jsonResponse['error']);
			}
		} catch(error) {
			console.error(error);
		}
	}

	componentDidMount() {
		this.pollingId = setInterval(() => this.getMessages(), 3000);
	}

	componentWillUnmount() {
		clearInterval(this.pollingId)
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
			file: event.dataTransfer.files[0],
		}
		this.sendMessage(null, attachment);
	}

	sendMessage(message, newAttachment = null) {
		const { messageList, activeChat } = this.state;
		if (activeChat >= 0 && (message || newAttachment)) {
			let data = {
				message: {
					user_id: this.state.currentUserId,
					chat: this.state.activeChat,
					text: message,
				},
				attachment: {
					path: '',
					type: '',
					document: null,
					image: null,
					auido: null,
				},
			};

			if (newAttachment){
				data.attachment.path = newAttachment.path;
				if (newAttachment.type === 'image') {
					data.attachment.type = 'image';
					data.attachment.image = newAttachment.file;
				}
				if (newAttachment.type === 'document') {
					data.attachment.type = 'document';
					data.attachment.document= newAttachment.file;
				}
				if (newAttachment.type === 'audio') {
					data.attachment.type = 'audio';
					data.attachment.audio = newAttachment.file;
				}
			}
			this.postMessage(data);
		
			this.setState({messageList: [...messageList, data]});
			localStorage.setItem('messageList', JSON.stringify(messageList));
		}
	}

	render() {
		const {
			messageList,
			activeChat,
			currentUserId,
		} = this.state;

		return(
			<div 
				className={styles.wrap}
				onDrop={this.drop}
				onDragOver={this.dragOver}
				onDragLeave={this.dragLeave}>
				<HeaderChat />
				<MessageList 
					messageList={messageList} 
					activeChat={activeChat} 
					currentUserId={currentUserId} />
				<FormInput 
					sendMessage={this.sendMessage} />
			</div>
		);
	}
}