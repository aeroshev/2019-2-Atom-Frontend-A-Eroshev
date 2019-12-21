import React, { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { RootComponent } from './RootComponent';
import { DetailedInfo } from './DetailedInfo';
import { setCoordinate } from '../actions';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      dispatch(setCoordinate(position.coords.latitude, position.coords.longitude));
    });
  });

  // const WrappedRootComponent = connect(RootComponent)()

  return (
    <Router>
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
