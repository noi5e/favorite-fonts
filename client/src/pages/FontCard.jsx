import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

export default function FontCard(props) {
  const query = props.fontName.split(" ").join("+");
  const link = `https://fonts.googleapis.com/css?family=${query}&display=swap`;
  const heartStyle = props.liked ? "fas fa-heart like-button" : "far fa-heart like-button";

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
        className={heartStyle}
        onClick={() => {
          props.handleFave(props.fontName);
        }}
      ></i>
      <div className="font-name">{props.fontName}</div>
      <div className="sample-text" style={{ fontFamily: `${props.fontName}`, fontSize: `${props.fontSize}` }}>
        {props.sampleText}
      </div>
    </div>
  );
}

FontCard.propTypes = {
  fontName: PropTypes.string.isRequired,
  // fontSize: PropTypes.num.isRequired,
  sampleText: PropTypes.string.isRequired,
  liked: PropTypes.bool.isRequired
};
