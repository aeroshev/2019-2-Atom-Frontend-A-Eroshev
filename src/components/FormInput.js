import React, { useState, useRef } from 'react';
import { SendButton } from './SendButton';
import styles from '../styles/FormInput.module.css';


export function FormInput(props) {
	const { sendMessage, activateDropZone } = props;

	const image = useRef();
	const document = useRef();
	const [message, setMessage] = useState('');
	const [styleMenu, setStyleMenu] = useState(null);
	const [attachment, setAttachment] = useState([]);
	// const [styleMenu, setStyleMenu] = useState({display: 'none'});

	
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

	function handleAdditional(event) {
		!styleMenu && setStyleMenu({
			height: '120px',
			boxShadow: '0 0 60px 10px #151716',
		});
		styleMenu && setStyleMenu(null);
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
					<ul style={styleMenu} className={styles.listStyle}>
						<li className={styles.li} onClick={handlerGeo}>Geolocation</li>
						<li className={styles.li} onClick={() => document.current.click()}>
							Document
							<input
								ref={document}
								type='file'
								multiple
								onChange={handlerDocument} 
								style={{display: 'none'}} />
							</li>
						<li className={styles.li} onClick={() => image.current.click()}>
							Image
							<input
								ref={image}
								type='file'
								multiple
								accept='image/*'
								onChange={handlerImage} 
								style={{display: 'none'}} />
							</li>
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
