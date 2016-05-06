var express = require('express'),
    request = require('request'),
    path = require('path'),
    _ = require('lodash'),
    fs = require('fs'),
    indexHTML = fs.readFileSync('./build/public/index.html', 'utf-8'),
    ServerRenderer = require(path.join(__dirname, '../../build/prerender/main.js')).ServerRenderer;

function initRoutes(settings) {
  const router  = express.Router(),// eslint-disable-line
    renderer = new ServerRenderer(settings);

  router.get('/*', function (req, res) {
    console.log(req.url);// eslint-disable-line
    return renderer.render(req.url).then(function (html) {
      res.set('Content-Type', 'text/html; charset=utf8');
      if (_.include(settings.indexHTML, 'http')) {
        return req.pipe(request(settings.indexHTML)).pipe(res);
      }
      res.end(indexHTML.replace('CONTENT', html));
    }).
    catch(function (error) {
      res.status(error.status).send(error.message);
    });
  });

  return router;
}

module.exports = initRoutes;