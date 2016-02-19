var express = require('express'),
    router  = express.Router(),// eslint-disable-line
    env = process.env.NODE_ENV,
    fs = require('fs'),
    path= require('path'),
    clientFolder = path.join(__dirname, '../../client'),
    settings   = require('../settings').appSettings,
    html = fs.readFileSync(path.join(clientFolder, 'index.html'), 'utf8');

router.get('/*', htmlHandler);

function htmlHandler(req, res) {
  var newHtml = html.
    replace(/DOMAIN/g, env == 'prod' ? '' : settings.webpackDomain);
  res.send(newHtml);
}

module.exports = router;