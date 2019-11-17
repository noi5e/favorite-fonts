// import React from 'react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import FontCard from '../presentational/FontCard.jsx';

export default function Main(props) {

  const [fonts, setFonts] = useState([]);

  useEffect(() => {
    const fetchFonts = async() => {
      const result = await axios('/api/get_all_fonts');
      setFonts(result.data.slice(0, 8));
    }

    fetchFonts();
  }, []);

  const fontCards = fonts ? (
    fonts.map((font, index) => (
      <FontCard key={index} fontName={font.family} author={'Christian Robertson'} sampleText={'The quick brown fox jumped over the lazy dog.'} />
    ))
  ) : (
    "Loading..."
  );

  return (
    <div id="font-card-container">
      {fontCards}
    </div>
  );
}

// export default connect(

// )(Main);
