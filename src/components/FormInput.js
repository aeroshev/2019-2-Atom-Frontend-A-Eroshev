import React, { useContext } from 'react';
import MyContext from './Context';
import styles from '../styles/FormInput.module.css';


export function FormInput(props) {
	const { formEntered } = useContext(MyContext);
	const input = React.useRef(null);

	function onSubmit() {
		const value = input.current.value.trim();
		if (value !== '') {
			input.current.value = '';
			formEntered.bind(value)
		}
	}

	function handlerSubmit(event) {
		if (event.charCode === 13) {
			onSubmit();
		}
	}
	return (
		<div className={styles.footer}>
			<div className={styles.inputButton}>
				<div className={styles.additionalButton}/>
			</div>
			<input className={styles.customInput} onKeyPress={handlerSubmit} ref={input} placeholder={'Message'}/>
			<div className={styles.inputButton}>
				<div className={styles.sendButton} onClick={onSubmit}/>
			</div>
		</div>
	);
}
