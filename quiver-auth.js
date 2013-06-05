var conf = require('./config/convict.js'),
  express = require('express'),
  app = express(),
  passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: conf.get('sessionSecret') }));

//  Passport Config
app.use(passport.initialize()); // Initialize Passport!  Also use passport.session() middleware, to support persistent login sessions (recommended).
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: conf.get('google_id'),
  clientSecret: conf.get('google_secret'),
  callbackURL: '/quiver-auth/google/return'
}, function(accessToken, refreshToken, profile, done) {
  process.nextTick(function() {
    return done(null, profile);
  });

}));

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Google profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


//  Passport Routes
app.get('/quiver-auth/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
}));

app.get('/quiver-auth/google/return', passport.authenticate('google', { failureRedirect: conf.get('failureRedirect') }), function(req, res) {
	return res.redirect(conf.get('successRedirect'));
});

module.exports = app;


