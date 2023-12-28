import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FiGitBranch } from "react-icons/fi";

function Footer() {
  const [githubInfo, setGitHubInfo] = useState({
    stars: null,
    forks: null,
  });

  return (
    <footer>
      <Link
        href="https://github.com/lohitkolluri"
        target="_blank"
        className="footer-link"
      >
        <span className="footer-info">Draven</span>
      </Link>
    </footer>
  );
}

export default Footer;
