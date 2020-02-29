/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import debounce from "lodash.debounce";

import { dislikeFont, likeFont, loadDisplayFonts, requestFonts, receiveFonts, updateFaves } from "../redux/actions";
import { getUser, isUserAuthenticated } from "../utilities/authentication";
import FontCard from "./FontCard.jsx";

const FontCardContainer = ({
  displayedFonts,
  dislikeFont,
  fonts,
  isFetching,
  likeFont,
  loadDisplayFonts,
  moreFontsToLoad,
  requestFonts,
  receiveFonts,
  sampleText,
  updateFaves,
  user
}) => {
  const checkForBottomScroll = debounce(() => {
    if ((window.innerHeight + document.documentElement.scrollTop) >= document.body.offsetHeight && moreFontsToLoad) {
      loadDisplayFonts();
    }
  }, 100)

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
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", checkForBottomScroll)

    return () => window.removeEventListener('scroll', checkForBottomScroll);
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
          author={"Christian Robertson"}
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
  isFetching: state.isFetching,
  moreFontsToLoad: state.moreFontsToLoad,
  sampleText: state.sampleText,
  user: state.user
});

const mapDispatchToProps = {
  dislikeFont,
  likeFont,
  loadDisplayFonts,
  requestFonts,
  receiveFonts,
  updateFaves
};

export default connect(mapStateToProps, mapDispatchToProps)(FontCardContainer);
