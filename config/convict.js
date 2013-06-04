var convict = require('convict'),
  conf = convict({
    env: {
      doc: "The applicaton environment.",
      format: ["production", "development", "test"],
      default: "development",
      env: "NODE_ENV"
    },
    port: {
      doc: "The port to bind.",
      format: "port",
      default: 8080,
      env: "QUAKE_PORT"
    },
    sessionSecret: {
      doc: "Connect session secret",
      format: "*",
      default: "You should really change this",
      env: "QUAKE_SESSION_SECRET"
    },
    successRedirect: {
      doc: "Auth success redirect",
      format: "*",
      default: "/",
      env: "QUAKE_AUTH_SUCCESS_REDIRECT"
    },
    failureRedirect: {
      doc: "Auth failure redirect",
      format: "*",
      default: "/login",
      env: "QUAKE_AUTH_FAILURE_REDIRECT"
    },
    google_id: {
      doc: "Google+ oAuth client ID",
      format: "*",
      default: "CHANGE THIS NOW!",
      env: "QUAKE_AUTH_GOOGLE_CLIENT_ID"
    },
    google_secret: {
      doc: "Google+ oAuth client secret",
      format: "*",
      default: "CHANGE THIS NOW!",
      env: "QUAKE_AUTH_GOOGLE_CLIENT_SECRET"
    }
  });

conf.validate();

module.exports = conf;

