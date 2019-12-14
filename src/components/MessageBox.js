import React from 'react';
import styles from '../styles/MessageBox.module.css';

export function MessageBox(props) {
	const { content, shift } = props;

	let style = null;
	if (shift === 'self') {
		style = {float: 'right'};
	}

	return (
		<div className={styles.messageBox} style={style}>
			{!content['attachment']['attachment_type'] && <div className={styles.text}>{content['message']['text']}</div>}
			{content['attachment']['attachment_type'] === 'audio' && <audio src={content['attachment']['audio']} controls />}
			{content['attachment']['attachment_type'] === 'document' && <a href={content['attachment']['file']}>{content.attachment.name}</a>}
			{content['attachment']['attachment_type'] === 'image' && <p className={styles.img}><img src={content['attachment']['image']} alt='' height={'200px'}/></p>}
			<div className={styles.time}>{content['message']['added_at']}</div>
		</div>
	);
}
