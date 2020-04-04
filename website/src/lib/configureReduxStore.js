import {routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';
import {applyMiddleware, compose, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import createRootReducer from '../store';

export const history = createBrowserHistory();

// Middleware.
const otherMiddleware = [];
if (process.env.NODE_ENV !== 'production') {
  otherMiddleware.push(
    createLogger({
      collapsed: true,
    })
  );
}

// Store.
export default function configureReduxStore() {
  const store = createStore(
    createRootReducer(history),
    compose(
      applyMiddleware(thunk),
      applyMiddleware(routerMiddleware(history)),
      applyMiddleware(...otherMiddleware)
    )
  );

  return store;
}
