import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { fetchFonts } from "../redux/actions";
import { isUserAuthenticated, getUser } from "../utilities/authentication";
import FontCard from "./FontCard.jsx";

const FontCardContainer = ({ fonts, fetchFonts, isFetching }) => {
  useEffect(() => {
    if (fonts.length === 0) {
      fetchFonts();
    }
  });

  const handleFave = fontName => {
    (async () => {
      const result = await axios({
        url: "/api/toggle_font_fave",
        method: "post",
        headers: { Authorization: `Bearer ${JSON.parse(getUser()).token}` },
        data: { fontName }
      });

      console.log(result);
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
        />
      ))
    : "Loading...";

  return <div id="font-card-container">{fontCards}</div>;
};

const mapStateToProps = state => ({
  fonts: state.fonts,
  isFetching: state.isFetching
});

const mapDispatchToProps = { fetchFonts };

export default connect(mapStateToProps, mapDispatchToProps)(FontCardContainer);
