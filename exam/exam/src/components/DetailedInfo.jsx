import React from 'react';
import styles from '../styles/DetailedInfo.module.css';

export function DetailedInfo(props) {
    let list = [];
    for (let i = 0; i !== 4; i++) {
        list.push(<div key={i} className={styles.dayWeather}>HELLO</div>);
    }
    return (
        <div className={styles.wallpaper}>
            <div className={styles.extraBlock}>{list}</div>
        </div>
    );
}