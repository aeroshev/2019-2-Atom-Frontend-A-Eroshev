import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import { ManagerChatList } from './ManagerChatList';
import { ManagerChat } from './ManagerChat';
import { UserProfile } from './Profile';
import { Test } from './Test';

export class Application extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeChat: null,
		};

		this.setActiveChat = this.setActiveChat.bind(this);

		Test();
	}

	setActiveChat(id) {
		this.setState(
			{activeChat: id},
		);
	}

	render() {
		const {
			activeChat,
		} = this.state;

		return (
			<Router>
				<Switch>
					<Route path="/" exact>
						<ManagerChatList  setActiveChat={this.setActiveChat}/>
					</Route>
					<Route path="/chat">
						<ManagerChat activeChat={activeChat}/>
					</Route>
					<Route path="/profile" component={ UserProfile } />
				</Switch>
			</Router>
		);
	}
}

