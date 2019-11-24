import React from 'react';
import styles from '../styles/DialogBox.module.css';


export function DialogBox(props) {
	const { boxInfo, openChat } = props;

	function handlerClick(event) {
		openChat(boxInfo.id);
	}

	return (
		<div className={styles.dialogWrap} onClick={handlerClick}>
			<div className={styles.dialogName}>{boxInfo.dialogName}</div>						
			<div className={styles.dialogAvatar} />
			<div className={styles.messageTime}>{boxInfo.messageTime}</div>					
			<div className={styles.lastMessage}>{boxInfo.lastMessage}</div>
			<div className={styles.messageStatus}>{boxInfo.messageStatus}</div>
		</div>
	);
}
