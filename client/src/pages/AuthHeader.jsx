import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
      <Link to="/" className="nav-link auth-link">
        All Fonts
      </Link>
      <Link to="/favorites" className="nav-link auth-link">
        Favorites
      </Link>
      <a onClick={logoutUser} className="nav-link auth-link">
        Logout
      </a>
    </nav>
  );
};

const mapDispatchToProps = { userLogout };

export default connect(null, mapDispatchToProps)(AuthHeader);
