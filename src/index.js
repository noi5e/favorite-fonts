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

  console.log(fonts)

  return (
    <div>
      {fonts ? (
        <ul>
          {fonts.map((font, index) => (
            <li key={index}>
              {font.family}
            </li>
          ))}
        </ul>
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
