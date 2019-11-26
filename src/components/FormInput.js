import React, { useState } from 'react';
import { SendButton } from './SendButton';
import { getMedia, startRecord, stopRecord } from '../lib/AudioHelper';
import styles from '../styles/FormInput.module.css';


export function FormInput(props) {
		const { sendMessage, activateDropZone, mediaRecorder } = props;

		const [message, setMessage] = useState('');
		const [additional, setAdditional] = useState({type: 'audio', meta: [{path: '', file: ''}]});
		const [styleMenu, setStyleMenu] = useState({display: 'none'});
		const [audioURL, setAudioURL] = useState('');
		const [audioFile, setAudioFile] = useState('');
		const [typeSendButton, setTypeSendButton] = useState('audio');
		const [isRecorded, setIsRecorded] = useState(false);
		// const [mediaRecorder, setMediaRecorder] = useState(getMedia().then((stream) => {
		// 	const mr = new MediaRecorder(stream)
		// 	console.log(mr)
		// 	return mr
		// }).catch(() => {console.log('AAAAAAAAAAAAA')}));
	

	function handleSubmit(event) {
		event.preventDefault();
		sendMessage(message);
		setMessage('');
	}

	function handlerCancel(event) {
		setTypeSendButton('send');
		console.log(mediaRecorder);
		// debugger;
		

		mediaRecorder.then(media => { stopRecord(media, () => {recordStatus(false)}); });
		setIsRecorded(false);

	
		alert('Cancel');
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

	const recordStatus = (status) => {
		if (isRecorded !== status) {
			setIsRecorded(status);
		}
	};

	function handlerAudio(event) {
		setTypeSendButton('cancel');
		// debugger;
		console.log(mediaRecorder);
		setIsRecorded(true);

		mediaRecorder.then(media => { 
			startRecord(media, () => {
					recordStatus(true);
				}, () => {
					recordStatus(false);
				}, (audio) => {
				debugger;
				console.log(isRecorded);
				// console.log();
				// console.log(blob);
				setAudioURL((prevState) => (audio));
				// setAudioFile({blob});
					// setAdditional({
					// 	meta: [
					// 		{
					// 			path: Url,
					// 			file: blob,
					// 		},
					// 	],
					// });
					// sendMessage(additional);
					// debugger;
					// console.log(audioURL);
					// console.log(audioFile);
			
					console.log(audioURL);
				})
		 }).catch(err => {console.log('problem')});
		// debugger;
		alert('Click audio');
	}



	function handlerImage(event) {
		alert('Click image');
		activateDropZone();
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
				record={handlerAudio}
				cancel={handlerCancel}
				type={typeSendButton} />
		</div>
	);
}
