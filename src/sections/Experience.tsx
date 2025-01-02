import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function Experience() {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const transformSelected = () => {
      const underline = document.querySelector<HTMLElement>('.underline');
      underline!.style.top = `${selected * 2.5}rem`;
    };
    transformSelected();
  }, [selected]);

  const experiences = [
    {
      name: 'Apollo Tyres R&D',
      role: 'Project Trainee',
      url: 'https://www.apollotyres.com/',
      start: 'February 2024',
      end: 'May 2024',
      shortDescription: [
        'Architected a robust backend using Django and PostgreSQL to handle over 200 concurrent simulations, resulting in a 40% improvement in system performance and data retrieval efficiency.',
        'Designed and implemented an interactive dashboard utilizing Chart.js, allowing managers to monitor job assignments and completion rates; enabled tracking of individual engineer performance across 300+ projects in real time.',
        'Streamlined task management for a system handling over 1,000 tasks daily.',
        'Developed a web application that optimized the simulation workflow for Apollo Tyres, enhancing task allocation efficiency by approximately 30%.',
      ],
    },
    {
      name: 'EduSkill Foundation',
      role: 'Artificial Intelligence Intern',
      url: 'https://www.eduskillsfoundation.org',
      start: 'September 2023',
      end: 'November 2023',
      shortDescription: [
        'Completed AWS Machine Learning and AWS Cloud Practitioner courses, gaining proficiency in deploying and scaling ML models on AWS services such as S3, Elastic Container Service, and Lambda.',
        'Acquired cloud computing skills, including cloud security, architecture, and networking in the AWS ecosystem.',
      ],
    },
    {
      name: 'MathWorks',
      role: 'Virtual Intern',
      url: 'https://www.mathworks.com',
      start: 'May 2023',
      end: 'September 2023',
      shortDescription: [
        'Completed advanced courses in utilizing AI tools provided by MathWorks.',
        'Gained proficiency in data analysis, model development, and AI tools like MATLAB.',
        'Specialized in machine learning models for clustering, classification, and deep learning techniques for image classification.',
      ],
    },
    {
      name: 'Edunet Foundation',
      role: 'AI Intern',
      url: 'https://www.edunetfoundation.org',
      start: 'June 2023',
      end: 'July 2023',
      shortDescription: [
        'Developed a precise Mental Health Fitness Tracker using Python and scikit-learn.',
        'Improved model accuracy to 98.5% through feature engineering and ensemble methods.',
        'Utilized 12 regression algorithms for mental fitness analysis across 150+ countries.',
      ],
    },
  ];

  return (
    <motion.div
      className="experience"
      id="experience"
      style={{ paddingTop: '250px' }}
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
              className={`exp-slider-item ${index === selected ? 'exp-slider-item-selected' : ''}`}
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
              {experiences[selected].shortDescription.map((description, index) => (
                <li key={index} className="exp-details-list-item">
                  {description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Experience;
