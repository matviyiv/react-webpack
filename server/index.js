#!/usr/bin/env node
var app = require('./app'),
    server;

server = app.listen(app.get('port'), function () {
  console.log('Express server started on url http://localhost:' + server.address().port);// eslint-disable-line
});
