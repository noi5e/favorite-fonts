import React from 'react';
import { connect } from 'react-redux';

import SettingsContainer from './SettingsContainer.jsx';
import LoginContainer from './LoginContainer.jsx';
import AuthHeader from "./AuthHeader.jsx";

const Header = ({ user }) => {
  return (
    <div id="header-container">
      <div id="header-logo"><b>Qoogle</b> Fonts</div>
      {/* Syntax below checks for if the user object in state is empty or not */}
      {(Object.keys(user).length === 0 && user.constructor === Object) ? <LoginContainer /> : <AuthHeader />}
      <SettingsContainer />
    </div>  
    );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps
)(Header);
