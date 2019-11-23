import React, { useContext } from 'react';
import styles from '../styles/DialogBox.module.css'
import { Link } from 'react-router-dom';


export function DialogBox(props) {
	const { boxInfo, setActiveChat } = props;

	function handlerClick(event) {
		// event.preventDefault();
		setActiveChat(boxInfo.id);
	}
	

	return (
		<Link to={`/chat/${boxInfo.id}`}>
			<div className={styles.dialogWrap} onClick={handlerClick}>
				<div className={styles.dialogName}>{ boxInfo.dialogName }</div>						
				<div className={styles.dialogAvatar}/>
				<div className={styles.messageTime}>{ boxInfo.messageTime }</div>					
				<div className={styles.lastMessage}>{ boxInfo.lastMessage }</div>
				<div className={styles.messageStatus}>{ boxInfo.messageStatus }</div>
			</div>
		</Link>
	);
}
