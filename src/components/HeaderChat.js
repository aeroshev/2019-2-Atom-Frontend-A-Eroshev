import React from 'react'
import styles from '../styles/HeaderChat.module.css'


export function HeaderChat(props) {
	return (
		<div className={styles.header}>
			<div className={styles.menu}/>
			<div className={styles.message}>Messages</div>
			<div className={styles.search}/>
		</div>
	);
}
