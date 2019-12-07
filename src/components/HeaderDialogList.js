import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/HeaderDialogList.module.css';


export function HeaderDialogList(props) {
	return (
		<div className={styles.header}>
			<Link to="/2019-2-Atom-Frontend-A-Eroshev/profile">
				<div className={styles.menu}/>
			</Link>
			<div className={styles.message}>Messages</div>
			<div className={styles.search}/>
		</div>
	);
}
