import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";

function Projects() {
  const projectsData = [
    {
      image: "/P1.png",
      projectName: "Portfolio Website",
      projectLink: "https://v2.lohitkolluri.tech",
      projectDescription:
        "This Portfolio Website is a sleek and user-friendly platform, powered by Vite.js and React. With sections like Home, About, Work, Contact, and Resume, it seamlessly showcases Lohit's projects, skills, and background. The responsive design ensures an optimal viewing experience across devices, inviting visitors to explore and connect.",
      projectTech: ["React", "Vite.Js", "Three.Js", "Microsoft Azure", "TailwindCSS"],
      projectExternalLinks: {
        github: "https://github.com/lohitkolluri/Portfolio-Website",
        externalLink: "https://v2.lohitkolluri.tech",
      },
    },
    {
      image: "/P2.png",
      projectName: "Mental Health Tracker",
      projectLink: "https://github.com/lohitkolluri/mental_health_fitness_tracker/blob/master/mental_health_tracker.pdf",
      projectDescription:
        "The Mental Health Fitness Tracker project focuses on analyzing and predicting mental fitness levels of individuals from various countries with different mental disorders. It utilizes regression techniques to provide insights into mental health and make predictions based on the available data.",
      projectTech: ["Numpy", "Matplotlib", "Scikit-learn", "XGBoost", "Seaborn"],
      projectExternalLinks: {
        github: "https://github.com/lohitkolluri/mental_health_fitness_tracker",
        externalLink:
          "https://github.com/lohitkolluri/mental_health_fitness_tracker/blob/master/mental_health_tracker.pdf",
      },
    },
    {
      image: "/P3.png",
      projectName: "Compile Vortex",
      projectLink: "https://code.lohitkolluri.tech",
      projectDescription:
        "A web-based code editor that allows you to compile and run your code in over 40 programming languages. You can also customize your coding environment by choosing from a selection of available themes.",
      projectTech: ["React", "Node.js", "Judge0 Api", "Microsoft Azure", "TailwindCSS"],
      projectExternalLinks: {
        github: "https://github.com/lohitkolluri/CompileVortex",
        externalLink: "https://code.lohitkolluri.tech",
      },
    },
  ];
  
  return (
    <div className="projects" id="work">
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
                    <Image src={image} fill alt={projectName} quality={100} />
                  </div>
                </div>
                <div className="project-info">
                  <p className="project-info-overline">Featured Project</p>
                  <h3 className="project-info-title">{projectName}</h3>
                  <div className="project-info-description">
                    <p>{projectDescription}</p>
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
                      <Link
                        href={projectExternalLinks.github}
                        className="project-info-links-item-link"
                      >
                        <FiGithub />
                      </Link>
                    </li>
                    <li className="project-info-links-item">
                      <Link
                        href={projectExternalLinks.externalLink}
                        className="project-info-links-item-link"
                      >
                        <FiExternalLink />
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
