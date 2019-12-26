import React from 'react';
import styles from '../../styles/ButtonNewChat.module.css';


export function ButtonNewChat (props) {
    const { createChat } = props;

	function handleClick(event){
        const nameChat = prompt('Name new chat', 'NewChat');
        const userName = prompt('Input member', '');
        if (userName) {
            createChat(nameChat, userName);
        }
    }

	return (
        <button className={styles.buttonNew} onClick={handleClick} type='submit' />
    );
}