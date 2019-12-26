import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/HeaderDialogList.module.css';


export function HeaderDialogList(props) {
	return (
		<div className={styles.header}>
			<Link to="/profile" style={{paddingTop: '0'}}>
				<div className={styles.menu}/>
			</Link>
			<div className={styles.message}>Messages</div>
			
			<div className={styles.search}/>
		</div>
	);
}
