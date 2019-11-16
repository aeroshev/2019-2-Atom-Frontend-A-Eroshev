import React from 'react';
import styles from '../styles/DialogBox.module.css'


export function DialogBox(props) {
	return (
		<div className={styles.dialogWrap}>
			<div className={styles.dialogName}>Dialog Name</div>
			<div className={styles.dialogAvatar}/>
			<div className={styles.messageTime}>12:00</div>
			<div className={styles.lastMessage}>Hello world!</div>
			<div className={styles.messageStatus}>unread</div>
		</div>
	);
}
