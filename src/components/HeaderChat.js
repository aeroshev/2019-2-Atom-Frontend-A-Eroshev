import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/HeaderChat.module.css';


export function HeaderChat(props) {
	return (
		<div className={styles.header}>
			<div className={styles.headerButton}>
				<Link to='/2019-2-Atom-Frontend-A-Eroshev'>
					<div className={styles.backButton}/>
				</Link>
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
