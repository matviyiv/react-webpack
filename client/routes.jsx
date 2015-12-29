import React from 'react';
import { Route } from 'react-router';
import 'css/normalize.css';
import 'css/global.scss';

import HelloContainer from 'ui/hello/HelloContainer';

// polyfill
if (!Object.assign) {
  Object.assign = React.__spread; // eslint-disable-line no-underscore-dangle
}

export default function () {
  return (
    <Route>
      <Route name="root" handler={HelloContainer} path="/*" />
    </Route>
  );
}