import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { userLoginSuccess } from "../redux/actions";
import { isUserAuthenticated, getUser } from "../utilities/authentication";

import Header from "./Header.jsx";
import FavoritesContainer from "./FavoritesContainer.jsx";
import FontCardContainer from "./FontCardContainer.jsx";

const App = ({ userLoginSuccess, searchTerm }) => {
  useEffect(() => {
    if (isUserAuthenticated()) {
      const firstName = JSON.parse(getUser()).firstName;
      userLoginSuccess({ firstName });
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchTerm]);

  return (
    <div id="container">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={FontCardContainer} />
          <Route path="/favorites" component={FavoritesContainer} />
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = state => ({
  searchTerm: state.searchTerm
});

const mapDispatchToProps = { userLoginSuccess };

export default connect(mapStateToProps, mapDispatchToProps)(App);
