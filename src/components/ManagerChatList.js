import React from 'react';
import { ChatList } from './ChatList'

export class ManagerChatList extends React.Component {
	constructor(props) {
		super(props);

		const info = this.parseData();

		this.state = {
			chatList: info.chatList,
			messageList: info.messageList
		};
	}

	parseData() {
		let data;
		try {
			data = {
				chatList: JSON.parse(localStorage.getItem('chatList')),
				messageList: JSON.parse(localStorage.getItem('messageList'))
			};
		} catch (Error) {
				localStorage.clear();
				console.log('Error local storage');
				data = {
					chatList: null,
					messageList: null
				};
		}
		return data;
	}

	render() {
		const {
			chatList,
			messageList
		} = this.state;
		return (
			<div>
				<ChatList chatList={chatList}/>
			</div>
		);
	}
}

