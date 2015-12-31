var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    publicFolder = path.join(__dirname, '../client/public'),
    buildFolder = path.join(__dirname, '../build/public'),
    routes = require('./routes'),
    cookieParser = require('cookie-parser');    

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/_assets', express.static(publicFolder));
app.use('/_assets', express.static(buildFolder));

app.use('/', routes);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send('error'+ err.message);
});

module.exports = app;
