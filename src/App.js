import React, { useState, useEffect } from "react";
import SearchForm from "./components/SearchForm";
import Repository from "./components/Repository";
import CommitsModal from "./components/CommitsModal";
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
  const [repositories, setRepositories] = useState([]);
  const [commits, setCommits] = useState([]);
  const [search, setSearch] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // hook to render page upon refresh
  useEffect(() => {
    fetchRepositories();
  }, []);

  // function to fetch repositories
  const fetchRepositories = async () => {
  if (search === "") {
    // If search is empty, set repositories to an empty array and return
    setRepositories([]);
    return;
  }

  setIsLoading(true);
  try {
    const response = await fetch(`https://api.github.com/orgs/${search}/repos`);
    const data = await response.json();
    if (response.ok) {
      const sortedData = data.sort(
        (a, b) => b.stargazers_count - a.stargazers_count
      );
      setRepositories(sortedData);
    } else {
      setRepositories([]);
    }
  } catch (error) {
    console.log("Error fetching repositories:", error);
    setRepositories([]);
  }
  setIsLoading(false);
};

  // function to fetch commits
  const fetchCommits = async (orgName, repoName) => {
    setIsLoading(true);
    try {
      // fetch api and sort by date
      const response = await fetch(
        `https://api.github.com/repos/${orgName}/${repoName}/commits`
      );
      const data = await response.json();
      const sortedData = data.sort(
        (a, b) =>
          new Date(b.commit.committer.date) - new Date(a.commit.committer.date)
      );
      setCommits(sortedData);
      setModalIsOpen(true);
    } catch (error) {
      console.log("Error fetching commits:", error);
    }
    setIsLoading(false);
  };

  const handleRepoClick = (orgName, repoName) => {
    setSelectedRepo(repoName);
    fetchCommits(orgName, repoName);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <h1>Search for a GitHub organization</h1>
      <SearchForm search={search} setSearch={setSearch} fetchRepositories={fetchRepositories} />
      {isLoading && <p>Loading...</p>}
      <div>
        <h2>{search} Repositories</h2>
        {repositories.map((repo) => (
          <Repository
            key={repo.id}
            repo={repo}
            handleRepoClick={() => handleRepoClick(search, repo.name)}
          />
        ))}
      </div>
      <CommitsModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        selectedRepo={selectedRepo}
        commits={commits}
      />
    </div>
  );
}

export default App;
