import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { HeaderChat } from './HeaderChat';
import { MessageList } from './MessageList';
import { FormInput } from './FormInput';
import styles from '../../styles/ManagerChat.module.css';

const putStateToProps = (state) => {
	return {
		activeChat: state.chat,
	};
};

const WrappedMessageList = connect(putStateToProps, null)(MessageList);
const API_URL = 'http://127.0.0.1:8000';


export function ManagerChat (props) {
	const { activeChat } = props;

	const [messageList, setMessageList] = useState([]);
	const [currentUserId, setCurrentUserId] = useState(0);

	async function getMessages() {
		try {
			const response = await fetch(API_URL + `/message/?chat=${activeChat}`, {
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
			});
			const jsonResponse = await response.json();

			if (response.status === 400) {
				console.error('This user do not have access to chat');
			} else {
				setMessageList(jsonResponse['response']['messages_list']);
				setCurrentUserId(jsonResponse['response']['current_user_id']);
			}
		} catch(error) {
			console.error(error);
		}
	}

	async function postMessage(data) {
		const formData = new FormData();
		formData.append('chat', data.message.chat);
		formData.append('text', data.message.text);
		formData.append('type', data.attachment.type);
		formData.append('document', data.attachment.document);
		formData.append('image', data.attachment.image);
		formData.append('audio', data.attachment.audio);

		try {
			const response = await fetch(API_URL + '/message/new/', {
				method: 'POST',
				body: formData,
				mode: 'cors',
				credentials: 'include',
			});
			const jsonResponse = await response.json();
			if (response.status === 400) {
				throw new Error(jsonResponse['error']);
			}
		} catch(error) {
			console.error(error);
		}
	}

	useEffect(() => {
		const pollingID = setInterval(() => getMessages(), 10000);
		return () => {
			clearInterval(pollingID);
		};
	});

	const triggerDropZone = (status) => {
	};

	const dragOver = (event) => {
		event.preventDefault();
	};

	const dragLeave = (event) => {
	};

	const drop = (event) => {
		event.preventDefault();
		event.stopPropagation();
		triggerDropZone(false);

		const object = {
			name: 'drop',
			type: 'image',
			path: [window.URL.createObjectURL(event.dataTransfer.files[0])],
			file: event.dataTransfer.files[0],
		};
		sendMessage(null, object);
	};

	const sendMessage = (message, newAttachment = null) => {
		let date = new Date(parseInt(new Date().getTime(), 10));
		date = date.toString().split(' ')[4].split(':');
		const currentTime = `${date[0]} : ${date[1]}`;
	
		if (activeChat && (message || newAttachment)) {
			let data = {
				message: {
					user_id: currentUserId,
					chat: activeChat,
					text: message,
					added_at:  currentTime,
				},
				attachment: {
					path: '',
					type: '',
					document: null,
					image: null,
					auido: null,
				},
			};

			if (newAttachment) {
				data.attachment.path = newAttachment.path;
				switch(newAttachment.type) {
					case 'image':
						data.attachment.type = 'image';
						data.attachment.image = newAttachment.file;
						break;
					case 'document':
						data.attachment.type = 'document';
						data.attachment.document= newAttachment.file;
						break;
					case 'audio':
						data.attachment.type = 'audio';
						data.attachment.audio = newAttachment.file;
						break;
					default:
						console.error('Can not define type attachment');
				}
			}
			postMessage(data);
		
			setMessageList([...messageList, data]);
			localStorage.setItem('messageList', JSON.stringify(messageList));
		}
	};

	return(
		<div
			className={styles.wrap}
			onDrop={drop}
			onDragOver={dragOver}
			onDragLeave={dragLeave}
		>
			<HeaderChat/>
			<WrappedMessageList 
				messageList={messageList} 
				currentUserId={currentUserId}
			/>
			<FormInput sendMessage={sendMessage}/>
		</div>
	);
}
