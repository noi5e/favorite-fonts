import React from 'react';
import PropTypes from 'prop-types';

class FontCard extends React.Component {

  render() {
    return (
      <div className="font-card">
        <i className="far fa-heart like-button"></i>
        <div className="font-name">{this.props.fontName}</div>
        <div className="sample-text">{this.props.sampleText}</div>
      </div>
    );  
  }
  
}

FontCard.propTypes = {
  fontName: PropTypes.string.isRequired,
  sampleText: PropTypes.string.isRequired
}

export default FontCard;