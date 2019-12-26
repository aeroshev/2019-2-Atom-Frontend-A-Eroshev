import React from 'react';
import styles from '../../styles/MessageList.module.css';
import { MessageBox } from './MessageBox';


export function MessageList(props) {
	const { messageList, currentUserId, activeChat } = props;
	const list = [];

	if (activeChat && messageList) {
		messageList.map((item, idx) => {
			if (item['message']['user_id'] === currentUserId) {
				const Message = (<div className={styles.messageBox} key={idx}>
										<MessageBox shift={'self'} content={item}/>
								</div>);
				list.push(Message);
			} else {
				const Message = (<div className={styles.messageBox} key={idx}>
										<MessageBox shift={'outside'} content={item}/>
								</div>);
				list.push(Message);
			}
			return 0;
		});
	}

	return (
		<div className={styles.messageWrap}>{list}</div>
	);
}
