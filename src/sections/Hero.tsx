import { motion, useAnimation, Variants } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import Button from '../components/Button';
import Image from 'next/image';
import { useAppContext } from '@/utils/ThemeContext';

// Define variants for animations
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 5, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: 'easeInOut', delay: 0.6 }
  }
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 5, rotate: -10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotate: 0,
    transition: { duration: 0.5, ease: 'easeInOut', delay: 0.6 }
  }
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 5 },
  visible: (custom: number) => ({ 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: 'easeInOut', delay: 0.8 + (custom * 0.2) }
  })
};

// Keywords for floating background
const keywords = [
  'AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'DevOps', 'Cloud', 
  'Terraform', 'Ansible', 'Jenkins', 'Git', 'Linux', 'Microservices', 
  'Serverless', 'Monitoring', 'Automation', 'Scalability', 'Containers',
  'Infrastructure', 'Deployment', 'Security', 'REST', 'Python', 'JavaScript'
];

// Floating Keyword component
const FloatingKeyword: FC<{ text: string, index: number, scrollY: number }> = ({ text, index, scrollY }) => {
  // Create more varied and interesting random positions and animations
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  const randomSize = 12 + Math.random() * 6; // Between 12-18px
  const randomOpacity = 0.02 + Math.random() * 0.03; // Very subtle
  
  // Create very gentle scroll-based movement
  // Each keyword moves at a different rate based on its index
  const scrollFactor = 0.005 + (index % 5) * 0.002; // Between 0.005 and 0.013
  const scrollOffset = scrollY * scrollFactor;
  
  // Alternate direction based on index
  const direction = index % 2 === 0 ? 1 : -1;
  
  return (
    <div 
      className="floating-keyword"
      style={{
        position: 'absolute',
        left: `${randomX}%`,
        top: `${randomY}%`,
        transform: `translateY(${scrollOffset * direction}px)`,
        fontSize: `${randomSize}px`,
        color: 'var(--theme-color)',
        opacity: randomOpacity,
        zIndex: 0,
        fontFamily: 'var(--fira-code)',
        pointerEvents: 'none',
        fontWeight: 'bold',
        transition: 'transform 0.5s ease-out' // Smooth transition for scroll movements
      }}
    >
      {text}
    </div>
  );
};

const Hero: FC = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const controls = useAnimation();
  const { isMobile } = useAppContext();

  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame for smoother scrolling effects
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        
        // Check if section is in viewport
        const section = document.querySelector('.hero-container');
        if (section) {
          const sectionTop = section.getBoundingClientRect().top;
          const sectionBottom = section.getBoundingClientRect().bottom;
          const isInView = (sectionTop >= 0 && sectionTop <= window.innerHeight) || 
                         (sectionBottom >= 0 && sectionBottom <= window.innerHeight) ||
                         (sectionTop <= 0 && sectionBottom >= window.innerHeight);
          
          if (isInView && !isVisible) {
            setIsVisible(true);
            controls.start({ opacity: 1, y: 0 });
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, controls]);

  return (
    <section className={`hero-container fade-in-section ${isVisible ? 'is-visible' : ''}`} aria-labelledby="hero-heading">
      <div className="floating-keywords-container">
        {keywords.map((keyword, index) => (
          <FloatingKeyword key={index} text={keyword} index={index} scrollY={scrollY} />
        ))}
      </div>
      <motion.div
        className="hero section-transition"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ 
          backgroundPositionY: `${scrollY * 0.05}px` // 10x slower than before
        }}
      >
        <div className="hero-background-wrapper">
          <div className="hero-background" style={{ 
            backgroundPositionY: `${scrollY * 0.03}px` // 10x slower than before
          }}></div>
        </div>
        <motion.h1
          id="hero-heading"
          className="hero-title"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          Hello, I&apos;m
        </motion.h1>
        <motion.h2
          className="hero-title-large"
          variants={textVariants}
          custom={0}
          initial="hidden"
          animate="visible"
        >
          Lohit Kolluri.
        </motion.h2>
        <motion.h3
          className="hero-title-large hero-title-sub"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut', delay: 1.0 }}
        >
          I build <span className="highlight">scalable systems</span>
        </motion.h3>
        <motion.p
          className="hero-text"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut', delay: 1.4 }}
        >
          I&apos;m a <span className="highlight">DevOps & Cloud Solutions Engineer</span> specializing in <span className="highlight">cloud-native</span> technologies, 
          containerization, and <span className="highlight">CI/CD pipelines</span>. My expertise includes <span className="highlight">AWS</span>, <span className="highlight">Azure</span>, <span className="highlight">Docker</span>, <span className="highlight">Kubernetes</span>, 
          and full-stack development.
        </motion.p>
        <motion.div
          className="hero-button"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut', delay: 1.4 }}
        >
          <Button
            text="Connect on LinkedIn"
            link="https://linkedin.com/in/kollurilohit"
            aria-label="LinkedIn profile of Lohit Kolluri"
            variant="primary"
            size="lg"
            showExternalIcon={true}
          />
          <Button
            text="View Projects"
            link="/#work"
            aria-label="View my projects"
            variant="outline"
            size="lg"
            className="ml-4"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
