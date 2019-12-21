import React, { useState, useEffect } from 'react';
import { WeatherBlock } from './WeatherBlock';
import { ManagerCities } from './ManagerCities';
import { ButtonNewCities } from './ButtonNewCities';
import styles from '../styles/RootComponent.module.css';

export function RootComponent(props) {
    const { position } = props;
    const [data, setData] = useState([]);

    const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
    const GEO_KEY = `?lat=${position.latitude}&lon=${position.longitude}`;
    const GET_URL = '&appid=';
    const API_KEY = '8ffee88de89dd2aeca59137b0c268ef2';

    async function getData() {
        try { 
            if (position.latitude !== 0 && position.longitude !== 0) {
                console.log(API_URL + GEO_KEY + GET_URL + API_KEY);
                const response = await fetch(API_URL + GEO_KEY + GET_URL + API_KEY);
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                setData(jsonResponse);
            }     
        } catch(error) {
            console.error(error);
        }
    }

    const createNewCity = (name) => {

    }

    useEffect(() => {
        getData();
    });

    // let bucket = {};
    let listCities = [];
    // for (let i = 0; i !== 1; i++) {
    //     if (data.length) {
    //         listCities.push(<WeatherBlock key={i} data={data}/>);
    //     }   
    // }
    return (
        <div className={styles.paper}>
            <ManagerCities/>
            <div className={styles.list}>{listCities}</div>
            <ButtonNewCities newCity={createNewCity}/>
        </div>
    );
}
