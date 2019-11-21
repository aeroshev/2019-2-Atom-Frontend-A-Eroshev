import React from 'react'
import styles from '../styles/Profile.module.css';

export function UserProfile(props) {
	return (
		<div className={styles.paper}>
			<div className={styles.toolBar}></div>
			<div className={styles.avatar}></div>
		</div>	
	);
}
