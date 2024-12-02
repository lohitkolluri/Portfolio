import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink, FiGithub } from "react-icons/fi";

function Projects() {
  const projectsData = [
    {
      image: "/projects/project1.png",
      projectName: "NLP2SQL",
      projectLink: "https://nlp2sql.streamlit.app/",
      projectDescription:
        "NLP2SQL is an NLP task that aims to generate SQL queries from natural language text. It involves converting text input into a structured format to create a semantically correct SQL query for database execution.",
      projectTech: ["Streamlit", "Azure OpenAI", "SQLite3", "Pandas", "Altair"],
      projectExternalLinks: {
        github: "https://github.com/lohitkolluri/NLP2SQL",
        externalLink: "https://nlp2sql.streamlit.app/",
      },
    },
    {
      image: "/projects/project2.png",
      projectName: "FlaskPost",
      projectLink: "https://flask-post.vercel.app/",
      projectDescription:
        "FlaskPost is a powerful and user-friendly web application designed for sending personalized mass emails effortlessly. Built with FastAPI it allows users to configure SMTP settings upload CSV files for recipient management and craft customized HTML email templates. With a sleek interface that includes an integrated HTML editor and a live preview feature FlaskPost ensures a seamless email creation experience. Whether for marketing campaigns newsletters or event invitations FlaskPost empowers users to reach their audience effectively while maintaining a professional touch.",
      projectTech: ["FastAPI", "REST API", "Jinja2", "Fast Mail", "HTML", "CSS", "JS"],
      projectExternalLinks: {
        github: "https://github.com/lohitkolluri/FlaskPost",
        externalLink:
          "https://github.com/lohitkolluri/FlaskPost",
      },
    },
    {
      image: "/projects/project3.webp",
      projectName: "Compile Vortex",
      projectLink: "https://compile-vortex.vercel.app/",
      projectDescription:
        "A web-based code editor that allows you to compile and run your code in over 40 programming languages. You can also customize your coding environment by choosing from a selection of available themes.",
      projectTech: ["React", "Node.js", "Judge0 Api", "Microsoft Azure", "TailwindCSS"],
      projectExternalLinks: {
        github: "https://github.com/lohitkolluri/CompileVortex",
        externalLink: "https://compile-vortex.vercel.app/",
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
        <h2>Some Things I’ve Built</h2>
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
                <div className="project-image">
                  <div className="project-image-overlay"></div>
                  <div className="project-image-container">
                    <Image src={image} fill loading="lazy" alt={projectName} quality={100} />
                  </div>
                </div>
                <div className="project-info">
                  <p className="project-info-overline">Featured Project</p>
                  <h3 className="project-info-title">{projectName}</h3>
                  <div className="project-info-description">
                    <p style={{ textAlign: "justify" }}>{projectDescription}</p>
                  </div>
                  <ul className="project-info-tech-list">
                    {projectTech.map((tech) => (
                      <li className="project-info-tech-list-item" key={tech}>
                        {tech}
                      </li>
                    ))}
                  </ul>
                  <ul className="project-info-links">
                    <li className="project-info-links-item">
                      <Link href={projectExternalLinks.github} legacyBehavior>
                        <a target="_blank" rel="noopener noreferrer" className="project-info-links-item-link">
                          <FiGithub />
                        </a>
                      </Link>
                    </li>
                    <li className="project-info-links-item">
                      <Link href={projectExternalLinks.externalLink} legacyBehavior>
                        <a target="_blank" rel="noopener noreferrer" className="project-info-links-item-link">
                          <FiExternalLink />
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </motion.div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default Projects;
