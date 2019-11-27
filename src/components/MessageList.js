import React from 'react';
import styles from '../styles/MessageList.module.css';
import { MessageBox } from './MessageBox';


export function MessageList(props) {
	const { messageList, activeChat, dropStyle } = props;
	const list = [];
	let iter = 1;

	if (activeChat && messageList[activeChat]) {
		messageList[activeChat].map(item => {	
			if (item.owner === 'self') {
				const Message = (<div className={styles.messageBox} key={iter++}>
										<MessageBox shift={'self'} content={item.content} time={item.time} />
								</div>);
				list.push(Message);
			} else if (item.owner === 'outside') {
				const Message = (<div className={styles.messageBox} key={iter++}>
										<MessageBox shift={'outside'} content={item.content} time={item.time} />
								</div>);
				list.push(Message);
			} else {
				console.log('Error');
			}
		});
	}

	return (
		<div className={styles.messageWrap}>
			<div className={styles.dropZone} style={dropStyle}></div>
			<div>{ list }</div>
		</div>
	);
}
