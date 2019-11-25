import React from 'react';
import { HeaderChat } from './HeaderChat';
import { MessageList } from './MessageList';
import { FormInput } from './FormInput';


export class ManagerChat extends React.Component {
	constructor(props) {
		super(props);

		const info = this.parseData();

		this.state = {
			messageMap: info.messageMap,
			activeChat: props.activeChat,
		};

		this.sendMessage = this.sendMessage.bind(this);
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

	sendMessage(message) {
		const { messageMap, activeChat } = this.state;

		console.log(message);

		if (activeChat !== null ){
			messageMap[activeChat].push({ 
				id: messageMap[activeChat].length, 
				content: message,
				time: new Date().getTime(),
			});
			this.setState({messageMap,});

			localStorage.setItem('messageMap', JSON.stringify(messageMap));
		}
	}

	render() {
		const {
			messageMap,
			activeChat,
		} = this.state;

		return(
			<div>
				<HeaderChat />
				<MessageList messageList={messageMap} activeChat={activeChat} />
				<FormInput sendMessage={this.sendMessage} />
			</div>
		);
	}
}
