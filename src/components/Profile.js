import React from 'react';
import styles from '../styles/Profile.module.css';

export function UserProfile(props) {
	return (
		<div className={styles.paper}>
			<div className={styles.toolBar}>
					<div className={styles.backButton} />
				<div className={styles.title}>Edit Profile</div>
				<div className={styles.ok} />
			</div>
			<div className={styles.avatar} />
			<div className={styles.Box}>
				<div className={styles.info}>Full name</div>
				<input className={styles.customInput}
					placeholder='Write here...'
					type='text' />
			</div>
			<div className={styles.Box} style={{marginBottom: '80px'}}>
				<div className={styles.info}>Username</div>
				<input className={styles.customInput} 
					placeholder='Write here...'
					type='text' />
				<div className={styles.extra}>Minimum lenght is 5 characters</div>
			</div>
			<div className={styles.Box} style={{height: '120px'}}>
				<div className={styles.info}>Bio</div>
				<input className={styles.customInput} 
					placeholder='Write here...'
					type='text' />
				<div className={styles.extra} style={{paddingTop: '16px'}}>Any details about you</div>
			</div>
		</div>	
	);
}
