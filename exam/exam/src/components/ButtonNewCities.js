import React from 'react';
import styles from '../styles/ButtonNewCities.module.css';


export function ButtonNewCities(props) {

    function handleClick(event){
        const city = prompt('Input city', '');
        if (city) {
        }
    }
    return (
        <button className={styles.buttonNew} onClick={handleClick} type='submit'/>
    );
}