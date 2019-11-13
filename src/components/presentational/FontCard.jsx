import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

// let link = `https://fonts.googleapis.com/css?family=${search}&display=swap`;

// <link
//   href={link}
//   rel="stylesheet"
//   media="none"
//   onload="if(media!='all')media='all'"
// />

class FontCard extends React.Component {

  render() {

    const query = this.props.fontName.split(" ").join("+");
    const link = `https://fonts.googleapis.com/css?family=${query}&display=swap`;

    // fontFamily: `${this.props.fontName}, ${backup}

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
        <i className="far fa-heart like-button"></i>
        <div className="font-name">{this.props.fontName}</div>
        <div className="sample-text" style={{ fontFamily: `${this.props.fontName}` }}>{this.props.sampleText}</div>
      </div>
    );  
  }
  
}

FontCard.propTypes = {
  fontName: PropTypes.string.isRequired,
  // fontSize: PropTypes.num.isRequired,
  sampleText: PropTypes.string.isRequired
}

export default FontCard;