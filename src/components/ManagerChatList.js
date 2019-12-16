import React from 'react';
import { ChatList } from './ChatList';
import { HeaderDialogList } from './HeaderDialogList';
import { ButtonNewChat } from './ButtonNewChat';


export class ManagerChatList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			chatList: [],
		};

		this.createChat = this.createChat.bind(this);
	}

	async getChats() {
		const { chatList } = this.state;
		try {
			const response = await fetch('https://127.0.0.1:8000/chat/', {
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
			});
			const jsonResponse = await response.json();

			this.setState({chatList: [...chatList, ...jsonResponse['response']]});
		} catch(error) {
			console.error(error);
		}
	}

	async postChat(data) {
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

	componentDidMount () {
		this.getChats();	
	}

	createChat(nameChat, username) {
		const { chatList } = this.state;
		const data = {
			id: 0,
			title: nameChat,
			last_message: '',
			is_group_chat: false,
			member: username,
		}

		this.postChat(data);
		this.setState({chatList: [...chatList, data]});

		localStorage.setItem('chatList', JSON.stringify(chatList));
	}

	render() {
		const {
			chatList,
		} = this.state;
		return (
			<div>
				<HeaderDialogList/>
				<ChatList chatList={chatList}/>
				<ButtonNewChat createChat={this.createChat}/>
			</div>
		);
	}
}

