import React from 'react';
import styles from '../styles/FormInput.module.css';
// import { thisTypeAnnotation } from 'babel-types';


export class FormInput extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			message: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.handlerGeo = this.handlerGeo.bind(this);
		this.handlerAudio = this.handlerAudio.bind(this);
		this.handlerImage = this.handlerImage.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.sendMessage(this.state.message);
		this.setState({
			message: '',
		});
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

	handlerAudio(event) {
		alert('Click audio');
	}

	handlerImage(event) {
		alert('Click image');
	}

	render() {
		return (
			<div className={styles.footer}>
				<div className={styles.inputButton}>
					<div className={styles.additionalButton}>
						<ul className={styles.listStyle}>
							<li className={styles.li} onClick={this.handlerGeo}>Gelocation</li>
							<li className={styles.li} onClick={this.handlerAudio}>AudioMessage</li>
							<li className={styles.li} onClick={this.handlerImage}>Image</li>
						</ul>
					</div>
				</div>
				<form className={styles.customInput}
					onSubmit={this.handleSubmit}>
					<input className={styles.customInput}
						onChange={this.handleChange}
						value={this.state.message}
						placeholder='Message'
						type='text' />
				</form>
				<div className={styles.inputButton}>
					<div className={styles.sendButton} onClick={this.handleSubmit}/>
				</div>
			</div>
		);
	}
}
