import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/DialogBox.module.css';


export function DialogBox(props) {
	const { boxInfo, setActiveChat } = props;

	function handleClick(event) {
		setActiveChat(boxInfo.id);
	}

	return (
		<Link to={`/chat/${boxInfo.id}`} onClick={handleClick}>
			<div className={styles.dialogWrap}>
				<div className={styles.dialogAvatar}>{boxInfo.avatar}</div>
				<div className={styles.textContent}>
					<div className={styles.dialogName}>{boxInfo.title}</div>
					<div className={styles.lastMessage}>{boxInfo.last_message}</div>
				</div>	
				<div className={styles.status}>			
					<div className={styles.messageTime}></div>					
					<div className={styles.messageStatus}></div>
				</div>	
			</div>
		</Link>
	);
}
