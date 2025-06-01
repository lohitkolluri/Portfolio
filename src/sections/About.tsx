import { motion, useInView, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';
import { isInViewport } from '@/utils/scrollAnimation';

interface AboutText {
  intro: string;
  experience: string;
}

const mobileText: AboutText = {
  intro:
    'Hey there! I\'m Lohit Kolluri, a DevOps & Cloud Solutions Engineer passionate about building scalable, reliable systems with expertise in cloud-native technologies.',
  experience:
    'Currently pursuing B.Tech at SRM Institute of Science and Technology, I\'ve architected robust backend systems at Apollo Tyres R&D, delivering 40% performance improvements and building interactive dashboards for 300+ projects.',
};

const desktopText: AboutText = {
  intro:
    'Hey there! I\'m Lohit Kolluri, a DevOps & Cloud Solutions Engineer passionate about cloud-native solutions. I specialize in building scalable, efficient systems that drive innovation with expertise spanning cloud platforms (AWS, Azure), containerization (Docker, Kubernetes), and CI/CD pipelines, complemented by strong full-stack development skills.',
  experience:
    'Currently pursuing a B.Tech in Computer Science Engineering at SRM Institute of Science and Technology, I bring hands-on experience with tools and platforms across the DevOps, Cloud, and ML stack. At Apollo Tyres R&D, I built a scalable backend architecture using Django and PostgreSQL to support 200+ concurrent simulations, increasing performance by 40%. I also automated simulation task queues and delivered real-time dashboards with Chart.js for 300+ engineering projects. My achievements include a 1st Runner-Up at DevTrails by Guidewire Software, 2nd Runner-Up at SEED Global Education\'s Global Hackathon, and 1st Runner-Up at Genesis Mini-Hack by TPH SRM. I\'m a Microsoft Certified professional (3x) with expertise in Azure, Security, and AI.',
};

const technologies = [
  'AWS/Azure',
  'Docker/Kubernetes',
  'Django/FastAPI',
  'PostgreSQL/MongoDB',
  'React/Next.js',
  'CI/CD Pipelines'
];

const variants = {
  visible: { opacity: 1, y: -50 },
  hidden: { opacity: 0, y: 0 },
};

function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const [isMobile, setIsMobile] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();

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

  useEffect(() => {
    // Check visibility for scroll animations
    const handleScroll = () => {
      const section = document.querySelector('.about');
      if (section && isInViewport(section) && !isVisible) {
        setIsVisible(true);
        controls.start({ opacity: 1, y: 0 });
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial checks
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible, controls]);

  return (
    <motion.div
      className={`about fade-in-section ${isVisible ? 'is-visible' : ''} section-transition`}
      id="about"
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
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
                <span className="highlight">{tech}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="about-grid-photo">
          <div className="overlay"></div>
          <div className="overlay-border"></div>
          <div className="about-grid-photo-container">
            {!imageError ? (
              <Image
                src="/etc/image.jpeg" 
                alt="Lohit Kolluri - DevOps & Cloud Solutions Engineer"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
                aria-label="Profile picture of Lohit Kolluri"
                onError={() => setImageError(true)}
              />
            ) : (
              <Image
                src="/etc/image.png" 
                alt="Lohit Kolluri - DevOps & Cloud Solutions Engineer"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
                aria-label="Profile picture of Lohit Kolluri"
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default About;
