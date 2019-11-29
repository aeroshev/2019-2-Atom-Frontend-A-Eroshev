import React, { useState } from 'react';
import { SendButton } from './SendButton';
import { getMedia, startRecord, stopRecord } from '../lib/AudioHelper';
import styles from '../styles/FormInput.module.css';


export function FormInput(props) {
		const { sendMessage, activateDropZone } = props;

		const [message, setMessage] = useState('');
		const [additional, setAdditional] = useState({type: 'audio', meta: [{path: '', file: ''}]});
		const [styleMenu, setStyleMenu] = useState({display: 'none'});
		const [audioURL, setAudioURL] = useState('');
		const [audioFile, setAudioFile] = useState('');
		// const [typeSendButton, setTypeSendButton] = useState(mic);
		const [mediaRecorder, setMediaRecorder] = useState(null);
		const [recording, setRecording] = useState(false);
		const [files, setFiles] = useState([]);
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

	// function handlerCancel(event) {
	// 	setTypeSendButton('send');
	// 	console.log(mediaRecorder);
	// 	// debugger;
		

	// 	mediaRecorder.then(media => { stopRecord(media, () => {recordStatus(false)}); });
	// 	setIsRecorded(false);

	
	// 	alert('Cancel');
	// }

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

	// const recordStatus = (status) => {
	// 	if (isRecorded !== status) {
	// 		setIsRecorded(status);
	// 	}
	// };

	// useEffect(() => {
	// 	effect
	// 	return () => {
	// 		cleanup
	// 	};
	// }, [input]);

	// const handleRecord = (event) => {
	// 	if (isRecorded) {
	// 		let chuncks = [];
	// 		const constrains = { audio: true };

	// 		navigator.mediaDevices.getUserMedia(constrains).then((stream) => {
	// 			setMediaRecorder(new MediaRecorder(stream));
	// 			debugger;

	// 			mediaRecorder.addEventListener('stop', (event) => {
	// 				const blob = new Blob(chuncks, {
	// 					type: mediaRecorder.mimeType,
	// 				});

	// 				const data = new FormData();
	// 				data.append('audio', blob);
	// 				fetch('https://tt-front.now.sh/upload', {
	// 					method: 'POST',
	// 					body: data,
	// 				})
	// 					.then(() => {
	// 						alert('Голосовое сообщение отправлено');
	// 					})
	// 					.catch(console.log);

	// 				chuncks = [];
	// 				const audioURL = URL.createObjectURL(blob);
	// 				setIsAudioMessage(true);
	// 				setFiles([...files, {audioURL}]);
	// 				console.log(files);
	// 				debugger;
	// 				// this.state.files.push(audioURL);
	// 				// this.sendMessage();
	// 				// this.state.files.pop();
	// 				setMediaRecorder(null);
	// 				stream.getTracks().forEach((track) => track.stop());
	// 				setIsAudioMessage(false);
	// 			});

	// 			mediaRecorder.addEventListener('dataavailable', (event) => {
	// 				chuncks.push(event.data);
	// 			});

	// 			if (mediaRecorder) {
	// 				mediaRecorder.start();
	// 			}
	// 		});
	// 	}
	// }

	// function handlerAudio(event) {
	// 	if (!isRecorded[0]) {
	// 		setTypeSendButton(cancel);
	// 		isRecorded.pop();
	// 		isRecorded.push(true);
	// 		handleRecord(event);
	// 	} else {
	// 		if (mediaRecorder) {
	// 			mediaRecorder.stop();
	// 		}
	// 		isRecorded.pop()
	// 		isRecorded.push(false);
	// 		setTypeSendButton(mic);
	// 	}
	// }



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
						<li className={styles.li} >AudioMessage</li>
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
			<SendButton/>
		</div>
	);
}
