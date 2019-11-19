import React from 'react';
import styles from '../styles/HeaderChat.module.css';
import { Link } from "react-router-dom";

export function HeaderChat(props) {
	return (
		<div className={styles.header}>
			<div className={styles.headerButton}>
				<Link to={"/"}>
					<div className={styles.backButton}/>
				</Link>
			</div>
			<div className={styles.statusConteiner}>
				<div className={styles.userAvatat}></div>
				<div className={styles.userName}>
					<div className={styles.name}>Eroshev Artem</div>
					<div className={styles.status}>Online</div>
				</div>
			</div>
			<div className={styles.headerButton}>
				<div className={styles.searchButton}/>
				<div className={styles.optionsButton}/>
			</div>
		</div>
	)
}
