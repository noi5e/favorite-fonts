const passport = require('passport');
const GoogleOAuthStrategy = require('passport-google-oauth').OAuth2Strategy;

// import postgres model here
// import jwt here

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = new GoogleOAuthStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.APP_URL + '/auth/google/callback',
  session: false
}, function(accessToken, refreshToken, profile, done) {

  // here, we query the database to see if the user exists.
  // if not, we create the account.
  // either way, we return the encrypted JSON web token via the callback function, done

  // profile.id = Google ID
  // profile.name.givenName = first name
  // profile._json.email = email

  return done(null, {
    token: 'thisisafaketoken!',
    username: 'will'
  });

});
