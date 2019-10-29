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

  // <ul>
  //   {fonts.map(font => (
  //     <li key={font.index}>
  //       {font.name}
  //     </li>
  //   ))}
  // </ul>

  console.log(fonts)

  return (
    <div>
      {fonts ? (
        // "Fonts are here!"
        <ul>
          {fonts.map((font, index) => (
            <li key={index}>
              {font.name}
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
