import React from 'react';
import styles from '../styles/DialogBox.module.css'
import { Link } from 'react-router-dom';
import ActiveChatContext from './Context';


export function DialogBox(props) {
	const { boxInfo } = props;

	function handlerClick(event) {
		return boxInfo.id;
	}

	return (
		<Link to={`/chat/${boxInfo.id}`} onClick={handlerClick}>
			<ActiveChatContext.Provider value={handlerClick}>
				<div className={styles.dialogWrap}>
					<div className={styles.dialogName}>{ boxInfo.dialogName }</div>						
					<div className={styles.dialogAvatar}/>
					<div className={styles.messageTime}>{ boxInfo.messageTime }</div>
					<div className={styles.lastMessage}>{ boxInfo.lastMessage }</div>
					<div className={styles.messageStatus}>{ boxInfo.messageStatus }</div>
				</div>
			</ActiveChatContext.Provider>
		</Link>
	);
}
