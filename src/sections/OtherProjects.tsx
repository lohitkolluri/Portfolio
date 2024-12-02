import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import Button from "../components/Button";
import repositories from '../utils/OtherProjectsProp';

// Styled Components
const ProjectsSection = styled.section`
  color: #333;
  padding: 50px 20px;
  font-family: 'Raleway', sans-serif;

  .title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 40px;
    color: #CCD6F6;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin: 0 auto;
    max-width: 1200px;
  }

  .card {
    background-color: var(--light-navy);
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: translateY(-5px);
    }

    h3 {
      font-size: 1.5rem;
      color: #A8B2D1;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }

    p {
      font-size: 1rem;
      color: #A8B2D1;
      margin: 10px 0;
      line-height: 1.4;
      text-align: justify; /* Justify align the description */
    }

    .tech-list {
      margin: 15px 0;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      span {
        background-color: #1E1E1E;
        color: #64FFDA;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.9rem;
      }
    }

    .links {
      margin-top: 15px;
      display: flex;
      gap: 10px;

      a {
        color: #CCD6F6;
        font-size: 1.2rem;
        transition: color 0.3s ease-in-out;

        &:hover {
          color: #3498db;
        }
      }
    }

    .icon {
      margin-right: 8px;
      color: #CCD6F6;
    }
  }
`;

// Styled Button Component
const StyledButton = styled(Button)`
  font-family: 'SF Mono, Roboto Mono, monospace';
  background-color: #3498db;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transform: scale(1.05); // Scale effect on hover
    background-color: #2980b9; // Darker shade on hover
  }
`;

const OtherProjects = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 }, // Staggered effect
    }),
  };

  const techListVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <ProjectsSection>
      <motion.div
        className="title"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        variants={{
          visible: { opacity: 1, y: -50 },
          hidden: { opacity: 0, y: 0 },
        }}
      >
        <h2>Some Things I’ve Built</h2>
      </motion.div>
      <div className="grid">
        {repositories.slice(0, 6).map((repo, index) => (
          <motion.div
            className="card"
            key={repo.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            custom={index} // Pass index for staggered effect
          >
            <h3>
              <FiGithub className="icon" /> {repo.name}
            </h3>
            <p>
              {repo.description || 'No description provided.'}
            </p>
            <div className="tech-list">
              {repo.language.slice(0, 3).map((lang, index) => (
                <motion.span key={index} variants={techListVariants}>
                  {lang}
                </motion.span>
              ))}
              {repo.language.length > 3 && <span>+{repo.language.length - 3} more</span>}
            </div>
            <div className="links">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" aria-label="GitHub Link">
                <FiGithub />
              </a>
              {repo.homepage && (
                <a href={repo.homepage} target="_blank" rel="noopener noreferrer" aria-label="Live Site">
                  <FiExternalLink />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <StyledButton
          text="View More"
          link={`https://github.com/lohitkolluri`}
          aria-label="View more projects on GitHub"
        />
      </div>
    </ProjectsSection>
  );
};

export default OtherProjects;
