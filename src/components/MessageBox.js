import React from 'react'
import styles from '../styles/MessageBox.module.css';

export function MessageBox(props) {
	return (
		<div className={styles.messageBox}>
			<div className={styles.text}>{props.text}</div>
			<div className={styles.time}>{props.time}</div>
		</div>
	)
}
