import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

function Experience() {
  const [selected, setSelected] = useState(0);
  const [mounted, setMounted] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Scroll timeline to selected item on mobile
    if (timelineRef.current && window.innerWidth <= 768) {
      const container = timelineRef.current;
      const selectedItem = container.querySelector(`.timeline-item-${selected}`);
      if (selectedItem) {
        container.scrollTo({
          left: (selectedItem as HTMLElement).offsetLeft - 20,
          behavior: 'smooth'
        });
      }
    }
  }, [selected, mounted]);

  const experiences = [
    {
      name: 'Microsoft Learn Student Ambassadors SRM',
      role: 'Secretary',
      url: 'https://mlsasrm.in/',
      start: 'September 2023',
      end: 'Present',
      color: '#bb86fc', // Primary color
      icon: '💻',
      shortDescription: [
        'Developed and deployed "Atlas Bot," a custom Discord bot enhancing community engagement and automating administrative tasks for student members.',
        'Optimized the official website, implementing modern web technologies and best practices for improved user experience.',
        'Orchestrated technical workshops and hands-on training sessions focusing on Web Development, UI/UX, and more.',
        'Collaborated with team members to organize and execute community events, fostering a dynamic learning environment.',
      ],
    },
    {
      name: 'Apollo Tyres R&D',
      role: 'Project Trainee',
      url: 'https://www.apollotyres.com/',
      start: 'February 2024',
      end: 'May 2024',
      color: '#03dac6', // Secondary color
      icon: '🔧',
      shortDescription: [
        'Architected a robust backend using Django and PostgreSQL to handle over 200 concurrent simulations, resulting in a 40% improvement in system performance and data retrieval efficiency.',
        'Designed and implemented an interactive dashboard utilizing Chart.js, allowing managers to monitor job assignments and completion rates; enabled tracking of individual engineer performance across 300+ projects in real time.',
        'Streamlined task management for a system handling over 1,000 tasks daily.',
        'Developed a web application that optimized the simulation workflow for Apollo Tyres, enhancing task allocation efficiency by approximately 30%.',
      ],
    },
    {
      name: 'Social Winter of Code',
      role: 'Open Source Contributor',
      url: 'https://www.socialwinterofcode.com/',
      start: 'October 2023',
      end: 'March 2024',
      color: '#cf6679', // Error color
      icon: '🧩',
      shortDescription: [
        'Recognized as a Top Contributor (Under 60) for outstanding open-source contributions, earning exclusive swags including T-shirts and stickers.',
        'Developed and improved features for multiple open-source projects using modern technologies.',
        'Consistently delivered high-quality code contributions, leading to recognition from project maintainers.',
        'Built strong relationships within the open-source community through active participation and quality contributions.',
      ],
    },
    {
      name: 'EduSkills Foundation',
      role: 'AI Intern',
      url: 'https://www.eduskillsfoundation.org',
      start: 'September 2023',
      end: 'November 2023',
      color: '#bb86fc', // Primary color
      icon: '☁️',
      shortDescription: [
        'Completed comprehensive AWS certification training, mastering deployment of ML models on AWS services (S3, ECS, Lambda).',
        'Developed and deployed scalable cloud solutions, implementing best practices in security and architecture.',
        'Gained hands-on experience with cloud security, networking, and infrastructure management.',
        'Acquired cloud computing skills through AWS Machine Learning and AWS Cloud Practitioner courses.',
      ],
    },
    {
      name: 'MathWorks',
      role: 'Virtual Intern',
      url: 'https://www.mathworks.com',
      start: 'May 2023',
      end: 'September 2023',
      color: '#03dac6', // Secondary color
      icon: '📊',
      shortDescription: [
        'Completed advanced courses in AI tools and technologies provided by MathWorks.',
        'Developed proficiency in MATLAB for data analysis and model development.',
        'Applied machine learning concepts to solve real-world engineering problems.',
        'Specialized in machine learning models for clustering, classification, and deep learning techniques for image classification.',
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

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

      {/* Timeline for all devices */}
      <div className="timeline-container" ref={timelineRef}>
        {experiences.map((experience, index) => (
          <motion.div
            key={`timeline-${index}`}
            className={`timeline-item timeline-item-${index} ${index === selected ? 'timeline-selected' : ''}`}
            onClick={() => setSelected(index)}
            whileHover={{ y: -5 }}
            style={{ 
              borderColor: index === selected ? experience.color : 'var(--dark-slate)',
              boxShadow: index === selected ? `0 4px 20px rgba(0,0,0,0.3)` : 'var(--elevation-1)'
            }}
          >
            <div className="timeline-icon" style={{ backgroundColor: experience.color }}>
              {experience.icon}
            </div>
            <div className="timeline-content">
              <h3>{experience.name}</h3>
              <p className="timeline-date">{experience.start} - {experience.end}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Experience Card */}
      <motion.div
        className="experience-card md-card"
        key={selected}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="experience-header"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="experience-title-container" variants={itemVariants}>
            <div className="experience-title-badge" style={{ backgroundColor: experiences[selected].color }}>
              {experiences[selected].icon}
            </div>
            <div>
              <h3 className="experience-title">
                {experiences[selected].role}
                <span className="experience-company">
                  &nbsp;@&nbsp;
                  <Link href={experiences[selected].url} legacyBehavior>
                    <a target="_blank" rel="noopener noreferrer" className="link">
                      {experiences[selected].name}
                    </a>
                  </Link>
                </span>
              </h3>
              <p className="experience-date">
                {experiences[selected].start} - {experiences[selected].end}
              </p>
            </div>
          </motion.div>
          
          <motion.div className="experience-content" variants={containerVariants}>
            {experiences[selected].shortDescription.map((description, index) => (
              <motion.div
                key={index}
                className="experience-item"
                variants={itemVariants}
                custom={index}
                whileHover={{ x: 5 }}
              >
                <div className="experience-item-bullet" style={{ backgroundColor: experiences[selected].color }}></div>
                <p>{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Experience;
