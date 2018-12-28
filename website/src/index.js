import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components';
import {compose, createStore, applyMiddleware, combineReducers} from 'redux';
import {routerForBrowser, initializeCurrentLocation} from 'redux-little-router';

import rootReducers from './reducer';
import theme from './resources/theme.json';
import * as serviceWorker from './serviceWorker';

import App from './App';

import './index.css';

// Load fonts
// TODO: only use one of these...
require('typeface-rubik');
require('typeface-roboto-mono');
require('typeface-overpass-mono');

// Router
const routes = {
  '/': {
    '/': true,
    '/i/:primeImageId': true,
  },
};

const {reducer: routerReducer, middleware: routerMiddleware, enhancer} = routerForBrowser({
  routes,
});

// Middleware
const middleware = [routerMiddleware];
if (process.env.NODE_ENV !== 'production') {
  const {logger} = require('redux-logger');
  middleware.push(logger);
}

// Create the Redux store
const store = createStore(
  combineReducers({
    router: routerReducer,
    ...rootReducers,
  }),
  compose(
    enhancer,
    applyMiddleware(...middleware)
  )
);

// Initialize the current location of redux-little-router.
const initialLocation = store.getState().router;
if (initialLocation) {
  store.dispatch(initializeCurrentLocation(initialLocation));
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

// TODO: get service workers working again...
navigator.serviceWorker.getRegistrations().then((registrations) => {
  for (let registration of registrations) {
    registration.unregister();
  }
});

// If you want your app to work offline and load faster, you can change unregister() to register()
// below. Note this comes with some pitfalls. Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
