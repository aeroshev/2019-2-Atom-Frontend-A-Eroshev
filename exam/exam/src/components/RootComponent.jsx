import React, { useState, useEffect } from 'react';
import { WeatherBlock } from './WeatherBlock';
import { useSelector, useDispatch } from 'react-redux';
import { ManagerCities } from './ManagerCities';
import { ButtonNewCities } from './ButtonNewCities';
import { setLocalWeather } from '../actions';
import styles from '../styles/RootComponent.module.css';

export function RootComponent(props) {
    const dispatch = useDispatch();
    const currentPosition = useSelector(state => state.coordinate);
    const localWeather = useSelector(state => state.localWeather);

    const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
    const GEO_KEY = `?lat=${currentPosition.latitude}&lon=${currentPosition.longitude}`;
    const GET_URL = '&appid=';
    const API_KEY = '8ffee88de89dd2aeca59137b0c268ef2';

    const createNewCity = (name) => {

    }

    async function getData() {
        try { 
            if (currentPosition.latitude !== 0 && currentPosition.longitude !== 0) {
                console.log(API_URL + GEO_KEY + GET_URL + API_KEY);
                const response = await fetch(API_URL + GEO_KEY + GET_URL + API_KEY);
                const jsonResponse = await response.json();
                dispatch(setLocalWeather(jsonResponse));
                console.log(jsonResponse);
            }     
        } catch(error) {
            console.error(error);
        }
    }
    
      useEffect(() => {
        console.log('USEEFFECT GET DATA');
        if (!localWeather) {
            getData();
        }
    });

    let listCities = [];
    if (localWeather) {
        listCities.push(<WeatherBlock key={0} data={localWeather}/>);
    }

    return (
        <div className={styles.paper}>
            <ManagerCities/>
            <div className={styles.list}>{listCities}</div>
            <ButtonNewCities newCity={createNewCity}/>
        </div>
    );
}
