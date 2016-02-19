#!/usr/bin/env node
var app = require('./app'),
    server;

app.set('hostname', 'localhost');
app.set('port', 8080);

server = app.listen(app.get('port'), app.get('hostname'), function () {
  console.log('Express server started on port ' + server.address().address + ':' + server.address().port);
});
