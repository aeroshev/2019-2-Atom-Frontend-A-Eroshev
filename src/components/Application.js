import React from 'react';
import { ManagerChatList } from './ManagerChatList';
import { ManagerChat } from './ManagerChat';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";

export class Application extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Router>
				<div>
					<Switch>
						<Route path="/">
							<ManagerChatList/>
						</Route>
						<Route path="/chat">
							<ManagerChat/>
						</Route>
					</Switch>
				</div>
			</Router>
		)
	}
}

