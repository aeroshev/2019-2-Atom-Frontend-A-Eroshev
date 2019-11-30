import React, { useEffect, useState } from 'react';
import styles from '../styles/MessageList.module.css';
import { MessageBox } from './MessageBox';


export function MessageList(props) {
	const { messageMap, activeChat, dropAllowed } = props;
	const list = [];
	let iter = 1;

	const [messageList, setMessageList] = useState(messageMap);

	useEffect(() => {
		if (messageList !== messageMap) {
			setMessageList(messageMap);
		}
	});

	if (activeChat >= 0 && messageList[activeChat]) {
		messageList[activeChat].map(item => {	
			if (item.owner === 'self') {
				const Message = (<div className={styles.messageBox} key={iter++}>
										<MessageBox shift={'self'} content={item} />
								</div>);
				list.push(Message);
			} else if (item.owner === 'outside') {
				const Message = (<div className={styles.messageBox} key={iter++}>
										<MessageBox shift={'outside'} content={item} />
								</div>);
				list.push(Message);
			} else {
				console.log('Error');
			}
		});
	}

	return (
		<div className={styles.messageWrap}>
			{dropAllowed && <div className={styles.dropZone} />}
			{!dropAllowed && <div>{ list }</div>}
		</div>
	);
}
