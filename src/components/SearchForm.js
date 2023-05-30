import React from "react";
import PropTypes from "prop-types";

const SearchForm = ({ search, setSearch, fetchRepositories }) => {
  const handleSubmit = (e) => {
    // cancel default action
    e.preventDefault();
    fetchRepositories();
  };

  return (
    <div className="search-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="githubOrgSearch">
            Search for GitHub organization
          </label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="search-input"
            id="githubOrgSearch"
            aria-describedby="githubOrgSearch"
            placeholder="Search for a GitHub Organization"
          />
        </div>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
};

SearchForm.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  fetchRepositories: PropTypes.func.isRequired,
};

export default SearchForm;
