import React from 'react';
import routes from 'routes';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { Provider,  } from 'react-redux';
import store from 'reduxStore';
import { isBrowser } from 'ui/utils';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import 'css/normalize.css';
import 'css/global.scss';

let history = isBrowser() ? createBrowserHistory() : {};

// polyfill
if (!Object.assign) {
  Object.assign = React.__spread; // eslint-disable-line no-underscore-dangle
}

render(
  (<Provider store={store}>
      <Router history={history}>
      {routes}
      </Router>
  </Provider>),
  document.getElementById('container')
);

