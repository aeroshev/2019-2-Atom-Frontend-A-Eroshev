import React from 'react';
import styles from '../styles/ManagerCities.module.css';


export function ManagerCities(props) {
    return (
        <div className={styles.block}>
            <div className={styles.back}/>
            <p className={styles.title}>Manage cities</p>
            <div className={styles.write}/>
        </div>
    );
}