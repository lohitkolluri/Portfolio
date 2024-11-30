import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

function Experience() {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const transformSelected = () => {
      const underline = document.querySelector<HTMLElement>(".underline");
      underline!.style.top = `${selected * 2.5}rem`;
    };
    transformSelected();
  }, [selected]);

  const experiences = [
    {
      name: "EduSkill Foundation",
      role: "AI Intern",
      url: "https://www.eduskillsfoundation.org",
      start: "September 2023",
      end: "November 2023",
      shortDescription: [
        "Acquired hands-on knowledge of AWS Cloud Foundation, delving into cloud infrastructure, services, and deployment.",
        "Gained a solid foundation in Machine Learning, covering topics like algorithms, data analysis, and model building.",
      ],
    },
    {
      name: "MathWorks",
      role: "Virtual Intern",
      url: "https://www.mathworks.com",
      start: "May 2023",
      end: "September 2023",
      shortDescription: [
        "Completed advanced courses in utilizing AI tools provided by MathWorks.",
        "Gained proficiency in data analysis, model development, and AI tools like MATLAB.",
        "Specialized in machine learning models for clustering, classification, and deep learning techniques for image classification.",
      ],
    },
    {
      name: "Edunet Foundation",
      role: "AI Intern",
      url: "https://www.edunetfoundation.org",
      start: "June 2023",
      end: "July 2023",
      shortDescription: [
        "Developed a precise Mental Health Fitness Tracker using Python and scikit-learn.",
        "Improved model accuracy to 98.5% through feature engineering and ensemble methods.",
        "Utilized 12 regression algorithms for mental fitness analysis across 150+ countries.",
      ],
    },
    {
      name: "Apollo Tyres Ltd",
      role: "Project Trainee",
      url: "https://www.apollotyres.com/",
      start: "February 2024",
      end: "May 2024",
      shortDescription: [
        "Worked on a 4-month industrial project focused on Automation in Simulation and Data Management.",
        "Collaborated with a talented team to develop innovative solutions for tyre simulation and data management.",
      ],
    },
  ];

  return (
    <motion.div
      className="experience"
      id="experience"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      variants={{
        visible: { opacity: 1, y: -50 },
        hidden: { opacity: 0, y: 0 },
      }}
    >
      <div className="title">
        <h2>Where I&apos;ve Worked</h2>
      </div>
      <div className="container">
        <ul className="exp-slider">
          <div className="underline"></div>
          {experiences.map((experience, index) => (
            <li
              className={`exp-slider-item ${index === selected ? "exp-slider-item-selected" : ""}`}
              onClick={() => setSelected(index)}
              key={`${experience.name}-${index}`}
            >
              <span>{experience.name}</span>
            </li>
          ))}
        </ul>
        <div className="exp-details">
          <div className="exp-details-position">
            <h3>
              <span>{experiences[selected].role}</span>
              <span className="exp-details-position-company">
                &nbsp;@&nbsp;
                <Link href={experiences[selected].url} legacyBehavior>
                  <a target="_blank" rel="noopener noreferrer" className="link">
                    {experiences[selected].name}
                  </a>
                </Link>
              </span>
            </h3>
            <p className="exp-details-range">
              {experiences[selected].start} - {experiences[selected].end}
            </p>
            <ul className="exp-details-list">
              {experiences[selected].shortDescription.map(
                (description, index) => (
                  <li key={index} className="exp-details-list-item">
                    {description}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Experience;
