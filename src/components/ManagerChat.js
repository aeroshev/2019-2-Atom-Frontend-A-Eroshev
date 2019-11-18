import React from 'react';
import { FormInput } from './FormInput';
import { HeaderChat } from './HeaderChat';
import { MessageBox } from './MessageBox';
import { MessageList } from './MessageList';
import MyContext from './Context';
import styles from '../styles/ManagerChat.module.css';


export class ManagerChat extends React.Component {
	constructor(props) {
		super(props);
		this.loadTest();

		const info = this.parseData();

		this.state = {
			messageList: info.messageList,
			listMessages: [],
		};

	}

	loadTest() {
		const time = new Date();

		const dialogBox1 = {
			id: 0,
			content: 'some',
			time: time.getTime(),
		};

		const dialogBox2 = {
			id: 1,
			content: 'some',
			time: time.getTime(),
		};

		const arr = [dialogBox1, dialogBox2];
		localStorage.setItem('chatList', JSON.stringify(arr));

		return;
	}

	parseData() {
		let data;
		try {
			data = {
				messageList: JSON.parse(localStorage.getItem('messageList'))
			};
		} catch (Error) {
			localStorage.clear();
			console.log('Error local storage');
			data = {
				messageList: null
			};
		}
		return data;
	}

	formEntered(value) {
		const { activeChat, messageList } = this.state;
		messageList[activeChat - 1].push({
			time: new Date().getTime(),
			text: value,
		});
		this.setState({
			messageList,
		});
	}

	render() {
		const {
			messageList,
			listMessages
		} = this.state;
		return(
			<MyContext.Provider value={this}>
				<div className={styles.header}>
					<HeaderChat/>
				</div>
				<MessageList messageList={messageList} listMessages={listMessages}/>
				<FormInput />
			</MyContext.Provider>
		);
	}
}
