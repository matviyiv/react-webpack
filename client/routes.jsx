import React from 'react';
import { Router, Route } from 'react-router';
import store from 'reduxStore';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import 'css/normalize.css';
import 'css/global.scss';

import HelloContainer from 'ui/hello/HelloContainer';

let history = createBrowserHistory();

// polyfill
if (!Object.assign) {
  Object.assign = React.__spread; // eslint-disable-line no-underscore-dangle
}

export default function () {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route name="root" component={HelloContainer} path="*" />
      </Router>
    </Provider>
  );
}