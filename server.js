// dotenv for process.env keys
require('dotenv').config()

const path = require('path');

// express
const express = require('express');
const app = express();
const server = require('http').Server(app);

// socket.io
const io = require('socket.io')(server);
io.on('connection', function(socket){
  console.log('a user connected');
});

// set socket.io in the express app, so it can be accessed within auth.js
app.set('io', io);

// initialize passport & load passport strategy
const passport = require('passport');
app.use(passport.initialize());
const GoogleOAuthStrategy = require('./server/passport/google-oauth');
passport.use('google-oauth', GoogleOAuthStrategy)

// postgres & knex
// const knex = require('knex')({
//   client: 'pg',
//   connection: {
//     host: process.env.POSTGRES_HOST,
//     user: process.env.POSTGRES_PASSWORD,
//     port: process.env.POSTGRES_PORT,
//     password: process.env.POSTGRES_PASSWORD,
//     database: 'favorite-fonts'
//   }
// });

// express-session
const session = require('express-session');

// connect-pg-simple: for storing Express session data in Postgres
// we need this to save web socket IDs to the request.
// the app uses web sockets to forward JSON web tokens to client instances once they are authenticated.
const pgSession = require('connect-pg-simple')(session);

app.use(session({
  resave: false,
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  store: new pgSession({
    conString: process.env.POSTGRES_CONNECTION_STRING,
    ttl: 7 * 24 * 60 * 60 // one week
  })
}));

// static files
app.use(express.static('./dist'));

// custom routes
const api = require('./server/routes/api');
app.use('/api', api);
const auth = require('./server/routes/auth');
app.use('/auth', auth);

// serve index.html
app.get('/*', function(request, response, next) {
  response.sendFile(path.join(__dirname, '/dist/index.html'));
});

const port = process.env.PORT || 8080;

server.listen(port, function() {
  console.log('App listening on port ' + port + '!');
});
