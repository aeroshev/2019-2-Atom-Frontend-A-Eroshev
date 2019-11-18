import React from 'react';
import { ChatList } from './ChatList'
import { HeaderDialogList } from './HeaderDialogList'

export class ManagerChatList extends React.Component {
	constructor(props) {
		super(props);
		this.loadTest();

		const info = this.parseData();

		this.state = {
			chatList: info.chatList,
			listDialogs: [],
		};

	}

	loadTest() {
		const time = new Date();

		const dialogBox1 = {
			id: 0,
			dialogName: 'some',
			lastMessage: '',
			timeLastMessage: time.getTime(),
			messageStatus: 'read',
		};

		const dialogBox2 = {
			id: 1,
			dialogName: 'some',
			lastMessage: '',
			timeLastMessage: time.getTime(),
			messageStatus: 'read',
		};

		const arr = [dialogBox1, dialogBox2];
		localStorage.setItem('chatList', JSON.stringify(arr));

		return;
	}

	parseData() {
		let data;
		try {
			data = {
				chatList: JSON.parse(localStorage.getItem('chatList')),
			};
		} catch (Error) {
			localStorage.clear();
			console.log('Error local storage');
			data = {
				chatList: null,
			};
		}
		return data;
	}

	render() {
		const {
			chatList,
			listDialogs
		} = this.state;
		return (
			<div>
				<HeaderDialogList/>
				<ChatList chatList={chatList} listDialogs={listDialogs}/>
			</div>
		);
	}
}

