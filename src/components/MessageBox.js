import React, { useState } from 'react';
import styles from '../styles/MessageBox.module.css';

export function MessageBox(props) {
	const { content, shift } = props;
	debugger;
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
			{attachment && content.attachment.type === 'document' && <a href={content.attachment.path[0]}>{content.attachment.name}</a>}
			{attachment && content.attachment.type === 'image' && <p className={styles.img}><img src={content.attachment.path[0]} height={'80'}/></p>}
			<div className={styles.time}>{content.time}</div>
		</div>
	);
}
