import React from 'react';
import { DialogBox } from './DialogBox';
import styles from '../styles/ChatList.module.css';


export function ChatList (props) {
	const list = [];
	let iter = 0;
	const { chatList, setActiveChat } = props;

	if (!chatList) {
		list.push(<div className={styles.noMessage}>No chats</div>);
	} else {
		chatList.map(item => {
			const Chat = <DialogBox key={ iter++ } boxInfo = { item } setActiveChat={setActiveChat}/>;

			list.push(Chat);

		});
	}

	return (			
		<div>
			<div className={styles.wrap}>{ list }</div>
		</div>
	);
}

