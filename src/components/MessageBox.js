import React from 'react';
import styles from '../styles/MessageBox.module.css';

export function MessageBox(props) {
	const { content, time, shift } = props;
	let style = null;
	if (shift === 'self') {
		style = {float: 'right'};
	}
	return (
		<div className={styles.messageBox} style={style}>
			<div className={styles.text}>{content}</div>
			<div className={styles.time}>{time}</div>
		</div>
	);
}
