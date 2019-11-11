import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function FontsContainer() {
  const [fonts, setFonts] = useState([]);

  useEffect(() => {
    const fetchFonts = async() => {
      const result = await axios('/api/get_all_fonts');
      setFonts(result.data);
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
            <div className="font-card">
              <i className="far fa-heart like-button"></i>
              <div className="font-name">Roboto</div>
              <div className="font-author">Christian Robertson</div>
              <div className="sample-text">She stared through the window at the stars.</div>
            </div>
            <div className="font-card">
              <i className="far fa-heart like-button"></i>
              <div className="font-name">Jomolhari</div>
              <div className="font-author">Christopher J. Flynn</div>
              <div className="sample-text">The recorded voice scratched in the speaker.</div>
            </div>
            <div className="font-card">
              <i className="far fa-heart like-button"></i>
              <div className="font-name">McLaren</div>
              <div className="font-author">Astigmatic</div>
              <div className="sample-text">The sky was cloudless and of a deep dark blue.</div>
            </div>
            <div className="font-card">
              <i className="far fa-heart like-button"></i>
              <div className="font-name">Open Sans</div>
              <div className="font-author">Steve Matteson</div>
              <div className="sample-text">Almost before we knew it, we had left the ground.</div>
            </div>
            <div className="font-card">
              <i className="far fa-heart like-button"></i>
              <div className="font-name">Lato</div>
              <div className="font-author">Łukasz Dziedzic</div>
              <div className="sample-text">A shining crescent far beneath the flying vessel.</div>
            </div>
            <div className="font-card">
              <i className="far fa-heart like-button"></i>
              <div className="font-name">Staatliches</div>
              <div className="font-author">Brian LaRossa, Erica Carras</div>
              <div className="sample-text">It was going to be a lonely trip back.</div>
            </div>
            <div className="font-card">
              <i className="far fa-heart like-button"></i>
              <div className="font-name">Montserrat</div>
              <div className="font-author">Julieta Ulanovsky, Sol Matas, Juan Pablo del Peral, Jacques Le Bailly</div>
              <div className="sample-text">Mist enveloped the ship three hours out from port.</div>
            </div>
            <div className="font-card">
              <i className="far fa-heart like-button"></i>
              <div className="font-name">Roboto Condensed</div>
              <div className="font-author">Christian Robertson</div>
              <div className="sample-text">My two natures had memory in common.</div>
            </div>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

ReactDOM.render(
  <FontsContainer />,
  document.getElementById('app')
);
