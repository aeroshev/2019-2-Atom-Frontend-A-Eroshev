import React from 'react';
import { ButtonNewChat } from './ButtonCreateChat'
import { ChatList } from './ChatList'

export class ManagerChatList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<ChatList/>
				<ButtonNewChat/>
			</div>
		);
	}
}

