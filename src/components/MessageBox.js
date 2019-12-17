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
			{!content['attachment']['type'] && <div className={styles.text}>{content['message']['text']}</div>}
			{content['attachment']['type'] === 'audio' && <audio src={content['attachment']['path']} controls />}
			{content['attachment']['type'] === 'document' && <a href={content['attachment']['path']}>{content.attachment.name}</a>}
			{content['attachment']['type'] === 'image' && <p className={styles.img}><img src={content['attachment']['path']} alt='' height={'200px'}/></p>}
			<div className={styles.time}>{content['message']['added_at']}</div>
		</div>
	);
}
