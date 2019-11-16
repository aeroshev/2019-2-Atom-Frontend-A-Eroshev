import React from 'react';
import styles from '../styles/ButtonCreateChat.module.css';


export function ButtonNewChat(props) {
	function handleClick(event) {
		event.preventDefault();
		alert("Senpai!");
	}
		return (
			<button className={styles.buttonNew} onClick={handleClick}/>
		);
}
