import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { Provider } from 'react-redux';
import store from './redux/store';

import App from './pages/App.jsx';
import FontCardContainer from './pages/FontCardContainer.jsx';
import Header from './pages/Header.jsx';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
