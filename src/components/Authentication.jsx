import React from 'react';
import styles from '../styles/Authentication.module.css';

export function Authentication(props) {
    return (
        <div className={styles.mainTheme}>
            <div className={styles.title}>Messenger</div>
            <div className={styles.block}>
                <div className={styles.button} style={{backgroundColor: 'rgb(238,98,74)'}}>
                    <div className={styles.icon} style={{backgroundColor: '#d73114'}}/>
                    LOGIN WITH INSTAGRAM
                </div>
                <a href='https://127.0.0.1:8000/social_auth/complete/facebook/'>
                    <div className={styles.button} style={{backgroundColor: 'rgb(62,90,147)'}}>
                        <div className={styles.icon} 
                            style={{backgroundColor: 'rgb(41,61,101)'}}/>
                        LOGIN WITH FACEBOOK
                    </div>
                </a>
                <div className={styles.button} style={{backgroundColor: 'rgb(35,98,144)'}}>
                    <div className={styles.icon} style={{backgroundColor: '#143852'}}/>
                    LOGIN WITH LINKEDIN
                </div>
            </div>
        </div>
    );
}