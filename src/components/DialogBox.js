import React, { useContext } from 'react';
import styles from '../styles/DialogBox.module.css'
import { Link } from 'react-router-dom';
import ActiveChatContext from './Context';


export function DialogBox(props) {
	const { boxInfo } = props;
	const { setActiveChat } = useContext(ActiveChatContext);

	return (
		<Link to={`/chat/${boxInfo.id}`} onClick={setActiveChat.bind(null, boxInfo.id)}>
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
