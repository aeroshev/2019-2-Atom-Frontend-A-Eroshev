import React from 'react';
import MyContext from './Context';
import styles from '../styles/ManagerChat.module.css';
import { FormInput } from './FormInput'


export function MessageList(props) {
	const { messageList, listMessages } = props;
	return (
			<div className={styles.messageWrap}>
				<div className={styles.messageBox}>{ listMessages }</div>
				<MyContext.Consumer>
					{(value) => (<FormInput formEntered={value.formEntered.bind(value)}/>)}
				</MyContext.Consumer>
			</div>
	);
}
