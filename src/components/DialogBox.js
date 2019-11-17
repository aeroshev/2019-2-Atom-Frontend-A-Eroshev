import React from 'react';
import styles from '../styles/DialogBox.module.css'
import { Link } from 'react-router-dom';


export function DialogBox(props) {
	const { boxInfo } = props;
	return (
		<Link to={`/chat/${boxInfo.id}`}>
			<div className={styles.dialogWrap}>
				<div className={styles.dialogName}>{ boxInfo.dialogName }</div>
				<div className={styles.dialogAvatar}/>
				<div className={styles.messageTime}>{ boxInfo.messageTime }</div>
				<div className={styles.lastMessage}>{ boxInfo.lastMessage }</div>
				<div className={styles.messageStatus}>{ boxInfo.messageStatus }</div>
			</div>
		</Link>
	);
}
