var chai = require('chai'),
  assert = chai.assert,
  request = require('supertest'),
  express = require('express'),
  app = express(),
  quiverAuth = require('./../quiver-auth.js');

app.use(quiverAuth());

/*
 *  Auth tests
*/
suite('Auth', function() {
  suiteSetup(function(done) {

    done();
  });

  suiteTeardown(function(done) {

    done();
  });

  test('Auth should return a token', function(done) {
    request(app).get('/quiver-auth/google').expect(302).end(function(err, res) {
      assert.equal(err, null, 'err should be null.');
      assert.ok(res.headers.location.match(/accounts\.google\.com\/o\/oauth2\/auth/), 'Redirect location should match.');
      done();
    });
  });

  test('Auth return should set a cookie', function (done) {
    request(app).get('/quiver-auth/google/return').expect(302).expect('content-type', 'text/plain').end(function(err, res) {
      assert.ok(res.headers['set-cookie'][0].match(/connect\.sid/), 'Should set cookie');
      assert.equal(err, null, 'err should be null.');
      done();
    });
  });

});