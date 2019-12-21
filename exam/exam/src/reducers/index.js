import { combineReducers } from 'redux';
import { coordinateReducer } from './Coordinate';
import { cityReducer } from './CityList';

const rootReducer = combineReducers({
    coordinate: coordinateReducer,
    city:  cityReducer,
});

export default rootReducer;