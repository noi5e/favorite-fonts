/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { userLoginSuccess } from '../redux/actions';
import { authenticateUser } from "../utilities/authentication";

const LoginContainer = ({ userLoginSuccess }) => {

  let popup;

  useEffect(() => {
    socket.on('login-success', data => {
      // response is { token, firstName }
      authenticateUser(JSON.stringify(data));
      userLoginSuccess({ firstName: data.firstName });
      popup.close();
    });

    // close the socket connection
    return () => { socket.disconnect(true); }
  });

  const checkPopup = () => {
    const check = setInterval(() => {
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
        // re-enable the login button
      }
    }, 1000);
  };

  const startAuth = e => {
    e.preventDefault();
    popup = openPopup();
    checkPopup();
    // disable the login button
  };

  const openPopup = () => {
    const width = 600, height = 600;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);
    const url = `/auth/google?socketId=${socket.id}`;

    return window.open(
      url, 
      '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
    );
  };

  return (
    <nav id="nav">
      <a onClick={startAuth} className="nav-link login-button">Sign in with <b>Qoogle</b></a>
    </nav>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = { userLoginSuccess };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
