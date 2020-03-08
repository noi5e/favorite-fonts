/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import debounce from "lodash.debounce";

import {
  dislikeFont,
  fetchDisplayFonts,
  likeFont,
  loadAllFonts,
  requestFonts,
  receiveFonts,
  updateFaves
} from "../redux/actions";
import { getUser, isUserAuthenticated } from "../utilities/authentication";
import FontCard from "./FontCard.jsx";

const FontCardContainer = ({
  displayedFonts,
  dislikeFont,
  fonts,
  fontSize,
  isFetching,
  likeFont,
  loadAllFonts,
  fetchDisplayFonts,
  moreFontsToFetch,
  requestFonts,
  receiveFonts,
  sampleText,
  updateFaves,
  user
}) => {
  const checkForBottomScroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.body.offsetHeight &&
      moreFontsToFetch
    ) {
      fetchDisplayFonts();
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
        requestFonts();
        const fontsResult = await axios("/api/get_all_fonts");
        // const firstEightFonts = fontsResult.data.slice(0, 8);
        receiveFonts(fontsResult.data);

        if (isUserAuthenticated()) {
          fetchFaves();
        }
      })();
    } else {
      loadAllFonts();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", checkForBottomScroll);

    return () => window.removeEventListener("scroll", checkForBottomScroll);
  });

  useEffect(() => {
    if (isUserAuthenticated() && fonts.length > 0) {
      fetchFaves();
    }
  }, [user]);

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

  const fontCards = !isFetching
    ? displayedFonts.map((font, index) => (
        <FontCard
          key={index}
          fontName={font.family}
          fontSize={fontSize}
          handleFave={handleFave}
          sampleText={sampleText}
          liked={font.liked}
        />
      ))
    : "Loading...";

  return <div id="font-card-container">{fontCards}</div>;
};

const mapStateToProps = state => ({
  displayedFonts: state.displayedFonts,
  fonts: state.fonts,
  fontSize: state.fontSize,
  isFetching: state.isFetching,
  moreFontsToFetch: state.moreFontsToFetch,
  sampleText: state.sampleText,
  user: state.user
});

const mapDispatchToProps = {
  dislikeFont,
  likeFont,
  loadAllFonts,
  fetchDisplayFonts,
  requestFonts,
  receiveFonts,
  updateFaves
};

export default connect(mapStateToProps, mapDispatchToProps)(FontCardContainer);
