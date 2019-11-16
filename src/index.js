import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

// import { Provider } from 'react-redux';
// import store from './redux/store';

import Main from './components/container/Main.jsx';
import FontCard from './components/presentational/FontCard.jsx';

function App() {
  const [fonts, setFonts] = useState([]);

  useEffect(() => {
    const fetchFonts = async() => {
      const result = await axios('/api/get_all_fonts');
      setFonts(result.data.slice(0, 8));
    }

    fetchFonts();
  }, []);

  return (
    <Main fonts={fonts} />
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
