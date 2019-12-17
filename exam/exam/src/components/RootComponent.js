import React, { useState, useEffect } from 'react';
import { WeatherBlock } from './WeatherBlock';
import { ManagerCities } from './ManagerCities';
import { ButtonNewCities } from './ButtonNewCities';
import styles from '../styles/RootComponent.module.css';

export function RootComponent(props) {
    const API_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=moscow,RU&appid=';
    const GET_KEY = 'b41984b8b5135f1695c5faac30990138';

    const [data, setData] = useState([]);

    async function getData() {
        try {
            const response = await fetch(API_URL + GET_KEY);
            const jsonResponse = await response.json();
            setData(jsonResponse['list']);
        } catch(error) {
            console.error(error);
        } 
    }

    useEffect(() => {
        getData();
    }, [1]);

    let listCities = [];
    for (let i = 0; i !== 4; i++) {
        listCities.push(<WeatherBlock key={i} data={data[i]}/>);
    }
    return (
        <div className={styles.paper}>
            <ManagerCities/>
            <div className={styles.list}>{listCities}</div>
            <ButtonNewCities/>
        </div>
    );
}
