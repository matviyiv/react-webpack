import expect from 'expect';
import bluebird from 'bluebird';
import sinon from 'sinon';
import { loadExampleJSON, increment } from 'flux/actions';

describe('actions', function () {
  let server;

  before(function () {
    server = sinon.fakeServer.create();
    server.autoRespond = true;
    window.fetch.Promise = bluebird;

    server.respondWith('GET', '/_assets/dummy.json?id=1',
      [200, { 'Content-Type': 'application/json' },
       JSON.stringify({'data': true}) ]);
  });

  after(function () {
    server.restore();
  });

  it('loadExampleJSON', function (done) {
    let callback = loadExampleJSON(1),
      counter = 0,
      dispatch = (action) => {
        counter = ++counter;
        if (counter == 1) {
          expect(action.type).toBe('LOADING');
        }
        if (counter == 2) {
          expect(action.data).toBe(true);
          done();
        }
      };
    callback(dispatch);
  });

  it('increment', function () {
    expect(increment().type).toBe('INCREMENT');
  });
});

