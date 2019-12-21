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