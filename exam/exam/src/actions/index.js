export const setCoordinate = (latitude, longitude) => {
    return {
        type: 'SET_COORDINATE',
        payload: {latitude: latitude, longitude: longitude},
    };
}

export const getApiUrl = () => {
    return {
        type: 'GET_LOCATION_URL',
    };
}

export const setLocalWeather = (object) => {
    return {
        type: 'SET_LOCAL_WEATHER',
        payload: object,
    };
}