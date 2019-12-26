import React from 'react';

import SettingsContainer from './SettingsContainer.jsx';
import LoginContainer from './LoginContainer.jsx';

const Header = props => {
  return (
    <div id="header-container">
      <div id="header-logo"><b>Qoogle</b> Fonts</div>
      <LoginContainer />
      <SettingsContainer />
    </div>  
    );
};

export default Header;
