const expect = require('expect'),
  nock = require('nock'),
  request = require('supertest');

describe('routes', function () {
  var app, settings;

  before(function () {
    var initRoutes = require('../index.js');
    
    settings = {
      indexHTML: 'http://localhost:8080/some.html'
    };

    app = require('express')();
    app.use('/', initRoutes(settings));

    nock('http://localhost:8080')
      .get('/some.html')
      .reply(200, '<html>some html</html>');
  });

  describe('GET /*', function () {
    it('should return 200 and html from hot server', function (done) {
      request(app)
        .get('/')
        .expect(200, '<html>some html</html>')
        .end(done);
    });

    it('should return 200 and html with main.js', function (done) {
      settings.indexHTML = './server/routes/__tests__/index.spec.js';
      request(app)
        .get('/')
        .expect(200)
        .end(function (err, res) {
          expect(res.text).toContain('/_assets/main.js');
          done(err);
        });
    });
  });
});