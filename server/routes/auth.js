const express = require('express');
const router = new express.Router();
const passport = require('passport');

const addSocketToSession = function(request, response, next) {
  request.session.socketId = request.query.socketId;
  next();
};

router.get('/google', addSocketToSession, passport.authenticate('google-oauth', { scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'] }));

router.get('/google/callback', passport.authenticate('google-oauth'), function(request, response) {
  const io = request.app.get('io');
  io.to(`${request.session.socketId}`).emit('login-success', 'fake token!');

  response.redirect(process.env.APP_URL);
});

module.exports = router;
