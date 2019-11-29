import React from 'react';
import { HeaderChat } from './HeaderChat';
import { MessageList } from './MessageList';
import { FormInput } from './FormInput';
import { getMedia, startRecord, stopRecord } from '../lib/AudioHelper';
import styles from '../styles/ManagerChat.module.css';


export class ManagerChat extends React.Component {
	constructor(props) {
		super(props);

		const info = this.parseData();

		this.state = {
			mediaRecorder: getMedia().then((stream) => {
				const mr = new MediaRecorder(stream)
				console.log(mr)
				return mr
			}).catch(() => {console.log('AAAAAAAAAAAAA')}),
			messageMap: info.messageMap,
			activeChat: props.activeChat,
			setVisibleDropZone: false,
		};

		this.sendMessage = this.sendMessage.bind(this);
		this.activateDropZone = this.activateDropZone.bind(this);
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

	activateDropZone() {
		const { setVisibleDropZone } = this.state;
		this.setState({setVisibleDropZone: true});
	}

	sendMessage(message) {
		const { messageMap, activeChat } = this.state;
		console.log(messageMap);
		console.log(activeChat);
		let date = new Date(parseInt(new Date().getTime(), 10));
        date = date.toString().split(' ')[4].split(':');

		if (activeChat >= 0 && message) {
			if (messageMap[activeChat]) {
				messageMap[activeChat] = [...messageMap[activeChat], { 
					id: messageMap[activeChat].length + 2, 
					attachment: null,
					owner: 'self',
					content: message,
					time: date[0] + ':' + date[1],
				}];
				this.setState({messageMap: messageMap,});
			} else {
				const map = [...messageMap, [{
					id: 1, 
					attachment: null,
					owner: 'self',
					content: message,
					time: date[0] + ':' + date[1],
				}]];
				console.log(map);
				this.setState({messageMap: map,});
			}

			localStorage.setItem('messageMap', JSON.stringify(messageMap));
		}
	}

	render() {
		const {
			messageMap,
			activeChat,
			setVisibleDropZone,
		} = this.state;

		return(
			<div className={styles.wrap}>
				<HeaderChat />
				<MessageList messageList={messageMap} activeChat={activeChat} dropAllowed={setVisibleDropZone}/>
				<FormInput sendMessage={this.sendMessage} activateDropZone={this.activateDropZone} mediaRecorder={this.state.mediaRecorder}/>
			</div>
		);
	}
}