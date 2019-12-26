import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SendButton } from './SendButton';
import { putAudio } from '../../actions';
import styles from '../../styles/FormInput.module.css';

const putStateToProps = (state) => {
	return {
		audios: state.audios,
	};
};

const putDispatchToProps = (dispatch) => {
	return {
		putAudio: bindActionCreators(putAudio, dispatch),
	};
};

const WrappedSendButton = connect(putStateToProps, putDispatchToProps)(SendButton);


export function FormInput(props) {
	const { sendMessage } = props;

	const image = useRef();
	const document = useRef();
	const [message, setMessage] = useState('');
	const [styleMenu, setStyleMenu] = useState(null);


	function handleSubmit(event, attachment = null) {
		if (event.charCode === 13) {
			sendMessage(message, attachment);
			setMessage('');
		}
	}

	function handlerAudio(audioURL, audioTrack) {
		if (audioURL) {
			const object = {
					name: 'AudioMessage',
					type: 'audio',
					path: audioURL,
					file: audioTrack,
			};
			sendMessage(null, object);
		}	
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
		let additionsList = event.target.files;
		if (!additionsList.length) {
			return false;
		}

		const object = {
			name: additionsList[0].name,
			type: 'image',
			path: [window.URL.createObjectURL(additionsList[0])],
			file: additionsList[0],
		};
		sendMessage(null, object);
	}

	function handlerDocument(event) {
		let additionsList = event.target.files;
		if (!additionsList.length) {
			return false;
		}

		const object = {
			name: additionsList[0].name,
			type: 'document',
			path: [window.URL.createObjectURL(additionsList[0])],
			file: additionsList[0],
		};
		sendMessage(null, object);
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
								onChange={handlerDocument} 
								style={{display: 'none'}} />
							</li>
						<li className={styles.li} onClick={() => image.current.click()}>
							Image
							<input
								ref={image}
								type='file'
								accept='image/*'
								onChange={handlerImage} 
								style={{display: 'none'}}/>
							</li>
					</ul>
				</div>
			</div>
			<input 
				className={styles.customInput}
				onKeyPress={handleSubmit}
				onChange={handleChange}
				value={message}
				placeholder='Message'
				type='text' />
			<WrappedSendButton handlerAudio={handlerAudio}/>
		</div>
	);
}
