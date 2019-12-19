import React from 'react';
import ReactDOM from 'react-dom';
import { Application } from './components/Application'
import { Provider } from 'react-redux';
import './styles/index.css';
import store from './store';


ReactDOM.render(
    <Provider store={store}>
        <Application/>
    </Provider>,
    document.getElementById('root')
);
