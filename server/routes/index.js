var express = require('express'),
    request = require('request'),
    path = require('path'),
    _ = require('lodash'),
    fs = require('fs'),
    ServerRenderer = require(path.join(__dirname, '../../build/prerender/main.js')).ServerRenderer;
    
function initRoutes(settings) {
  const router  = express.Router(),// eslint-disable-line
    renderer = new ServerRenderer(settings);

  router.get('/*', function (req, res) {
    if (settings.serverSideRender) {
      return renderer.render(req.url).then(function(html) {
        debugger;
        res.set('Content-Type', 'text/html; charset=utf8');
        res.end(html);
      }).
      catch(function(error) {
        debugger;
        res.status(error.status).send(error.message);
      });
    }

    simpleHtmlHandler(req, res);
  });

  function simpleHtmlHandler(req, res) {
    if (_.include(settings.indexHTML, 'http')) {
      return req.pipe(request(settings.indexHTML)).pipe(res);
    }

    fs.createReadStream(settings.indexHTML, 'utf8').
      pipe(res);
  }

  return router;
}

module.exports = initRoutes;