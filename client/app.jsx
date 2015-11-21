import routesFactory from './routes';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';

Router.run(routesFactory(), Router.HistoryLocation, function (Application) {
    ReactDOM.render(
      <Application/>,
      document.getElementById('container')
    );
});

