import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/WeatherBlock.module.css';

export function WeatherBlock(props) {
    const { data } = props;

    const toCelius = (celvin) => {
        return Math.round(celvin - 273.15);
    }

    const windDirection = (angle) => {
        if (angle > 340 && angle <= 20) {
            return 'Eastern';
        }
        if (angle > 20 && angle <= 70) {
            return 'Northeastern';
        }
        if (angle > 70 && angle <= 110) {
            return 'North';
        }
        if (angle > 110 && angle <= 160) {
            return 'Northwestern';
        }
        if (angle > 160 && angle <= 200) {
            return 'Western';
        }
        if (angle > 200 && angle <= 250) {
            return 'Southwestern';
        }
        if (angle > 250 && angle <= 290) {
            return 'South';
        }
        if (angle > 290 && angle <= 340) {
            return 'Southeastern';
        }
        return '';
    }
    const city = 'Moscow';
    return (
        <Link to={`/weather/${city}/`}>
            <div className={styles.block}>
                <div className={styles.up}>
                    <div className={styles.nameCity}>Moscow</div>
                    <div className={styles.temperature}>{toCelius(data.main.temp)}</div>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.humidity}>{`Humidity ${data.main.humidity}%`}</div>
                    <div className={styles.directionWind}>{windDirection(data.wind.deg)}</div>
                    <div className={styles.speed}>{`${data.wind.speed} m/s`}</div>
                    <div className={styles.extra}>{`${toCelius(data.main.temp_max)} / ${toCelius(data.main.temp_min)}`}</div>
                </div>
            </div>
        </Link>
    );
}