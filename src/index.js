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
  }, [fonts]);

  // {fonts.map((item, index) => (
  //   <li key={item.index}>
  //     {item.name}
  //   </li>
  // ))}

  return (
    <div>
      {fonts ? (
        Fonts are here!
      ) : (
        Loading...
      )}
    </div>
  );
}

ReactDOM.render(
  <FontsContainer />,
  document.getElementById('app')
);
