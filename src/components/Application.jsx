import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import { connect } from 'react-redux';
import { ManagerChatList } from './Chats/ManagerChatList';
import { ManagerChat } from './Messages/ManagerChat';
import { UserProfile } from './Profile/Profile';
import { Authentication } from './Authentication/Authentication';

const putStateToProps = (state) => {
	return {
		activeChat: state.chat,
	};
};

const WrappedManagerChat = connect(putStateToProps, null)(ManagerChat);


export function Application() {
	return (
		<Router basename={process.env.NODE_ENV==='production' ? '/2019-2-Atom-Frontend-A-Eroshev' : undefined}>
			<Switch>
				<Route path='/' exact>
					<ManagerChatList/>
				</Route>
				<Route path='/chat'>
					<WrappedManagerChat/>
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
