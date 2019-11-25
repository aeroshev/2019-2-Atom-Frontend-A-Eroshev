import React from 'react';
import { SendButton } from './SendButton';
import { getMedia, startRecord, stopRecord } from '../lib/AudioHelper';
import styles from '../styles/FormInput.module.css';


export class FormInput extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			message: '',
			additional: {
				path: '',
				file: '',
			},
			addStyle: {
				// animationName: 'smoothAppear',
				display: 'none',	
			},
			typeSendButton: 'send',
			mediaRecorder: getMedia().then((stream) => {
				return new MediaRecorder(stream);
			}).catch(() => {return null;}),
		};

		console.log(this.state);

		this.audioMessage = this.audioMessage.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.handleAdditional = this.handleAdditional.bind(this);
		this.handlerGeo = this.handlerGeo.bind(this);
		this.handlerAudio = this.handlerAudio.bind(this);
		this.handlerImage = this.handlerImage.bind(this);

		this.handlerCancel = this.handlerCancel.bind(this);
		this.handlerRecord = this.handlerRecord.bind(this);
		
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.sendMessage(this.state.message);
		this.setState({
			message: '',
		});
	}

	handlerCancel(event) {
		this.setState({
			typeSendButton: 'send',
		});
		this.state.mediaRecorder.then(media => { return stopRecord(media); });
		this.props.sendMessage(this.state.additional);
		
		alert('Cancel');
		console.log(this.state);
	}

	handlerRecord(event) {
		alert('Reacord');
	}

	handleAdditional(event) {
		const { display } = this.state.addStyle;
		this.setState({
				addStyle: {
					// animationName: (animationName === 'smoothAppear')? 'smoothDisappear': 'smoothAppear',
					display: (display === 'none')? 'flex': 'none',
				}
			}
		);
	}

	handleChange(event) {
		this.setState({
			message: event.target.value,
		});
	}
	
	handlerGeo(event) {
		navigator.geolocation.getCurrentPosition(position => {
			const geoMessage = `https://www.openstreetmap.org/#map=17/${position.coords.latitude}/${position.coords.longitude}`;
			const geoObject = <a href={geoMessage}>{geoMessage}</a>;
			this.props.sendMessage(geoObject);
		});
	}

	audioMessage(Url, blob) {
			this.setState({additional: {
				path: Url,
				file: blob,
			}
		});
	}

	handlerAudio(event) {
		this.setState({
			typeSendButton: 'cancel',
		});
		this.state.mediaRecorder.then(media => { return startRecord(media, this.audioMessage) });
		alert('Click audio');
	}



	handlerImage(event) {
		alert('Click image');
	}

	render() {
		const {
			message,
			addStyle,
			typeSendButton,
		} = this.state;

		return (
			<div className={styles.footer}>
				<div className={styles.inputButton}>
					<div className={styles.additionalButton} onClick={this.handleAdditional}>
						<ul className={styles.listStyle} style={addStyle}>
							<li className={styles.li} onClick={this.handlerGeo}>Geolocation</li>
							<li className={styles.li} onClick={this.handlerAudio}>AudioMessage</li>
							<li className={styles.li} onClick={this.handlerImage}>Image</li>
						</ul>
					</div>
				</div>
				<form className={styles.customInput}
					onSubmit={this.handleSubmit}>
					<input className={styles.customInput}
						onChange={this.handleChange}
						value={message}
						placeholder='Message'
						type='text' />
				</form>
				<SendButton
					send={this.handleSubmit}
					record={this.handlerRecord}
					cancel={this.handlerCancel}
					type={typeSendButton} />
			</div>
		);
	}
}
