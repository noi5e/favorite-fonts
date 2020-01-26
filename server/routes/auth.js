const express = require('express');
const router = new express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const addSocketToSession = function(request, response, next) {
  request.session.socketId = request.query.socketId;
  next();
};

router.get('/google', addSocketToSession, passport.authenticate('google-oauth', { scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'] }));

// router.get('/google/callback', passport.authenticate('google-oauth'), function(request, response) {
//   const io = request.app.get('io');
//   io.to(`${request.session.socketId}`).emit('login-success', 'fake token!');

//   response.redirect(process.env.APP_URL);
// });

router.get('/google/callback', function(request, response, next) {
  passport.authenticate('google-oauth', function(error, user) {
    if (error) { console.log(error); };

    console.log(user);

    const token = jwt.sign({
      sub: user.user_id,
      firstName: user.first_name
    }, process.env.JWT_KEY);

    const io = request.app.get('io');
    io.to(`${request.session.socketId}`).emit('login-success', token);

  })(request, response, next);
});

module.exports = router;
