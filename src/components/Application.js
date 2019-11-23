import React from 'react';
import { ManagerChatList } from './ManagerChatList';
import { ManagerChat } from './ManagerChat';
import { UserProfile } from './Profile';
import ActiveChatContext from './Context';
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

		this.setActiveChat.bind(this);
	}

	setActiveChat(id) {
		const { activeChat } = this.state;
		this.setState(
			{activeChat: activeChat},
		);
	}

	render() {
		return (
			<Router>
				<Switch>
					<ActiveChatContext.Provider value={this.setActiveChat}>
						<Route path="/" exact>
							<ManagerChatList  />
						</Route>
						<Route path="/chat">
							<ManagerChat activeChat={this.activeChat}/>
						</Route>
						<Route path="/profile" component={ UserProfile } />
					</ActiveChatContext.Provider>
				</Switch>
			</Router>
		)
	}
}

