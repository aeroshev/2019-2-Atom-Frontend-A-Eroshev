import React from 'react';
import { ManagerChatList } from './ManagerChatList';
import { ManagerChat } from './ManagerChat';
import { Test } from './Test';


export class Application extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeChat: null,
			animations: {
				displayMenu: {
					display: 'block',
				},
				displayChat: {
					display: 'none',
				},
			},
		};

		this.openChat = this.openChat.bind(this);
		this.closeChat = this.closeChat.bind(this);

		Test();
	}

	openChat(id) {
		const { state } = this;
		state.activeChat = id;
		state.animations.displayMenu = { display: 'none' };
		state.animations.displayChat = { display: 'block' };

		this.setState(state);
		console.log(this.state.activeChat);
	}

	// setActiveChat(id) {
	// 	this.setState(
	// 		{activeChat: id},
	// 	);
	// }



	closeChat() {
		const { state } = this;
		state.activeChat = null;
		state.animations.displayMenu = { display: 'block' };
		state.animations.displayChat = { display: 'none' };


		this.setState(state);
	}

	render() {
		const {
			activeChat,
			animations,
		} = this.state;

		console.log(activeChat);

		return (
			<div>
				<ManagerChatList 
					displayMenu={animations.displayMenu} 
					openChat={this.openChat} />
				<ManagerChat 
					displayChat={animations.displayChat} 
					activeChat={activeChat} 
					closeChat={this.closeChat} />
			</div>
		);
	}
}

