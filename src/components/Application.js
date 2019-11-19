import React from 'react';
import { ManagerChatList } from './ManagerChatList';
import { ManagerChat } from './ManagerChat';
import { UserProfile } from './Profile';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";

export class Application extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeChat: 0,
		}
	}

	setActiveChat(id) {
		const { activeChat } = this.state;
		activeChat = id;
		this.setState(
			activeChat,
		);
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route path="/" exact component={ ManagerChatList } />
					<Route path="/chat" component={ ManagerChat } />
					<Route path="/profile" component={ UserProfile } />
				</Switch>
			</Router>
		)
	}
}

