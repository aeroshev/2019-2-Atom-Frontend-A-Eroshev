import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import { RootComponent } from './RootComponent';
import { DetailedInfo } from './DetailedInfo';


function App() {
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
