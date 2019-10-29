const express = require('express');
let router = new express.Router();

const axios = require('axios');

router.get('/get_all_fonts', (request, response, next) => {

  // https://www.googleapis.com/webfonts/v1/webfonts?key=YOUR-API-KEY
  // https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity

  response.send({ data: [{ name: 'Helvetica' }] })
}); 

module.exports = router;