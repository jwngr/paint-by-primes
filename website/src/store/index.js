import {connectRouter} from 'connected-react-router';
import {combineReducers} from 'redux';

import {appReducer} from './reducer';

const createRootReducer = (history) =>
  combineReducers({
    app: appReducer,
    router: connectRouter(history),
  });

export default createRootReducer;
