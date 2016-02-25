var express = require('express'),
    request = require('request'),
    _ = require('lodash'),
    fs = require('fs');
    
function initRoutes(settings) {
  var router  = express.Router();// eslint-disable-line

  router.get('/*', htmlHandler);

  function htmlHandler(req, res) {
    if (_.include(settings.indexHTML, 'http')) {
      return req.pipe(request(settings.indexHTML)).pipe(res);
    }

    fs.createReadStream(settings.indexHTML, 'utf8').
      pipe(res);
  }

  return router;
}

module.exports = initRoutes;