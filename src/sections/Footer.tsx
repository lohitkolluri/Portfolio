import { useEffect, useState } from 'react';

function Footer() {
  const [githubInfo, setGitHubInfo] = useState({
    stars: null,
    forks: null,
  });

  useEffect(() => {
    // Fetch GitHub information here and update state
    // Example using GitHub API:
    // fetch('https://api.github.com/repos/lohitkolluri/your-repo')
    //   .then(response => response.json())
    //   .then(data => setGitHubInfo({ stars: data.stargazers_count, forks: data.forks_count }));
  }, []);

  return (
    <footer>
      <a
        href="https://github.com/lohitkolluri/Portfolio"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-link"
      >
        <span className="footer-info">View on GitHub</span>
      </a>
      {githubInfo.stars !== null && (
        <span className="footer-icon">
          {/* Display stars */}
          {githubInfo.stars}
        </span>
      )}
      {githubInfo.forks !== null && (
        <span className="footer-icon">
          {/* Display forks */}
          {githubInfo.forks}
        </span>
      )}
    </footer>
  );
}

export default Footer;
