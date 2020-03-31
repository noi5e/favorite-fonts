import React from "react";
import { connect } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";

import { deAuthenticateUser } from "../utilities/authentication";
import { clearUserLikes, userLogout } from "../redux/actions";

const AuthHeader = ({ clearUserLikes, userLogout }) => {
  let history = useHistory();
  let location = useLocation();

  const logoutUser = e => {
    e.preventDefault();
    deAuthenticateUser();
    userLogout();
    clearUserLikes();
    history.push("/");
  };

  console.log(location.pathname);

  return (
    <nav id="nav">
      <Link to="/" className={location.pathname === "/" ? "nav-link auth-link active-link" : "nav-link auth-link"}>
        All Fonts
      </Link>
      <Link to="/favorites" className={location.pathname === "/favorites" ? "nav-link auth-link active-link" : "nav-link auth-link"}>
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
