import React from 'react';
import styles from '../styles/MessageList.module.css';
import { MessageBox } from './MessageBox';


export function MessageList(props){
		const list = [];
		let iter = 0;
		props.messageList.forEach(item => {
	
			const Message = <MessageBox key={iter++} content={item.content} time={item.time} />;
	
			list.push(Message);
		});

		return (
				<div className={styles.messageWrap}>
					<div className={styles.messageBox}>{ list }</div>
				</div>
		);
}
