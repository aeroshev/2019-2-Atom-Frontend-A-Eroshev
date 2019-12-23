import React from 'react';
import { WeatherBlock } from './WeatherBlock';
import styles from '../styles/RootComponent.module.css';

export function WeatherBlockList(props) {
    const { data } = props;
    console.log(data);
    let listCities = [];

    if (data) {
        listCities.push(<WeatherBlock key={0} data={data}/>);
    }
    return (
        <div className={styles.list}>{listCities}</div>
    );
}