import React from 'react';
import styles from '../styles/SendButton.module.css';


export function SendButton(props) {
    const {
        send,
        record,
        cancel,
        type,
    } = props;

    let object = null;

    switch (type) {
        case 'audio': {
            object = <div
            className={styles.mic}
            onClick={record} />;

            break;
        }
        case 'cancel': {
            object = <div
            className={styles.cancel}
            onClick={cancel} />;

            break;
        }
        case 'send': {
            object = <div
            className={styles.send}
            onClick={send} />;

            break;
        }
        default: {
            object = <div
            className={styles.send}
            onClick={send} />;

            break;
        }
    }

    return object;
}