/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import debounce from "lodash.debounce";

import FontCard from "./FontCard.jsx";
import {
  dislikeFont,
  displayMoreFonts,
  likeFont,
  loadFavoriteFonts
} from "../redux/actions";
import { getUser, isUserAuthenticated } from "../utilities/authentication";

const FavoritesContainer = ({
  likeFont,
  dislikeFont,
  displayedFonts,
  displayMoreFonts,
  fontSize,
  sampleText,
  loadFavoriteFonts,
  moreFontsToDisplay,
  searchMatchesFonts
}) => {
  const checkForBottomScroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.body.offsetHeight &&
      moreFontsToDisplay
    ) {
      displayMoreFonts();
    }
  }, 100);

  useEffect(() => {
    window.scrollTo(0, 0);
    // resetDisplayedFonts();
    loadFavoriteFonts();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", checkForBottomScroll);

    return () => window.removeEventListener("scroll", checkForBottomScroll);
  });

  const handleFave = fontName => {
    (async () => {
      const result = await axios({
        url: "/api/toggle_font_fave",
        method: "post",
        headers: { Authorization: `Bearer ${JSON.parse(getUser()).token}` },
        data: { fontName }
      });

      if (result.data.liked) {
        likeFont(result.data.font);
      } else {
        dislikeFont(result.data.font);
      }
    })();
  };

  console.log(isUserAuthenticated());

  if (!isUserAuthenticated()) { 
    console.log("user isn't authenticated");
    return <Redirect to="/" />
  } else if (!searchMatchesFonts) {
    return <div id="message">No matching fonts found.</div>;
  } else {
    const favoriteFonts = displayedFonts.map((font, index) => (
      <FontCard
        key={index}
        fontName={font.family}
        fontSize={fontSize}
        handleFave={handleFave}
        sampleText={sampleText}
        liked={font.liked}
      />
    ));

    return <div id="font-card-container">{favoriteFonts}</div>;
  }
};

const mapStateToProps = state => ({
  displayedFonts: state.displayedFonts,
  fonts: state.fonts,
  fontSize: state.fontSize,
  sampleText: state.sampleText,
  moreFontsToDisplay: state.moreFontsToDisplay,
  searchMatchesFonts: state.searchMatchesFonts
});

const mapDispatchToProps = {
  dislikeFont,
  displayMoreFonts,
  likeFont,
  loadFavoriteFonts
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer);
