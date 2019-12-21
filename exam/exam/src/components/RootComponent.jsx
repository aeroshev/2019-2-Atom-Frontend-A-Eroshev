import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { WeatherBlock } from './WeatherBlock';
import { ManagerCities } from './ManagerCities';
import { ButtonNewCities } from './ButtonNewCities';
import styles from '../styles/RootComponent.module.css';

export function RootComponent(props) {
    const API_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=moscow,RU&appid=';
    const GET_KEY = '8ffee88de89dd2aeca59137b0c268ef2';

    const [data, setData] = useState([]);
    const currentPosition = useSelector(state => state.coordinate);
    const [position, setPosition] = useState(currentPosition);
    console.log(position);
    const API_LOCATION = `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=`;

    async function getData() {
        try {
            console.log(API_LOCATION + GET_KEY)
            const response = await fetch(API_LOCATION + GET_KEY);
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            // if (jsonResponse['list']) {
            //     setData(jsonResponse['list']);
            // }
        } catch(error) {
            console.error(error);
        }
    }

    const createNewCity = (name) => {

    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line
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
