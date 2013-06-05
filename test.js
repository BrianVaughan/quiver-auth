var request = require('supertest'),
  express = require('express'),
  app = express(),
  quiverAuth = require('./quiver-auth.js');

app.use(quiverAuth)

module.exports = {
  testAuth: function(test) {
    request(app).get('/quiver-auth/google').expect(302).end(function(err, res) {
      test.equal(err, null, 'err should be null.');
      test.ok(res.headers.location.match(/accounts\.google\.com\/o\/oauth2\/auth/), 'Redirect location should match.');
      test.done();
    });

  },

  testReturn: function(test) {
  	request(app).get('/quiver-auth/google/return').expect(302).expect('content-type', 'text/plain').end(function(err, res) {
      test.ok(res.headers['set-cookie'][0].match(/connect\.sid/), 'Should set cookie');
      test.equal(err, null, 'err should be null.');
      test.done();
  	});
  }
}