import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import { ManagerChatList } from './ManagerChatList';
import { ManagerChat } from './ManagerChat';
import { UserProfile } from './Profile';


export function Application(props) {
	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					<ManagerChatList/>
				</Route>
				<Route path="/chat">
					<ManagerChat/>
				</Route>
				<Route path="/profile">
					<UserProfile/>
				</Route>
			</Switch>
		</Router>
	);
}
