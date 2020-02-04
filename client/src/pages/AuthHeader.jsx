import React from "react";
import { connect } from "react-redux";

import { deAuthenticateUser } from "../utilities/authentication";
import { userLogout } from "../redux/actions";

const AuthHeader = ({ userLogout }) => {
  const logoutUser = e => {
    e.preventDefault();
    deAuthenticateUser();
    userLogout();
  };

  return (
    <nav id="nav">
      <a className="nav-link auth-link">Your Favorite Fonts</a>
      <a onClick={logoutUser} className="nav-link auth-link">Logout</a>
    </nav>
  );
};

const mapDispatchToProps = ({ userLogout });

export default connect(
  null,
  mapDispatchToProps
)(AuthHeader);
