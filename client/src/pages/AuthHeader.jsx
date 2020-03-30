import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { deAuthenticateUser } from "../utilities/authentication";
import { clearUserLikes, userLogout } from "../redux/actions";

const AuthHeader = ({ clearUserLikes, userLogout }) => {
  let history = useHistory();

  const logoutUser = e => {
    e.preventDefault();
    deAuthenticateUser();
    userLogout();
    clearUserLikes();
    history.push("/");
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

const mapDispatchToProps = { clearUserLikes, userLogout };

export default connect(null, mapDispatchToProps)(AuthHeader);
