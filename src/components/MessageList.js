import React from 'react';
import styles from '../styles/MessageList.module.css';
import { MessageBox } from './MessageBox';


export function MessageList(props) {
	const { messageMap, activeChat } = props;
	const list = [];
	let iter = 1;

	if (activeChat > 0 && messageMap[activeChat]) {
		// eslint-disable-next-line
		messageMap[activeChat].map(item => {
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
			{ list }
		</div>
	);
}
