import React from 'react';
import styles from '../styles/MessageList.module.css';
import { MessageBox } from './MessageBox';


export function MessageList(props) {
	const { messageList, activeChat, dropStyle } = props;
	const list = [];
	let iter = 1;

	if (activeChat && messageList[activeChat]) {
		messageList[activeChat].map(item => {	
			const Message = <MessageBox key={iter++} content={item.content} time={item.time} />;
			list.push(Message);
		});
	}

	return (
		<div className={styles.messageWrap}>
			<div className={styles.dropZone} style={dropStyle}></div>
			<div className={styles.messageBox}>{ list }</div>
		</div>
	);
}
