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
  loadFavoriteFonts,
  receiveFonts,
  requestFonts,
  updateFaves
} from "../redux/actions";
import { getUser, isUserAuthenticated } from "../utilities/authentication";

const FavoritesContainer = ({
  likeFont,
  dislikeFont,
  displayedFonts,
  displayMoreFonts,
  fonts,
  fontSize,
  sampleText,
  loadFavoriteFonts,
  moreFontsToDisplay,
  receiveFonts,
  searchMatchesFonts,
  updateFaves
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

  const fetchFaves = async () => {
    const favesResult = await axios({
      url: "/api/get_user_faves",
      method: "post",
      headers: { Authorization: `Bearer ${JSON.parse(getUser()).token}` }
    });

    updateFaves(favesResult.data);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (fonts.length === 0) {
      (async () => {
        console.log("getting fonts");
        requestFonts();
        const fontsResult = await axios("/api/get_all_fonts");
        receiveFonts(fontsResult.data);
        await fetchFaves();
        loadFavoriteFonts();
      })();
    } else {
      loadFavoriteFonts();
    }
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

  if (!isUserAuthenticated()) {
    return <Redirect to="/" />;
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
  loadFavoriteFonts,
  receiveFonts,
  requestFonts,
  updateFaves
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer);
