import React from 'react';
import { Router, Route } from 'react-router';
import store from 'reduxStore';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { isBrowser } from 'ui/utils';
import 'css/normalize.css';
import 'css/global.scss';

import HelloContainer from 'ui/hello/HelloContainer';
import StartPage from 'ui/slides/StartPage';

let history = isBrowser() ? createBrowserHistory() : {};

// polyfill
if (!Object.assign) {
  Object.assign = React.__spread; // eslint-disable-line no-underscore-dangle
}

export default function () {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route name="start" component={StartPage} path="/"/>
        <Route name="hello" component={HelloContainer} path="/hello" />
      </Router>
    </Provider>
  );
}