import React from 'react';
import { HeaderDialogList } from './HeaderDialogList'
import { DialogBox } from './DialogBox'
import styles from '../styles/ChatList.module.css'
import { BrowserRouter as Link } from "react-router-dom";
import style_button from '../styles/ButtonCreateChat.module.css';


export function ButtonNewChat (props) {
	let { listDialogs } = props;

	function handleClick(event) {
		event.preventDefault();
		const nameChat = prompt('Name new chat', 'NewChat');
		const time = new Date();
		if (listDialogs.length === 1) {
			listDialogs.pop();
		}
		const boxInfo = {
			id: ((listDialogs.length === 0) ? 1 : listDialogs.length),
			dialogName: nameChat,
			messageTime: time.getTime(),
			lastMessage: '',
			messageStatus: ''
		}

		if (nameChat !== null) {
			const item = <DialogBox key={boxInfo.id} boxInfo={boxInfo}/>;
			listDialogs.push(item);
		}
	}
		return (
			<button className={ style_button.buttonNew } onClick={ handleClick }/>
		);
}

export function ChatList (props) {
	const { chatList } = props;
	let listDialogs = [];

	if (!chatList) {
		listDialogs.push(<b className={styles.noMessage}>No chats</b>);
		} else {
			let timeLastMessageChat;

		chatList.forEach(function(chat, ind, chatList) {
			const item = <DialogBox key={ ind } boxInfo = { chat }/>;
			if (chat.messageTime > timeLastMessageChat) {
				listDialogs.unshift(item);
			} else {
				listDialogs.push(item);
			}

			timeLastMessageChat = chat.messageTime;
		});
	}

		return(
			<div>
				<HeaderDialogList/>
				<div className={styles.wrap}>{ listDialogs }</div>
				<ButtonNewChat listDialogs={ listDialogs }/>
			</div>
		);
}

