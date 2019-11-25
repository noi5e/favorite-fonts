const GoogleOAuthStrategy = require('passport-google-oauth').OAuth2Strategy;

// import postgres model here
// import jwt here

module.exports = new GoogleOAuthStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, function(accessToken, refreshToken, profile, done) {

  //  here, we query the database to see if the user exists.
  //    if not, we create the account.
  //    if so, we return the user-- with a JSON web token.
  //    in both instances, we return the user via the callback function, done.

});
