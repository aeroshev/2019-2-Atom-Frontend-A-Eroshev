import { combineReducers } from 'redux';
import { coordinateReducer } from './Coordinate';
import { cityReducer } from './CityList';
import { localWeatherReducer } from './LocalWeather';

const rootReducer = combineReducers({
    coordinate: coordinateReducer,
    city:  cityReducer,
    localWeather: localWeatherReducer,
});

export default rootReducer;