import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';

interface AboutText {
  intro: string;
  experience: string;
}

const mobileText: AboutText = {
  intro:
    'Hey there! I\'m Lohit Kolluri, a DevOps-first Full Stack Developer passionate about cloud-native systems and intelligent automation.',
  experience:
    'Currently pursuing B.Tech at SRM Institute of Science and Technology, I\'ve built scalable architectures at Apollo Tyres R&D, supporting 200+ concurrent simulations with 40% performance boost.',
};

const desktopText: AboutText = {
  intro:
    'Hey there! I\'m Lohit Kolluri, a DevOps-first Full Stack Developer with a keen interest in cloud-native systems and intelligent automation. I specialize in building scalable infrastructures, optimizing CI/CD pipelines, and integrating ML systems into robust production environments.',
  experience:
    'Currently pursuing a B.Tech in Computer Science Engineering at SRM Institute of Science and Technology, I bring hands-on experience with tools and platforms across the DevOps, Cloud, and ML stack. At Apollo Tyres R&D, I built a scalable backend architecture using Django and PostgreSQL to support 200+ concurrent simulations, increasing performance by 40%. I also automated simulation task queues and delivered real-time dashboards with Chart.js for 300+ engineering projects. I\'ve deployed cloud-native applications using Docker, Kubernetes, and serverless technologies like Vercel and AWS Lambda. My projects include an NLP-to-SQL Converter, and FlaskPost, a mass mailer SaaS with serverless backend that cut infrastructure costs while boosting engagement.',
};

const technologies = [
  'Docker',
  'Kubernetes',
  'FastAPI',
  'Azure',
  'PostgreSQL',
  'React.js'
];

const variants = {
  visible: { opacity: 1, y: -50 },
  hidden: { opacity: 0, y: 0 },
};

function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const [isMobile, setIsMobile] = useState(false);

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, [checkMobile]);

  useEffect(() => {
    console.log('Element is in view: ', isInView);
  }, [isInView]);

  return (
    <motion.div
      className="about pt-[150px] md:pt-[250px]"
      id="about"
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      variants={variants}
    >
      <div className="title">
        <h2>About Me</h2>
      </div>
      <div className="about-grid">
        <div className="about-grid-info">
          <p className="about-grid-info-text text-justify text-base md:text-lg leading-relaxed">
            {isMobile ? mobileText.intro : desktopText.intro}
          </p>
          <p className="about-grid-info-text text-justify text-base md:text-lg leading-relaxed indent-4">
            {isMobile ? mobileText.experience : desktopText.experience}
          </p>
          <p className="about-grid-info-text text-justify">
            Here are a few technologies I&apos;ve been working with recently:
          </p>

          <ul className="about-grid-info-list">
            {technologies.map((tech) => (
              <li key={tech} className="about-grid-info-list-item">
                {tech}
              </li>
            ))}
          </ul>
        </div>
        <div className="about-grid-photo">
          <div className="overlay"></div>
          <div className="overlay-border"></div>
          <div className="about-grid-photo-container">
            <Image
              src="/etc/image.jpeg"
              alt="Lohit Kolluri - DevOps & Full Stack Developer"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              objectFit="cover"
              className="rounded-lg"
              aria-label="Profile picture of Lohit Kolluri"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default About;
