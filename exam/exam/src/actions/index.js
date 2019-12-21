export const setCoordinate = (latitude, longitude) => {
    return {
        type: 'SET_COORDINATE',
        payload: {latitude: latitude, longitude: longitude},
    };
}