import React from 'react';
import { connect } from 'react-redux';

import SettingsContainer from './SettingsContainer.jsx';
import LoginContainer from './LoginContainer.jsx';

const ProfileLink = props => {
  return (
    <nav id="nav">
      <a className="nav-link auth-link">Your Favorite Fonts</a>
      <a className="nav-link auth-link">Logout</a>
    </nav>
  );
}

const Header = ({ user }) => {
  return (
    <div id="header-container">
      <div id="header-logo"><b>Qoogle</b> Fonts</div>
      {/* Syntax below checks for if the user object in state is empty or not */}
      {(Object.keys(user).length === 0 && user.constructor === Object) ? <LoginContainer /> : <ProfileLink firstName={user.firstName} />}
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
