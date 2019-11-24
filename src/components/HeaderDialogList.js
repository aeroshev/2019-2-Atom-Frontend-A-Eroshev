import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/HeaderDialogList.module.css';


export function HeaderDialogList(props) {
	return (
		<div className={styles.header}>
			<div className={styles.menu}/>
			<div className={styles.message}>Messages</div>
			<div className={styles.search}/>
		</div>
	);
}
