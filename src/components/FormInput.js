import React, { useState } from 'react';
import { SendButton } from './SendButton';
import { getMedia, startRecord, stopRecord } from '../lib/AudioHelper';
import styles from '../styles/FormInput.module.css';


export function FormInput(props) {
		const { sendMessage } = props;

		const [message, setMessage] = useState('');
		const [additional, setAdditional] = useState(null);
		const [styleMenu, setStyleMenu] = useState({display: 'none'});
		const [typeSendButton, setTypeSendButton] = useState('send');
		const [mediaRecorder, setMediaRecorder] = useState(getMedia().then((stream) => {
			return new MediaRecorder(stream);
		}).catch(() => {return null;}));
	

	function handleSubmit(event) {
		event.preventDefault();
		sendMessage(message);
		setMessage('');
	}

	function handlerCancel(event) {
		setTypeSendButton('send');

		mediaRecorder.then(media => { return stopRecord(media); });
		sendMessage(additional);

		console.log(additional);
	
		alert('Cancel');
	}

	function handlerRecord(event) {
		alert('Reacord');
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

	function handlerAudio(event) {
		setTypeSendButton('cancel');

		mediaRecorder.then(media => { return startRecord(media, (Url, blob) => {
			setAdditional({
				type: 'audio',
				meta: [
					{
						path: Url,
						file: blob,
					},
				],
			});
		}) }).catch(console.log);
		alert('Click audio');
	}



	function handlerImage(event) {
		alert('Click image');
	}

	return (
		<div className={styles.footer}>
			<div className={styles.inputButton}>
				<div className={styles.additionalButton} onClick={handleAdditional}>
					<ul className={styles.listStyle} style={styleMenu}>
						<li className={styles.li} onClick={handlerGeo}>Geolocation</li>
						<li className={styles.li} onClick={handlerAudio}>AudioMessage</li>
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
			<SendButton
				send={handleSubmit}
				record={handlerRecord}
				cancel={handlerCancel}
				type={typeSendButton} />
		</div>
	);
}
