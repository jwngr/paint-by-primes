import Loadable from 'react-loadable';
import React, {Component} from 'react';
import {Fragment} from 'redux-little-router';

const AsyncHomeScreen = Loadable({
  loader: () => import('./screens/Home/container'),
  loading: () => null,
});

const AsyncResultScreen = Loadable({
  loader: () => import('./screens/Result'),
  loading: () => null,
});

class App extends Component {
  render() {
    return (
      <Fragment forRoute="/">
        <div>
          <Fragment forRoute="/i/:primeImageId">
            <AsyncResultScreen />
          </Fragment>
          <Fragment forRoute="/" forNoMatch>
            <AsyncHomeScreen />
          </Fragment>
        </div>
      </Fragment>
    );
  }
}

export default App;
