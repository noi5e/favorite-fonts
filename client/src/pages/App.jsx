import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  hidePageUpButton,
  showPageUpButton,
  userLoginSuccess
} from "../redux/actions";
import { isUserAuthenticated, getUser } from "../utilities/authentication";

import Header from "./Header.jsx";
import FavoritesContainer from "./FavoritesContainer.jsx";
import FontCardContainer from "./FontCardContainer.jsx";

const App = ({
  hidePageUpButton,
  pageUpButtonIsVisible,
  searchTerm,
  showPageUpButton,
  userLoginSuccess
}) => {
  useEffect(() => {
    if (isUserAuthenticated()) {
      const firstName = JSON.parse(getUser()).firstName;
      userLoginSuccess({ firstName });
    }
  }, []);

  // if the user scrolls past the first third of the page, show the page-up button
  const checkScrollHeight = () => {
    if (
      document.documentElement.scrollTop > document.body.offsetHeight / 3 &&
      document.documentElement.scrollTop > 200 &&
      !pageUpButtonIsVisible
    ) {
      showPageUpButton();
    } else if (
      document.documentElement.scrollTop <= document.body.offsetHeight / 3 &&
      pageUpButtonIsVisible
    ) {
      hidePageUpButton();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollHeight);

    return () => window.removeEventListener("scroll", checkScrollHeight);
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchTerm]);

  const visibleClass = pageUpButtonIsVisible ? "" : " invisible";

  return (
    <>
      <div id="container">
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={FontCardContainer} />
            <Route path="/favorites" component={FavoritesContainer} />
          </Switch>
        </Router>
      </div>
      <i
        id="page-up-button"
        className={"fas fa-arrow-up" + visibleClass}
        onClick={() => window.scrollTo(0, 0)}
      ></i>
    </>
  );
};

const mapStateToProps = state => ({
  pageUpButtonIsVisible: state.pageUpButtonIsVisible,
  searchTerm: state.searchTerm
});

const mapDispatchToProps = {
  hidePageUpButton,
  showPageUpButton,
  userLoginSuccess
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
