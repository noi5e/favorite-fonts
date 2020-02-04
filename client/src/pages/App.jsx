import React, { useEffect } from "react";
import { connect } from "react-redux";

import { userLoginSuccess } from "../redux/actions";
import { isUserAuthenticated, getUser, authenticateUser } from "../utilities/authentication";

import Header from "./Header.jsx";
import FontCardContainer from "./FontCardContainer.jsx";

const App = ({ userLoginSuccess }) => {

  useEffect(() => {
    if (isUserAuthenticated()) {
      const firstName = JSON.parse(getUser()).firstName;
      userLoginSuccess({ firstName });
    };
  });

  return (
    <div id="container">
      <Header />
      <FontCardContainer />
    </div>
  );
};

const mapDispatchToProps = { userLoginSuccess };

export default connect(
  null,
  mapDispatchToProps
)(App);
