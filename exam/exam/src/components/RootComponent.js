import React, { useState, useEffect } from 'react';
import { WeatherBlock } from './WeatherBlock';
import { ManagerCities } from './ManagerCities';
import { ButtonNewCities } from './ButtonNewCities';
import styles from '../styles/RootComponent.module.css';

export function RootComponent(props) {
    const API_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=moscow,RU&appid=';
    const GET_KEY = '8ffee88de89dd2aeca59137b0c268ef2';

    const [data, setData] = useState([]);

    async function getData() {
        try {
            const response = await fetch(API_URL + GET_KEY);
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            if (jsonResponse['list']) {
                setData(jsonResponse['list']);
            }
        } catch(error) {
            console.error(error);
        }
    }

    const createNewCity = (name) => {

    }

    useEffect(() => {
        getData();
    }, [1]);

    let bucket = {};
    let listCities = [];
    for (let i = 0; i !== 4; i++) {
        console.log(data[i]);
        if (data[i]) {
            bucket = data[i];
        } else {
            continue;
        }
        listCities.push(<WeatherBlock key={i} data={bucket}/>);
    }
    return (
        <div className={styles.paper}>
            <ManagerCities/>
            <div className={styles.list}>{listCities}</div>
            <ButtonNewCities newCity={createNewCity}/>
        </div>
    );
}
