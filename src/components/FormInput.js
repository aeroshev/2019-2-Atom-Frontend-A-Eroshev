import React, { useState } from 'react';
import { SendButton } from './SendButton';
import styles from '../styles/FormInput.module.css';
import { get } from 'http';


export function FormInput(props) {
	const { sendMessage, activateDropZone } = props;

	const [message, setMessage] = useState('');
	const [attachment, setAttachment] = useState([]);
	const [styleMenu, setStyleMenu] = useState({display: 'none'});

	
	function handleSubmit(event, audioURL = null) {
		if (event) {	
			event.preventDefault();
		}	
		let object = null;
		if (audioURL) {
			object = {
				type: 'audio',
				path: audioURL,
			}
		}
		sendMessage(message, object);
		setMessage('');
	}

	function getAudio(audioURL) {
		const object = {
			type: 'audio',
			path: audioURL,
		}
		debugger;
		// attachment.push(object);
		setAttachment([object]);
		console.log(attachment);
		handleSubmit();
	}

	function handleAdditional(event) {
		const { display } = styleMenu;
		setStyleMenu({
			display: (display === 'none')? 'flex': 'none',
		});
	}

	function handleChange(event) {
		setMessage(event.target.value);
	}
	
	function handlerGeo(event) {
		navigator.geolocation.getCurrentPosition(position => {
			const geoMessage = `https://www.openstreetmap.org/#map=17/${position.coords.latitude}/${position.coords.longitude}`;
			const geoObject = <a href={geoMessage}>{geoMessage}</a>;
			sendMessage(geoObject);
		});
	}

	function handlerImage(event) {
		alert('Click image');
		activateDropZone();
	}

	function handlerDocument(event) {
		alert('Documnet');
	}

	return (
		<div className={styles.footer}>
			<div className={styles.inputButton}>
				<div className={styles.additionalButton} onClick={handleAdditional}>
					<ul className={styles.listStyle} style={styleMenu}>
						<li className={styles.li} onClick={handlerGeo}>Geolocation</li>
						<li className={styles.li} onClick={handlerDocument}>Documnet</li>
						<li className={styles.li} onClick={handlerImage}>Image</li>
					</ul>
				</div>
			</div>
			<form className={styles.customInput}
				onSubmit={handleSubmit}>
				<input className={styles.customInput}
					onChange={handleChange}
					value={message}
					placeholder='Message'
					type='text' />
			</form>
			<SendButton getAudio={handleSubmit} />
		</div>
	);
}
