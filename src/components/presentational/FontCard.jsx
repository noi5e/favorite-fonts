import React from 'react';
import PropTypes from 'prop-types';

function FontCard() {
  return (
    <div className="font-card">
      <i className="far fa-heart like-button"></i>
      <div className="font-name">{this.props.fontName}</div>
      <div className="font-author">{this.props.author}</div>
      <div className="sample-text">{this.props.sampleText}</div>
    </div>
  );
}

FontCard.propTypes = {
  fontName: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  sampleText: PropTypes.string.isRequired
}

//   <div className="font-card">
//     <i className="far fa-heart like-button"></i>
//     <div className="font-name">Roboto</div>
//     <div className="font-author">Christian Robertson</div>
//     <div className="sample-text">She stared through the window at the stars.</div>
//   </div>

export default FontCard;