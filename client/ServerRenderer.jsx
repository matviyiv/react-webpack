import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import routes from 'routes';
import createLocation from 'history/lib/createLocation';
import store from 'reduxStore';
import { Provider } from 'react-redux';

export class ServerRenderer {
  render(url) {
    return new Promise(function (resolve, reject) {
      const location = createLocation(url);

      match({ routes, location }, (error, redirectLocation, renderProps) => {
        if (error) {
          reject({status: 500, message: error.message});
        }
        else if (redirectLocation) {
          reject({redirect: 302, path: redirectLocation.pathname + redirectLocation.search});
        }
        else if (!renderProps) {
          reject({status: 404, message: 'Not found'});
        }
        else {
          resolve(renderToString(
            <Provider store={store}>
              <RoutingContext {...renderProps} />
            </Provider>)
          );
        }
      });
    });
  }
}