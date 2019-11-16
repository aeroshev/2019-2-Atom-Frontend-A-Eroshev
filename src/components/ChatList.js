import React from 'react';
import { HeaderChat } from './HeaderChat'
import { DialogBox } from './DialogBox'
import styles from '../styles/ChatList.module.css'
import { BrowserRouter as Link } from "react-router-dom";


export function ChatList (props) {
	function handleClick(event) {
		event.preventDefault();
		alert("Senpai!");
	}

		return(
			<div className={styles.wrap}>
				<HeaderChat/>
				<Link to="/chat">
					<DialogBox/>
				</Link>
			</div>
		);
}

