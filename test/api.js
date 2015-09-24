'use strict';

// set NODE_ENV=test to suppress output from app
// needs node version > 4 to run

const PORT = 3333; // should be randomly generated to avoid port collisions

let assert = require('assert');
let request = require('request');
let api = request.defaults({baseUrl: 'http://localhost:' + PORT});
let app = require('../app');

describe('static api', _ => {

  before(done => app.listen(PORT, done));

  it('should respond 200 on /', done => {
    api.get('/', (err, response) => {
      if (err) return done(err);
      assert.equal(200, response.statusCode);
      done();
    });
  });

  it('should respond 404 for an unknow document', done => {
    api.get('/foo.html', (err, response) => {
      if (err) return done(err);
      assert.equal(404, response.statusCode);
      done();
    });
  });

});
