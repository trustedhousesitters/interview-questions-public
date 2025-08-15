import React from "react";
import "./SearchFilter.css";

const SearchFilter = ({
  query,
  onQueryChange,
  typeOptions,
  typeValue,
  onTypeChange,
}) => {
  return (
    <div className="SF-wrap" role="region" aria-label="Search and filter">
      <label className="SF-field">
        <span className="SF-label">Search</span>
        <input
          className="SF-input"
          type="search"
          placeholder="Search by name or type…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Search pets"
        />
      </label>

      <label className="SF-field">
        <span className="SF-label">Type</span>
        <select
          className="SF-select"
          value={typeValue}
          onChange={(e) => onTypeChange(e.target.value)}
          aria-label="Filter by type"
        >
          {typeOptions.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SearchFilter;
