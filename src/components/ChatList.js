import React from 'react';
import { DialogBox } from './DialogBox';
import styles from '../styles/ChatList.module.css';


export function ChatList (props) {
	const list = [];
	let iter = 0;
	const { chatList } = props;

	if (chatList.length === 0) {
		list.push(<div key={iter} className={styles.noMessage}>No chats</div>);
	} else {
		// eslint-disable-next-line
		chatList.map(item => {
			const Chat = <DialogBox key={iter++} boxInfo={item}/>;
			list.push(Chat);
		});
	}

	return (			
		<div>
			<div className={styles.wrap}>{ list }</div>
		</div>
	);
}

