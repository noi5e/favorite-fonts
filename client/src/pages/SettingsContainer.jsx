import React from "react";
import { connect } from "react-redux";

import {
  updateFontSize,
  updateSampleText,
  updateSearchTerm
} from "../redux/actions";

const SettingsContainer = ({
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
        placeholder="Search fonts..."
        onChange={e => updateSearchTerm(e.target.value)}
      />
      <input
        id="sample-text-input"
        type="text"
        aria-label="enter sample text"
        className="form-control"
        placeholder="Type something!"
        onChange={e => updateSampleText(e)}
      />
      <select
        id="font-size-select"
        defaultValue="40px"
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
  sampleText: state.sampleText
});

const mapDispatchToProps = {
  updateSampleText,
  updateFontSize,
  updateSearchTerm
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
