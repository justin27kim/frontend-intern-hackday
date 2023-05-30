import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const CommitsModal = ({ modalIsOpen, closeModal, selectedRepo, commits }) => {
  // format date to Month Date, Year
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal-content">
      <h2>Commits for {selectedRepo}</h2>
      {commits.map((commit) => (
        <div className="commit-item" key={commit.sha}>
          <p><strong>Commit Message:</strong> {commit.commit.message}</p>
          <p><strong>Committer Username:</strong> {commit.commit.author.name}</p>
          <p><strong>Commit Hash:</strong> {commit.sha}</p>
          <p><strong>Date Created:</strong> {formatDate(commit.commit.committer.date)}</p>
        </div>
      ))}
      <button onClick={closeModal}>Close</button>
    </Modal>
  );
};

CommitsModal.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  selectedRepo: PropTypes.string.isRequired,
  commits: PropTypes.array.isRequired,
};

export default CommitsModal;
