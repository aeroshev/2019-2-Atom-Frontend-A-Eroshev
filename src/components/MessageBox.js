import React, { useState } from 'react';
import styles from '../styles/MessageBox.module.css';

export function MessageBox(props) {
	const { content, shift } = props;
	// debugger;
	console.log(content);

	const [attachment, setAttachment] = useState(content.attachment);
	let style = null;
	if (shift === 'self') {
		style = {float: 'right'};
	}

	return (
		<div className={styles.messageBox} style={style}>
			{!attachment && <div className={styles.text}>{content.text}</div>}
			{attachment && content.attachment.type === 'audio' && <audio src={content.attachment.path[0]} controls />}
			<div className={styles.time}>{content.time}</div>
		</div>
	);
}
