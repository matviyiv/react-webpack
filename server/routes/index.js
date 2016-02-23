var express = require('express'),
    request = require('request'),
    router  = express.Router(),// eslint-disable-line
    env = process.env.NODE_ENV || 'dev',
    fs = require('fs'),
    settings   = require('../settings').appSettings[env];;

router.get('/*', htmlHandler);

function htmlHandler(req, res) {
  if (env == 'dev') {
    return req.pipe(request(settings.indexHTML)).pipe(res);
  }

  fs.createReadStream(settings.indexHTML, 'utf8').
    pipe(res);
}

module.exports = router;