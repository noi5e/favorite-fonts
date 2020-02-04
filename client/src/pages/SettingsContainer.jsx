import React from 'react';

const SettingsContainer = props => {
  return (
    <div id="search-tools" className="input-group">
      <input id="search-input" type="search" aria-label="search fonts" className="form-control" placeholder="Search fonts..." />
      <input id="sample-text-input" type="text" aria-label="enter sample text" className="form-control" placeholder="Type something!" />
      <select id="font-size-select" defaultValue="24px" className="custom-select">
        <option value="24px">24px</option>
        <option value="40px">40px</option>
        <option value="64px">64px</option>
        <option value="96px">96px</option>
      </select>
      <div className="input-group-append">
        <button id="reset-button" className="btn btn-outline-secondary" type="button"><i className="fas fa-sync-alt"></i></button>
      </div>
    </div>
  );
};

export default SettingsContainer;
