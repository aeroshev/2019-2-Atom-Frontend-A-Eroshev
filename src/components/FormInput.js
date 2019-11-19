import React, { useContext } from 'react';
import MyContext from './Context';
import styles from '../styles/FormInput.module.css';
import { thisTypeAnnotation } from 'babel-types';


export class FormInput extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			message: '',
		};
		this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        })
    }

	render() {
		return (
			<div className={styles.footer}>
				<div className={styles.inputButton}>
					<div className={styles.additionalButton}/>
				</div>
				<form 
				onSubmit={this.handleSubmit}
				className={styles.customInput}>
					<input 
					onChange={this.handleChange}
					value={this.state.message}
					placeholder={'Message'}
					type={'text'} />
				</form>
				<div className={styles.inputButton}>
					<div className={styles.sendButton} onClick={this.handleSubmit}/>
				</div>
			</div>
		);
	}
}
