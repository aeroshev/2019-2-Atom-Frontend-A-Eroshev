import React from 'react';
import styles from '../styles/MessageBox.module.css';

export function MessageBox(props) {
	const { content, time } = props;
	return (
		<div className={styles.messageBox}>
			<div className={styles.text}>{content}</div>
			<div className={styles.time}>{time}</div>
		</div>
	);
}
