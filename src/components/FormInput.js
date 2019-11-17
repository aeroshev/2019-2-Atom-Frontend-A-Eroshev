import React from 'react';
import styles from '../styles/FormInput.module.css'


export function FormInput(props) {
	function handlerSubmit(event) {
		alert('OnSubmit');
		event.preventDefault();
	}
	return (
		<div>
			<div className={styles.inputButton}>
				<div className={styles.additionalButton}/>
			</div>
			<form onSubmit={handlerSubmit}>
				<label>
					<input className={styles.customInput} placeholder={'Message'} name={'scroll'}/>
				</label>
			</form>
			<div className={styles.inputButton}>
				<div className={styles.sendButton}/>
			</div>
		</div>
	);
}
