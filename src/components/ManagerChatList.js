import React, { useState, useEffect } from 'react';
import { ChatList } from './ChatList';
import { HeaderDialogList } from './HeaderDialogList';
import { ButtonNewChat } from './ButtonNewChat';


export function ManagerChatList(props) {
	const [chatList, setChatList] = useState([]);

	async function getChats() {
		try {
			const response = await fetch('https://127.0.0.1:8000/chat/', {
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
			});
			const jsonResponse = await response.json();

			setChatList(jsonResponse['response']);
		} catch(error) {
			console.error(error);
		}
	}

	async function postChat(data) {
		const formData = new FormData();
		formData.append('title', data.title);
		formData.append('last_message', data.last_message);
		formData.append('is_group_chat', data.is_group_chat);
		formData.append('members', data.member);

		try {
			const response = await fetch('https://127.0.0.1:8000/chat/new/', {
				method: 'POST',
				body: formData,
				mode: 'cors',
				credentials: 'include',
			});
			const jsonResponse = await response.json();
			
			if (response.status === 400) {
				alert(jsonResponse['error']);
			}

			data['id'] = jsonResponse['response']['id'];
		} catch(error) {
			console.error(error);
		}
	}

	useEffect(() => {
		getChats();
	});

	const createChat = (nameChat, username) => {
		const data = {
			id: 0,
			title: nameChat,
			last_message: '',
			is_group_chat: false,
			member: username,
		}

		postChat(data);
		setChatList([...chatList, data]);
		localStorage.setItem('chatList', JSON.stringify(chatList));
	}

	return (
		<div>
			<HeaderDialogList/>
			<ChatList chatList={chatList}/>
			<ButtonNewChat createChat={createChat}/>
		</div>
	);
}
