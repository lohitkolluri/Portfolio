import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import React from 'react';
import Button from '../components/Button';
import repositories from '../utils/OtherProjectsProp';

const OtherProjects: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  const techListVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <section className="projects-section">
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
        <h2>Some Things I&apos;ve Built</h2>
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
            custom={index}
          >
            <h3>
              <Github className="icon" /> {repo.name}
            </h3>
            <p>{repo.description || 'No description provided.'}</p>
            <div className="tech-list">
              {repo.language.slice(0, 3).map((lang, index) => (
                <motion.span key={index} variants={techListVariants}>
                  {lang}
                </motion.span>
              ))}
              {repo.language.length > 3 && <span>+{repo.language.length - 3} more</span>}
            </div>
            <div className="links">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Link"
              >
                <Github />
              </a>
              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live Site"
                >
                  <ExternalLink />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="button-container" style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button
          className="styled-button"
          text="View More"
          link="https://github.com/lohitkolluri"
          aria-label="View more projects on GitHub"
        />
      </div>
    </section>
  );
};

export default OtherProjects;
