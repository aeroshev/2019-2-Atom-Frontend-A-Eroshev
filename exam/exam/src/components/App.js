import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import { RootComponent } from './RootComponent';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <RootComponent/>
        </Route>
      </Switch>
    </Router> 
  );
}

export default App;
