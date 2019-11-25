// dotenv for process.env keys
require('dotenv').config()

const path = require('path');

// express
const express = require('express');
const app = express();
const http = require('http').Server(app);

// postgres & knex
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    password: process.env.POSTGRES_PASSWORD,
    database: 'favorite-fonts'
  }
})

// static files
app.use(express.static('./dist'));

// custom routes
const api = require('./server/routes/api');
app.use('/api', api);

// serve index.html
app.get('/*', function(request, response, next) {
  response.sendFile(path.join(__dirname, '/dist/index.html'));
});

const port = process.env.PORT || 8080;

http.listen(port, function() {
  console.log('App listening on port ' + port + '!');
})
