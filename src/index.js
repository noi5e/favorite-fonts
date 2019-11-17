import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { Provider } from 'react-redux';
import store from './redux/store';

import Main from './components/container/Main.jsx';

ReactDOM.render(
  <Provider store={store}>
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
      <Main />
    </div>
  </Provider>,
  document.getElementById('app')
);

