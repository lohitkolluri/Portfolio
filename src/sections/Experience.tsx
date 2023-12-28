import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
function Experience() {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const transformSelected = () => {
      const underline = document.querySelector<HTMLElement>(".underline");
      underline!.style.top = `${selected * 2.5}rem`;
    };
    transformSelected();
  }, [selected]);

  const expereinces = [
    {
      name: "EduSkill Foundation",
      role: "AI/ML Internship",
      url: "https://www.rapidops.com",
      start: "September 2023",
      end: "November 2023",
      shortDescription: [
        "Acquired hands-on knowledge of AWS Cloud Foundation, delving into cloud infrastructure, services, and deployment.",
        "Gained a solid foundation in Machine Learning, covering topics like algorithms, data analysis, and model building.",
      ],
    },
    {
      name: "Mathwork",
      role: "Virtual Intern",
      url: "https://www.mathwork.com",
      start: "May 2023",
      end: "September 2023",
      shortDescription: [
        "Completed virtual internship, gaining a strong foundation in MATLAB, including data analysis and processing.",
        "Acquired practical skills in image and signal processing, including segmentation, batch processing, and spectral analysis.",
        "Developed expertise in machine learning models for clustering, classification, and regression, and customized deep learning techniques for image classification.",
      ],
    },
    {
      name: "Edunet Foundation",
      role: "Artificial Intelligence Intern",
      url: "https://www.edunetfoundation.org",
      start: "June 2023",
      end: "July 2023",
      shortDescription: [
        "Engineered a comprehensive Mental Health Fitness Tracker ML model utilizing Python and scikit-learn.",
        "Maximized the model's performance by refining model parameters and employing ensemble methods, yielding an outstanding accuracy percentage of 98.50%.",
        "Leveraged 12 regression algorithms to attain precise outcomes in analyzing and predicting mental fitness levels across 150+ countries.",
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
          {expereinces.map((expereince, index) => {
            return (
              <li
                className={`exp-slider-item ${
                  index === selected && "exp-slider-item-selected"
                }`}
                onClick={() => setSelected(index)}
                key={expereince.name}
              >
                <span>{expereince.name}</span>
              </li>
            );
          })}
        </ul>
        <div className="exp-details">
          <div className="exp-details-position">
            <h3>
              <span>{expereinces[selected].role}</span>
              <span className="exp-details-position-company">
                &nbsp;@&nbsp;
                <Link href={expereinces[selected].url} className="link">
                  {expereinces[selected].name}
                </Link>
              </span>
            </h3>
            <p className="exp-details-range">
              {expereinces[selected].start} - {expereinces[selected].end}
            </p>
            <ul className="exp-details-list">
              {expereinces[selected].shortDescription.map(
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
