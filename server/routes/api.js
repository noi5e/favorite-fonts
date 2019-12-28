const express = require('express');
let router = new express.Router();

const axios = require('axios');

router.get('/get_all_fonts', (request, response, next) => {

  const fetchGoogleFonts = async() => {
    try {
      const result = await axios.get('https://www.googleapis.com/webfonts/v1/webfonts', {
        params: {
          key: process.env.GOOGLE_FONTS_DEVELOPER_API_KEY,
          sort: 'popularity'
        }
      });

      response.send(result.data.items)
    } catch(error) {
      console.log('Fetching fonts from Google API: ' + error);
      response.status(502).send({ error: "Unable to fetch fonts from Google API!" })
    }
  }

  fetchGoogleFonts();
}); 

module.exports = router;