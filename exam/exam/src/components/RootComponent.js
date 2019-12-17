import React from 'react';
import { WeatherBlock } from './WeatherBlock';
import { ManagerCities } from './ManagerCities';
import { ButtonNewCities } from './ButtonNewCities';
import styles from '../styles/RootComponent.module.css';

export function RootComponent(props) {
    const link = 'https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22';

    async function getData() {
        const response = await fetch(link, {
            method: 'GET',

        });
        const jsonResponse = await response.json();
    }

    let list = [];
    for (let i = 0; i !== 4; i++){
        list.push(<WeatherBlock key={i}/>);
    }
  return (
    <div className={styles.paper}>
        <ManagerCities/>
        <div className={styles.list}>{list}</div>
        <ButtonNewCities/>
    </div>
  );
}
