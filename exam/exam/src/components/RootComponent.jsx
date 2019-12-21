import React, { useState, useEffect } from 'react';
import { WeatherBlock } from './WeatherBlock';
import { useSelector, useDispatch } from 'react-redux';
import { ManagerCities } from './ManagerCities';
import { ButtonNewCities } from './ButtonNewCities';
import { setCoordinate } from '../actions';
import styles from '../styles/RootComponent.module.css';

export function RootComponent(props) {
    const dispatch = useDispatch();
    const currentPosition = useSelector(state => state.coordinate);
    const [data, setData] = useState([]);

    const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
    const GEO_KEY = `?lat=${currentPosition.latitude}&lon=${currentPosition.longitude}`;
    const GET_URL = '&appid=';
    const API_KEY = '8ffee88de89dd2aeca59137b0c268ef2';

    async function getData() {
        try { 
            if (currentPosition.latitude !== 0 && currentPosition.longitude !== 0) {
                console.log(API_URL + GEO_KEY + GET_URL + API_KEY);
                const response = await fetch(API_URL + GEO_KEY + GET_URL + API_KEY);
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                // setData(jsonResponse);
            }     
        } catch(error) {
            console.error(error);
        }
    }

    const createNewCity = (name) => {

    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            dispatch(setCoordinate(position.coords.latitude, position.coords.longitude));
          });
    }, [1]);

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
