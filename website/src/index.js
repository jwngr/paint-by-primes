import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components';

import theme from './resources/theme.json';
import * as serviceWorker from './serviceWorker';
import configureReduxStore from './lib/configureReduxStore';

import App from './App';

import './index.css';

// Load fonts
// TODO: only use one of these...
require('typeface-rubik');
require('typeface-roboto-mono');
require('typeface-overpass-mono');

const store = configureReduxStore();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

// Unregister any service workers.
serviceWorker.unregister();
