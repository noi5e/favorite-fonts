const express = require('express');
const router = new express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google-oauth', { scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'] }));

router.get('/google/callback', passport.authenticate('google-oauth'), function(request, response) {
  response.setHeader('Authorization', 'Bearer ' + request.user.token);
  response.redirect(process.env.APP_URL);
});

module.exports = router;
