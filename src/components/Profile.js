import React from 'react'
import styles from '../styles/Profile.module.css';

export function UserProfile(props) {
	return (
		<div>
			<div className={styles.toolBar}></div>
			<div className={styles.avatar}></div>
			<div className={styles.Box}>
				<div className={styles.info}>Full name</div>
				<form className={styles.customInput}
				// onSubmit={this.handleSubmit}
				>
					<input className={styles.customInput}
					// onChange={this.handleChange}
					// value={this.state.message}
					placeholder={'Write here...'}
					type={'text'} />
				</form>
			</div>
			<div className={styles.Box} style={{marginBottom: "80px"}}>
				<div className={styles.info}>Username</div>
				<input className={styles.customInput} type="text">
				</input>
				<div className={styles.extra}>Minimum lenght is 5 characters</div>
			</div>
			<div className={styles.Box} style={{height: "120px"}}>
				<div className={styles.info}>Bio</div>
				<input className={styles.customInput} type="text">

				</input>
				<div className={styles.extra} style={{paddingTop: "76px"}}>Any details about you</div>
			</div>
		</div>	
	);
}
