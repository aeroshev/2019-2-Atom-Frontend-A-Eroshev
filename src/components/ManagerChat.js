import React from 'react';
import { HeaderChat } from './HeaderChat';
import { MessageList } from './MessageList';
import { FormInput } from './FormInput';
import styles from '../styles/ManagerChat.module.css';


export class ManagerChat extends React.Component {
	constructor(props) {
		super(props);

		const info = this.parseData();

		this.state = {
			messageMap: info.messageMap,
			activeChat: props.activeChat,
			setVisibleDropZone: false,
		};

		this.sendMessage = this.sendMessage.bind(this);
		this.activateDropZone = this.activateDropZone.bind(this);
	}

	componentDidMount() {
		try {
			const json = localStorage.getItem('messageMap');
			const messageList = JSON.parse(json);

			if (messageList) {
				this.setState({
					messageMap: messageList,
				});
			}
		} catch(Error) {
			localStorage.clear();
			console.log('Error parse');
			this.setState({
				messageMap: null,
			})
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.activeChat !== prevProps.activeChat){
			this.setState({
				activeChat: this.props.activeChat,
			});
		}
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
		this.setState({setVisibleDropZone: true});
	}

	sendMessage(message, newAttachment) {
		const { messageMap, activeChat } = this.state;
		debugger;

		let date = new Date(parseInt(new Date().getTime(), 10));
        date = date.toString().split(' ')[4].split(':');

		if (activeChat >= 0 && (message || newAttachment)) {
			if (messageMap[activeChat]) {
				messageMap[activeChat] = [...messageMap[activeChat], { 
					id: messageMap[activeChat].length + 2, 
					attachment: /*messageMap.attachment = */newAttachment,
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
			setVisibleDropZone,
		} = this.state;

		return(
			<div className={styles.wrap}>
				<HeaderChat />
				<MessageList messageMap={messageMap} activeChat={activeChat} dropAllowed={setVisibleDropZone}/>
				<FormInput sendMessage={this.sendMessage} activateDropZone={this.activateDropZone} mediaRecorder={this.state.mediaRecorder}/>
			</div>
		);
	}
}