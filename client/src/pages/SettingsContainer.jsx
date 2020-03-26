import React from "react";
import { connect } from "react-redux";

import {
  resetFontOptions,
  updateFontSize,
  updateSampleText,
  updateSearchTerm
} from "../redux/actions";

const SettingsContainer = ({
  fontSize,
  resetFontOptions,
  sampleText,
  searchTerm,
  updateSampleText,
  updateSearchTerm,
  updateFontSize
}) => {
  return (
    <div id="search-tools" className="input-group">
      <input
        id="search-input"
        type="search"
        aria-label="search fonts"
        className="form-control"
        value={searchTerm}
        placeholder="Search fonts..."
        onChange={e => updateSearchTerm(e.target.value)}
      />
      <input
        id="sample-text-input"
        type="text"
        aria-label="enter sample text"
        className="form-control"
        placeholder="Type something!"
        value={sampleText === "The quick brown fox jumped over the lazy dog." ? "" : sampleText}
        onChange={e => updateSampleText(e.target.value)}
      />
      <select
        id="font-size-select"
        defaultValue={fontSize}
        onChange={e => updateFontSize(e.target.value)}
        className="custom-select"
      >
        <option value="24px">24px</option>
        <option value="40px">40px</option>
        <option value="64px">64px</option>
        <option value="96px">96px</option>
      </select>
      <div className="input-group-append">
        <button
          onClick={resetFontOptions}
          id="reset-button"
          className="btn btn-outline-secondary"
          type="button"
        >
          <i className="fas fa-sync-alt"></i>
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  fontSize: state.fontSize,
  sampleText: state.sampleText,
  searchTerm: state.searchTerm
});

const mapDispatchToProps = {
  resetFontOptions,
  updateSampleText,
  updateFontSize,
  updateSearchTerm
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
