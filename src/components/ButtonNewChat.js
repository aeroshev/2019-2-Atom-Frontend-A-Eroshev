import React from 'react';
import styles from '../styles/ButtonNewChat.module.css';


export function ButtonNewChat (props) {

	function handleClick(event) {
        event.preventDefault();
		const nameChat = prompt('Name new chat', 'NewChat');
        
        props.createChat(nameChat);
    }

	return (
        <button className={styles.buttonNew} onClick={handleClick}/>
    );
}