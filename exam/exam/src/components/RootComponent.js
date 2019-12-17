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
            if (jsonResponse['list']) {
                setData(jsonResponse['list']);
            }
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData();
    }, [1]);

    let listCities = [];
    let bucket = {
        temp: 0,
        feels_like: 0,
        temp_min: 0,
        temp_max: 0,
        pressure: 0,
        sea_level: 0,
        grnd_level: 0,
        humidity: 0,
        temp_kf: 0,
    };
    for (let i = 0; i !== 4; i++) {
        console.log(data[i]);
        if (data[i]) {
            bucket = data[i]['main'];
        }
        listCities.push(<WeatherBlock key={i} data={bucket}/>);
    }
    return (
        <div className={styles.paper}>
            <ManagerCities/>
            <div className={styles.list}>{listCities}</div>
            <ButtonNewCities/>
        </div>
    );
}
