import fetch_polyfill from 'fetch-polyfill';// eslint-disable-line
import promise_polyfill from 'es6-promise';// eslint-disable-line
import expect from 'expect';
import sinon from 'sinon';
import bluebird from 'bluebird';
import fetch from 'ui/utils/fetch';

describe('fetch', function () {
  let server;

  before(function () {
    server = sinon.fakeServer.create();
    server.autoRespond = true;
    window.fetch.Promise = bluebird;

    server.respondWith('GET', '/test',
      [200, { 'Content-Type': 'application/json' },
       JSON.stringify({'success': true}) ]);

    server.respondWith('GET', '/test-failer',
      [500, { 'Content-Type': 'application/json' },
       JSON.stringify({'success': false}) ]);


    server.respondWith('POST', '/test-post',
      [200, { 'Content-Type': 'application/json' },
       JSON.stringify({'success': true}) ]);

    server.respondWith('POST', '/test-failer',
      [500, { 'Content-Type': 'application/json' },
       JSON.stringify({'success': false}) ]);
  });

  after(function () {
    server.restore();
  });

  it('get success', function (done) {
    fetch.get('/test').
      then(function (res) {
        expect(res.success).toBe(true);
        done();
      });
  });

  it('get fail', function (done) {
    fetch.get('/test-failer').
      catch(function (e) {
        expect(e.status).toBe(500);
        done();
      });
  });

  it('post success', function (done) {
    fetch.post('/test-post', {data: []}).
      then(function (res) {
        expect(res.success).toBe(true);
        done();
      });
  });

  it('post fail', function (done) {
    fetch.post('/test-failer', {data: []}).
      catch(function (e) {
        expect(e.status).toBe(500);
        done();
      });
  });
});

