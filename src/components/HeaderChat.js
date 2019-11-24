import React from 'react';
import styles from '../styles/HeaderChat.module.css';


export function HeaderChat(props) {
	function handlerClick(event) {
		props.closeChat();
	}
	return (
		<div className={styles.header}>
			<div className={styles.headerButton}>
				<div className={styles.backButton} onClick={handlerClick} />
			</div>
			<div className={styles.statusConteiner}>
				<div className={styles.userAvatar} />
				<div className={styles.userName}>
					<div className={styles.name}>Eroshev Artem</div>
					<div className={styles.status}>Online</div>
				</div>
			</div>
			<div className={styles.headerButton}>
				<div className={styles.searchButton} />
				<div className={styles.optionsButton} />
			</div>
		</div>
	);
}
