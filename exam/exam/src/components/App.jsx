import React, { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import { RootComponent } from './RootComponent';
import { DetailedInfo } from './DetailedInfo';


function App() {
  let coordinate = {latitude: 0, longitude: 0};
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      coordinate.latitude = position.coords.latitude;
      coordinate.longitude = position.coords.longitude;
    })
  });

  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <RootComponent position={coordinate}/>
        </Route>
        <Route path='/weather'>
          <DetailedInfo/>
        </Route>
      </Switch>
    </Router> 
  );
}

export default App;
