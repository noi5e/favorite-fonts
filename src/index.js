import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import FontCard from './components/presentational/FontCard.jsx';

function App() {
  const [fonts, setFonts] = useState([]);

  useEffect(() => {
    const fetchFonts = async() => {
      const result = await axios('/api/get_all_fonts');
      setFonts(result.data);
      console.log(result.data);
    }

    fetchFonts();
  }, []);

  // Google Fonts API returns 960 fonts

  // <ul>
  //   {fonts.map((font, index) => (
  //     <li key={index}>
  //       {font.family}
  //     </li>
  //   ))}
  // </ul>

  return (
    <div>
      {fonts ? (
        <div id="container">
          <div id="header-container">
            <div id="header-logo"><b>Qoogle</b> Fonts</div>
            <nav id="nav">
              <a id="nav-link">Catalog</a>
              <a id="nav-link">Featured</a>
              <a id="nav-link">Articles</a>
              <a id="nav-link">About</a>
            </nav>
            <div id="search-tools">
              <div className="input-group">
                <input id="search-input" type="search" aria-label="search fonts" className="form-control" placeholder="Search fonts..." />
                <input id="sample-text-input" type="text" aria-label="enter sample text" className="form-control" placeholder="Type something!" />
                <select id="font-size-select" className="custom-select">
                  <option selected value="24px">24px</option>
                  <option value="40px">40px</option>
                  <option value="64px">64px</option>
                  <option value="96px">96px</option>
                </select>
                <div className="input-group-append">
                  <button id="reset-button" className="btn btn-outline-secondary" type="button"><i className="fas fa-sync-alt"></i></button>
                </div>
              </div>
            </div>
          </div>
          <div id="font-card-container">
            {fonts.map((font, index) => (
              <FontCard key={index} fontName={font.family} author={'Christian Robertson'} sampleText={'The quick brown fox jumped over the lazy dog.'} />
            ))}
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

// <div id="font-card-container">

// </div>

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
