import React from 'react';
import styles from '../../styles/MessageList.module.css';
import { MessageBox } from './MessageBox';
import { useSelector } from 'react-redux';


export function MessageList(props) {
	const { messageList, currentUserId } = props;
	const activeChat = useSelector(state => state.chat);
	const list = [];
	let iter = 1;

	if (activeChat > 0 && messageList) {
		// eslint-disable-next-line
		messageList.map(item => {
			if (item['message']['user_id'] === currentUserId) {
				const Message = (<div className={styles.messageBox} key={iter++}>
										<MessageBox shift={'self'} content={item} />
								</div>);
				list.push(Message);
			} else {
				const Message = (<div className={styles.messageBox} key={iter++}>
										<MessageBox shift={'outside'} content={item} />
								</div>);
				list.push(Message);
			}
		});
	}

	return (
		<div className={styles.messageWrap}>
			{ list }
		</div>
	);
}