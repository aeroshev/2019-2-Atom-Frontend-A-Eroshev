import React, { useState, useEffect } from 'react';
import { HeaderChat } from './HeaderChat';
import { MessageList } from './MessageList';
import { FormInput } from './FormInput';
import { useSelector, useDispatch } from 'react-redux';
import { putAttachment } from '../../actions';
import styles from '../../styles/ManagerChat.module.css';


export function ManagerChat (props){
	const activeChat = useSelector(state => state.chat);
	const attachment = useSelector(state => state.attachment);
	const dispatch = useDispatch();
	const API_URL = 'https://127.0.0.1:8000';

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
		const pollingID = setInterval(() => getMessages(), 800);
		return () => {
			clearInterval(pollingID);
		};
	});

	const triggerDropZone = (status) => {
	}

	const dragOver = (event) => {
		event.preventDefault();
	}

	const dragLeave = (event) => {
	}

	const drop = (event) => {
		event.preventDefault();
		event.stopPropagation();

		triggerDropZone(false);
		dispatch(putAttachment({
				name: 'drop',
				type: 'image',
				path: [window.URL.createObjectURL(event.dataTransfer.files[0])],
				file: event.dataTransfer.files[0],
			})
		);
		sendMessage(null);
	}

	const sendMessage = (message) => {
		let date = new Date(parseInt(new Date().getTime(), 10));
		date = date.toString().split(' ')[4].split(':');
	
		if (activeChat >= 0 && (message || attachment)) {
			let data = {
				message: {
					user_id: currentUserId,
					chat: activeChat,
					text: message,
					added_at: date[0] + ':' + date[1],
				},
				attachment: {
					path: '',
					type: '',
					document: null,
					image: null,
					auido: null,
				},
			};

			if (attachment){
				data.attachment.path = attachment.path;
				if (attachment.type === 'image') {
					data.attachment.type = 'image';
					data.attachment.image = attachment.file;
				}
				if (attachment.type === 'document') {
					data.attachment.type = 'document';
					data.attachment.document= attachment.file;
				}
				if (attachment.type === 'audio') {
					data.attachment.type = 'audio';
					data.attachment.audio = attachment.file;
				}
			}
			postMessage(data);
		
			setMessageList([...messageList, data]);
			localStorage.setItem('messageList', JSON.stringify(messageList));
		}
	}

	return(
		<div
		className={styles.wrap}
		onDrop={drop}
		onDragOver={dragOver}
		onDragLeave={dragLeave}>
			<HeaderChat />
			<MessageList 
				messageList={messageList} 
				currentUserId={currentUserId} />
			<FormInput 
				sendMessage={sendMessage} />
		</div>
	);
}