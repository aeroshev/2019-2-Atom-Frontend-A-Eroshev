import React from 'react';
import styles from '../styles/ButtonNewCities.module.css';


export function ButtonNewCities(props) {
    const { newCity } = props;

    function handleClick(event){
        const city = prompt('Input city', '');
        if (city) {
            newCity(city);
        }
    }
    return (
        <button 
            className={styles.buttonNew} 
            onClick={handleClick} 
            type='submit'>
            <div className={styles.plus_hr}/>
            <div className={styles.plus_vr}/>
        </button>
    );
}