import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function Projects() {
  const projectsData = [
    {
      image: '/projects/project1.webp',
      projectName: 'NLP2SQL',
      projectLink: 'https://nlp2sql.streamlit.app/',
      projectDescription:
        'A natural language to SQL query converter that transforms text input into structured SQL queries for database execution, streamlining database interactions through intuitive language processing.',
      projectTech: ['Streamlit', 'Azure OpenAI', 'SQLite3', 'Altair'],
      projectExternalLinks: {
        github: 'https://github.com/lohitkolluri/NLP2SQL',
        externalLink: 'https://nlp2sql.streamlit.app/',
      },
    },
    {
      image: '/projects/project2.webp',
      projectName: 'FlaskPost',
      projectLink: 'https://flask-post.vercel.app/',
      projectDescription:
        'A FastAPI-powered mass email platform featuring SMTP configuration, CSV recipient management, and HTML template customization with live preview functionality.',
      projectTech: ['FastAPI', 'REST API', 'Jinja2', 'Fast Mail'],
      projectExternalLinks: {
        github: 'https://github.com/lohitkolluri/FlaskPost',
        externalLink: 'https://github.com/lohitkolluri/FlaskPost',
      },
    },
    {
      image: '/projects/project3.webp',
      projectName: 'Compile Vortex',
      projectLink: 'https://compile-vortex.vercel.app/',
      projectDescription:
        'A web-based code editor supporting 40+ programming languages with customizable themes and real-time compilation capabilities.',
      projectTech: ['React', 'Node.js', 'Judge0 Api', 'Microsoft Azure'],
      projectExternalLinks: {
        github: 'https://github.com/lohitkolluri/CompileVortex',
        externalLink: 'https://compile-vortex.vercel.app/',
      },
    },
  ];

  return (
    <div id="work" className="projects" style={{ paddingTop: '170px' }}>
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
      <div className="projects-container">
        {projectsData.map(
          ({
            image,
            projectDescription,
            projectLink,
            projectExternalLinks,
            projectName,
            projectTech,
          }) => {
            return (
              <motion.div
                className="project"
                key={projectName}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                variants={{
                  visible: { opacity: 1, y: -50 },
                  hidden: { opacity: 0, y: 0 },
                }}
              >
                <div className="project-image" onClick={() => window.open(projectLink, '_blank')}>
                  <div className="project-image-overlay"></div>
                  <div className="project-image-container">
                    <Image src={image} fill loading="lazy" alt={projectName} quality={100} />
                  </div>
                </div>
                <motion.div
                  className="project-info"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="project-info-title">
                    <span
                      className="cursor-pointer"
                      onClick={() => window.open(projectLink, '_blank')}
                    >
                      {projectName}
                    </span>
                  </h3>
                  <div className="project-info-description">
                    <p>{projectDescription}</p>
                  </div>
                  <ul className="project-info-tech-list">
                    {projectTech.map((tech) => (
                      <motion.li
                        className="project-info-tech-list-item"
                        key={tech}
                        whileHover={{ y: -2, color: 'var(--theme-color)' }}
                        transition={{ duration: 0.2 }}
                      >
                        {tech}
                      </motion.li>
                    ))}
                  </ul>
                  <ul className="project-info-links">
                    <motion.li
                      className="project-info-links-item"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={projectExternalLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-info-links-item-link"
                      >
                        <Github />
                      </Link>
                    </motion.li>
                    <motion.li
                      className="project-info-links-item"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={projectExternalLinks.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-info-links-item-link"
                      >
                        <ExternalLink />
                      </Link>
                    </motion.li>
                  </ul>
                </motion.div>
              </motion.div>
            );
          },
        )}
      </div>
    </div>
  );
}

export default Projects;
