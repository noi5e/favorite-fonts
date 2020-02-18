import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

export default function FontCard(props) {
  const query = props.fontName.split(" ").join("+");
  const link = `https://fonts.googleapis.com/css?family=${query}&display=swap`;

  return (
    <div className="font-card">
      <Helmet>
        <link
          href={link}
          rel="stylesheet"
          media="none"
          onload="if(media!='all')media='all'"
        />
      </Helmet>
      <i
        className="far fa-heart like-button"
        onClick={() => {
          props.handleFave(props.fontName);
        }}
      ></i>
      <div className="font-name">{props.fontName}</div>
      <div className="sample-text" style={{ fontFamily: `${props.fontName}` }}>
        {props.sampleText}
      </div>
    </div>
  );
}

FontCard.propTypes = {
  fontName: PropTypes.string.isRequired,
  // fontSize: PropTypes.num.isRequired,
  sampleText: PropTypes.string.isRequired
};
