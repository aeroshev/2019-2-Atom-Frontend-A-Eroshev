import React, { useEffect } from 'react';
import { WeatherBlock } from './WeatherBlock';
import { useSelector, useDispatch } from 'react-redux';
import { ManagerCities } from './ManagerCities';
import { ButtonNewCities } from './ButtonNewCities';
import { setLocalWeather, appendWeather } from '../actions';
import styles from '../styles/RootComponent.module.css';

export function RootComponent(props) {
    const dispatch = useDispatch();
    const currentPosition = useSelector(state => state.coordinate);
    const localWeather = useSelector(state => state.localWeather);
    const listCitiesByID = useSelector(state => state.city);

    const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
    const GEO_KEY = `?lat=${currentPosition.latitude}&lon=${currentPosition.longitude}`;
    let ID;
    const GET_URL = '&appid=';
    const API_KEY = '8ffee88de89dd2aeca59137b0c268ef2';

    const createNewCity = (name) => {
        getWeatherByName(name);
    }

    async function getWeatherByName(name) {
        try {
            const response = await fetch(API_URL + `?q=${name}` + GET_URL + API_KEY);
            const jsonResponse = await response.json();
            dispatch(appendWeather([jsonResponse]));
        } catch(error) {
            console.error(error);
        }
    }

    async function getData() {
        try { 
            if (currentPosition.latitude !== 0 && currentPosition.longitude !== 0) {
                console.log(API_URL + GEO_KEY + GET_URL + API_KEY);
                const response = await fetch(API_URL + GEO_KEY + GET_URL + API_KEY);
                const jsonResponse = await response.json();
                dispatch(setLocalWeather(jsonResponse));
                let responseWeatherByID;
                let jsonResponseWeatherByID;
                let list = [];
                for (let i = 0; i !== 5; i++) {
                    ID = `?id=${listCitiesByID[i]}`;
                    responseWeatherByID = await fetch(API_URL + ID + GET_URL + API_KEY);
                    jsonResponseWeatherByID = await responseWeatherByID.json()
                    list.push(jsonResponseWeatherByID);
                }
                console.log(list);
                dispatch(appendWeather(list));
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
        if (localWeather.length) {
            console.log(localWeather);
            for (let i = 0; i !== 10; i++){
                console.log(localWeather[i]);
                if (localWeather[i]) {
                    listCities.push(<WeatherBlock key={i} data={localWeather[i]}/>);
                } 
            }
        }  
    }


    return (
        <div className={styles.paper}>
            <ManagerCities/>
            <div className={styles.list}>{listCities}</div>
            <ButtonNewCities newCity={createNewCity}/>
        </div>
    );
}
