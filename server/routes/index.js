var express = require('express'),
    _ = require('lodash'),
    router  = express.Router(),
    env = process.env.NODE_ENV,
    fs = require('fs'),
    path= require('path'),
    clientFolder = path.join(__dirname, '../../client'),
    settings   = require('../settings').appSettings,
  	html = fs.readFileSync(path.join(clientFolder, 'index.html'), 'utf8');

router.get('/', htmlHandler);

function htmlHandler(req, res) {
  var newHtml = html.
    replace(/DOMAIN/g, env == 'prod' ? '' : settings.webpackDomain);
  console.log('serve index.html');
  res.send(newHtml);
}

module.exports = router;