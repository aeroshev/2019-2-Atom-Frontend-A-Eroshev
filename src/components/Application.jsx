import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import { ManagerChatList } from './Chats/ManagerChatList';
import { ManagerChat } from './Messages/ManagerChat';
import { UserProfile } from './Profile/Profile';
import { Authentication } from './Authentication/Authentication';


export function Application(props) {
	return (
		<Router>
			<Switch>
				<Route path='/' exact>
					<ManagerChatList/>
				</Route>
				<Route path='/chat'>
					<ManagerChat/>
				</Route>
				<Route path='/profile'>
					<UserProfile/>
				</Route>
				<Route path='/auth'>
					<Authentication/>
				</Route>
			</Switch>
		</Router>
	);
}
