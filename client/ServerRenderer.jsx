import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from 'routes';

export class ServerRenderer {
  constructor(options) {
    console.log(options);
  }

  render(url) {
    return new Promise(function (resolve, reject) {
      debugger;
      match({ routes, location: url }, (error, redirectLocation, renderProps) => {
        debugger;
        if (error) {
          reject({status: 500, message: error.message});
        } else if (redirectLocation) {
          reject({redirect: 302, path: redirectLocation.pathname + redirectLocation.search});
        } else if (!renderProps) {
          // You can also check renderProps.components or renderProps.routes for
          // your "not found" component or route respectively, and send a 404 as
          // below, if you're using a catch-all route.
          resolve(renderToString(<RouterContext {...renderProps} />));
        } else {
          reject({status: 404, message: 'Not found'});
        }
      });
    });
  }
}