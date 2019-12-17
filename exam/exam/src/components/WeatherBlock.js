import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/WeatherBlock.module.css';

export function WeatherBlock(props) {
    const { data } = props;
    const city = 'Moscow';
    return (
        <Link to={`/weather/${city}`}>
            <div className={styles.block}>
                <div className={styles.up}>
                    <div className={styles.nameCity}>Moscow</div>
                    <div className={styles.temperature}>2</div>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.humidity}>Humidity 26%</div>
                    <div className={styles.directionWind}>Southwest</div>
                    <div className={styles.speed}>2.1 m/s</div>
                    <div className={styles.extra}>27 / 15</div>
                </div>
            </div>
        </Link>
    );
}