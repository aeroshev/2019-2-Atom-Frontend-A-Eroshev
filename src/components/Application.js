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
			activeChat: -1,
		}

		this.setActiveChat = this.setActiveChat.bind(this);
	}

	setActiveChat(id) {
		const { activeChat } = this.state;
		this.setState(
			{activeChat: id},
		);
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route path="/" exact>
						<ManagerChatList  setActiveChat={this.setActiveChat}/>
					</Route>
					<Route path="/chat">
						<ManagerChat activeChat={this.activeChat}/>
					</Route>
					<Route path="/profile" component={ UserProfile } />
				</Switch>
			</Router>
		)
	}
}

