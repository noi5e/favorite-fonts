/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

import FontCard from "./FontCard.jsx";
import { dislikeFont, likeFont, resetDisplayedFonts } from "../redux/actions";
import { getUser } from "../utilities/authentication";

const FavoritesContainer = ({
  likeFont,
  dislikeFont,
  fonts,
  resetDisplayedFonts
}) => {
  useEffect(() => {
    resetDisplayedFonts();
  }, []);

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

  const favoriteFonts = fonts
    .filter(font => font.liked)
    .map((font, index) => (
      <FontCard
        key={index}
        fontName={font.family}
        handleFave={handleFave}
        sampleText={"The quick brown fox jumped over the lazy dog."}
        liked={font.liked}
      />
    ));

  return <div id="font-card-container">{favoriteFonts}</div>;
};

const mapStateToProps = state => ({
  displayedFonts: state.displayedFonts,
  fonts: state.fonts
});

const mapDispatchToProps = {
  dislikeFont,
  likeFont,
  resetDisplayedFonts
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer);
