import React from 'react';
import { Route } from 'react-router';

import HelloContainer from 'ui/hello/HelloContainer';
import StartPage from 'ui/slides/StartPage';

export default (
  <Route>
    <Route name="start" component={StartPage} path="/" />
    <Route name="hello" component={HelloContainer} path="/hello" />
  </Route>
);