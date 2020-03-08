/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import debounce from "lodash.debounce";

import FontCard from "./FontCard.jsx";
import {
  dislikeFont,
  likeFont,
  loadFavoriteFonts
} from "../redux/actions";
import { getUser } from "../utilities/authentication";

const FavoritesContainer = ({
  likeFont,
  dislikeFont,
  displayedFonts,
  sampleText,
  loadFavoriteFonts,
  moreFontsToFetch
}) => {
  const checkForBottomScroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.body.offsetHeight &&
        moreFontsToFetch
    ) {
      loadFavoriteFonts();
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

  // const favoriteFonts = fonts
  //   .filter(font => font.liked)
  //   .map((font, index) => (
  //     <FontCard
  //       key={index}
  //       fontName={font.family}
  //       handleFave={handleFave}
  //       sampleText={sampleText}
  //       liked={font.liked}
  //     />
  //   ));

  const favoriteFonts = displayedFonts.map((font, index) => (
    <FontCard
      key={index}
      fontName={font.family}
      handleFave={handleFave}
      sampleText={sampleText}
      liked={font.liked}
    />
  ));

  return <div id="font-card-container">{favoriteFonts}</div>;
};

const mapStateToProps = state => ({
  displayedFonts: state.displayedFonts,
  fonts: state.fonts,
  sampleText: state.sampleText,
  moreFontsToFetch: state.moreFontsToFetch
});

const mapDispatchToProps = {
  dislikeFont,
  likeFont,
  loadFavoriteFonts
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer);
