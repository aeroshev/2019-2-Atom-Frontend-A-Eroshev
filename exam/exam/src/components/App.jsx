import React, { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RootComponent } from './RootComponent';
import { DetailedInfo } from './DetailedInfo';
import { setCoordinate } from '../actions';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      dispatch(setCoordinate(position.coords.latitude, position.coords.longitude));
    });
     // eslint-disable-next-line 
  }, []);
  
  return (
    <Router basename={process.env.NODE_ENV==='production' ? '/2019-2-Atom-Frontend-A-Eroshev' : undefined}>
      <Switch>
        <Route path='/' exact>
          <RootComponent/>
        </Route>
        <Route path='/weather'>
          <DetailedInfo/>
        </Route>
      </Switch>
    </Router> 
  );
}

export default App;
