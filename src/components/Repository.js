import React from "react";
import PropTypes from "prop-types";

const Repository = ({ repo, handleRepoClick }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <div key={repo.id} className="repository-item">
      <h3>{repo.name}</h3>
      <p>
        <strong>Language:</strong> {repo.language}
      </p>
      <p>
        <strong>Description:</strong> {repo.description}
      </p>
      <p>
        <strong>Star Count:</strong> {repo.stargazers_count}
      </p>
      <p>
        <strong>Fork Count:</strong> {repo.forks_count}
      </p>
      <p>
        <strong>Date Created:</strong> {formatDate(repo.created_at)}
      </p>
      <button onClick={() => handleRepoClick(repo.name)}>View Commits</button>
    </div>
  );
};

Repository.propTypes = {
  repo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    language: PropTypes.string,
    description: PropTypes.string,
    stargazers_count: PropTypes.number.isRequired,
    forks_count: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
  handleRepoClick: PropTypes.func.isRequired,
};

export default Repository;
