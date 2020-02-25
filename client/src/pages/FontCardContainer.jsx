/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { dislikeFont, likeFont, requestFonts, receiveFonts, updateFaves } from "../redux/actions";
import { getUser, isUserAuthenticated } from "../utilities/authentication";
import FontCard from "./FontCard.jsx";

const FontCardContainer = ({
  dislikeFont,
  fonts,
  isFetching,
  likeFont,
  requestFonts,
  receiveFonts,
  updateFaves,
  user
}) => {
  const fetchFaves = async () => {
    const favesResult = await axios({
      url: "/api/get_user_faves",
      method: "post",
      headers: { Authorization: `Bearer ${JSON.parse(getUser()).token}` }
    });

    updateFaves(favesResult.data);
  };

  useEffect(() => {
    if (fonts.length === 0) {
      (async () => {
        requestFonts();
        const fontsResult = await axios("/api/get_all_fonts");
        const firstEightFonts = fontsResult.data.slice(0, 8);
        receiveFonts(firstEightFonts);

        if (isUserAuthenticated()) {
          fetchFaves();
        }
      })();
    }
  }, []);

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
    ? fonts.map((font, index) => (
        <FontCard
          key={index}
          fontName={font.family}
          author={"Christian Robertson"}
          handleFave={handleFave}
          sampleText={"The quick brown fox jumped over the lazy dog."}
          liked={font.liked}
        />
      ))
    : "Loading...";

  return <div id="font-card-container">{fontCards}</div>;
};

const mapStateToProps = state => ({
  user: state.user,
  fonts: state.fonts,
  isFetching: state.isFetching
});

const mapDispatchToProps = {
  dislikeFont,
  likeFont,
  requestFonts,
  receiveFonts,
  updateFaves
};

export default connect(mapStateToProps, mapDispatchToProps)(FontCardContainer);
