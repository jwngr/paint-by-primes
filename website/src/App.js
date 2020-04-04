import Loadable from 'react-loadable';
import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';

import {history} from './lib/configureReduxStore';

const AsyncHomeScreen = Loadable({
  loader: () => import('./screens/Home/container'),
  loading: () => null,
});

// const AsyncResultScreen = Loadable({
//   loader: () => import('./screens/Result'),
//   loading: () => null,
// });

class App extends Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/p/:postId">
            <AsyncHomeScreen />
          </Route>
          <Route path="/" exact>
            <AsyncHomeScreen />
          </Route>
        </Switch>
      </ConnectedRouter>
    );
  }
}

export default App;
