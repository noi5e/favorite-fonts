import React from 'react';

const LoginContainer = props => {

  const startAuth = e => {
    e.preventDefault();
    const popup = openPopup();
  };

  const openPopup = () => {
    const width = 600, height = 600;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);
    const url = `/auth/login?socketId=${socket.id}`;

    return window.open(
      url, 
      '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
    );
  };

  return (
    <nav id="nav">
      <a href="/auth/google" onClick={startAuth} id="nav-link">Sign in with Google</a>
    </nav>
  );
};

export default LoginContainer;
