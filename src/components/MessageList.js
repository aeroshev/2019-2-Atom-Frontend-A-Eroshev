import React from 'react';
import styles from '../styles/ManagerChat.module.css';
import { FormInput } from './FormInput';
import { MessageBox } from './MessageBox';


export function MessageList(props) {
	const { messageList, listMessages } = props;

	let lastTime = null;
	const list = [];
	let $i = 0;
	messageList.forEach((elem) => {
		const currentTime = elem.time;

		const Message = <MessageBox key={$i++} text={elem.text} time={elem.time}/>;
		let Marker = null;

		listMessages.push(Message);

		lastTime = currentTime;
	});
	return (
			<div className={styles.messageWrap}>
				<div className={styles.messageBox}>{ listMessages }</div>
				<FormInput/>
			</div>
	);
}
