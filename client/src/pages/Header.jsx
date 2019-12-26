import React from 'react';

import SettingsContainer from './SettingsContainer.jsx';

const Header = props => {
  return (
    <div id="header-container">
      <div id="header-logo"><b>Qoogle</b> Fonts</div>
      <nav id="nav">
        <a href="/auth/google" id="nav-link">Sign in with Google</a>
      </nav>
      <SettingsContainer />
    </div>  
    );
};

export default Header;
