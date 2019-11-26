import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/DialogBox.module.css';


export function DialogBox(props) {
	const { boxInfo, setActiveChat } = props;

	function handlerClick(event) {
		setActiveChat(boxInfo.id);
	}

	return (
		<Link to={`/chat/${boxInfo.id}`} onClick={handlerClick}>
			<div className={styles.dialogWrap}>
				<div className={styles.dialogAvatar} />
				<div className={styles.textContent}>
					<div className={styles.dialogName}>{boxInfo.dialogName}</div>
					<div className={styles.lastMessage}>{boxInfo.lastMessage}></div>
				</div>	
				<div className={styles.status}>			
					<div className={styles.messageTime}>{boxInfo.messageTime}</div>					
					<div className={styles.messageStatus}>{boxInfo.messageStatus}</div>
				</div>	
			</div>
		</Link>
	);
}
