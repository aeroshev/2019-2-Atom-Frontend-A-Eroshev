import React from 'react';
import { DialogBox } from './DialogBox';
import styles from '../../styles/ChatList.module.css';


export function ChatList (props) {
	const list = [];
	const { chatList } = props;

	if (!chatList.length) {
		list.push(<div key={0} className={styles.noMessage}>No chats</div>);
	} else {
		chatList.map((item, idx) => {
			const Chat = <DialogBox key={idx} boxInfo={item}/>;
			list.push(Chat);
			
			return 0;
		});
	}

	return (			
		<div>
			<div className={styles.wrap}>{list}</div>
		</div>
	);
}

