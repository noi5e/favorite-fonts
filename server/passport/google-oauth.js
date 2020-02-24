const passport = require("passport");
const GoogleOAuthStrategy = require("passport-google-oauth").OAuth2Strategy;

// import postgres model here
const db = require("../../db");

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = new GoogleOAuthStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.APP_URL + "/auth/google/callback",
    session: false
  },
  function(accessToken, refreshToken, profile, done) {
    (async () => {
      const client = await db.connect();

      try {
        const client = await db.connect();

        // here, we query the database to see if the user exists.
        const userExistsQuery = await client.query(
          "SELECT * FROM users WHERE user_id = $1",
          [profile.id]
        );

        let user = {};

        if (userExistsQuery.rows.length === 0) {
          // if not, we create the account.
          user = await client.query(
            "INSERT INTO users(user_id, email, first_name) VALUES($1, $2, $3) RETURNING *",
            [profile.id, profile._json.email, profile.name.givenName]
          );
        } else {
          // if user exists, retrieve user, and also user's likes
          user = userExistsQuery.rows[0];
        }

        // either way, we return the encrypted JSON web token via the callback function, done
        return done(null, user);
      } finally {
        client.release();
      }
    })().catch(error => {
      console.log(error);
      return done(error, null);
    });
  }
);
