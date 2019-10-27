const path = require('path');

// express
const express = require('express');
const app = express();
const http = require('http').Server(app);

// static files
app.use(express.static('./dist'));

// serve index.html
app.get('/*', function(request, response, next) {
  response.sendFile(path.join(__dirname, '/dist/index.html'));
});

const port = process.env.PORT || 8080;

http.listen(port, function() {
  console.log('App listening on port ' + port + '!');
})