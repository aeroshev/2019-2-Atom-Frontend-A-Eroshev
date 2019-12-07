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

	componentDidMount() {
		try {
			const json = localStorage.getItem('activeChat');
			const chatId = JSON.parse(json);


			if (chatId >= 0) {
				this.setState({
					activeChat: chatId,
				});
			}
		} catch(Error) {
			localStorage.clear();
		}
	}

	setActiveChat(id) {
		this.setState(
			{activeChat: id},
		);
		localStorage.setItem('activeChat', JSON.stringify(id));
	}

	render() {
		const {
			activeChat,
		} = this.state;

		return (
			<Router>
				<Switch>
					<Route path="/2019-2-Atom-Frontend-A-Eroshev" exact>
						<ManagerChatList  setActiveChat={this.setActiveChat}/>
					</Route>
					<Route path="/2019-2-Atom-Frontend-A-Eroshev/chat">
						<ManagerChat activeChat={activeChat}/>
					</Route>
					<Route path="/2019-2-Atom-Frontend-A-Eroshev/profile" component={ UserProfile } />
				</Switch>
			</Router>
		);
	}
}

