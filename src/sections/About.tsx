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
    'Hello! I\'m Lohit Kolluri, a DevOps & Cloud Solutions Engineer. My passion lies in building scalable and reliable systems using cloud-native technologies.',
  experience:
    'Currently pursuing B.Tech at SRM Institute of Science and Technology, I\'ve architected robust backend systems at Apollo Tyres R&D, where I significantly improved performance by 40% and developed interactive dashboards for over 300 projects.',
};

const desktopText: AboutText = {
  intro:
    'Hello! I\'m Lohit Kolluri, a DevOps & Cloud Solutions Engineer passionate about cloud-native solutions. I focus on creating scalable, efficient, and innovative systems. My expertise covers cloud platforms (AWS, Azure), containerization (Docker, Kubernetes), and CI/CD pipelines, complemented by strong full-stack development skills.',
  experience:
    'Currently pursuing a B.Tech in Computer Science Engineering at SRM Institute of Science and Technology, my hands-on experience spans a wide array of tools and platforms within the DevOps, Cloud, and ML ecosystems. At Apollo Tyres R&D, I built a scalable backend architecture using Django and PostgreSQL to support 200+ concurrent simulations, increasing performance by 40%. I also automated simulation task queues and delivered real-time dashboards with Chart.js for 300+ engineering projects. My achievements include a 1st Runner-Up at DevTrails by Guidewire Software, 2nd Runner-Up at SEED Global Education\'s Global Hackathon, and 1st Runner-Up at Genesis Mini-Hack by TPH SRM. As a 3x Microsoft Certified professional, I have proven expertise in Azure, Security, and AI.',
};

// Skill definitions with icons from Simple Icons CDN
interface Skill {
  name: string;
  icon: string;
}

const technologiesLine1: Skill[] = [
  { name: 'Python', icon: 'https://cdn.simpleicons.org/python/white' },
  { name: 'SQL', icon: 'https://cdn.simpleicons.org/postgresql/white' },
  { name: 'Shell Scripting', icon: 'https://cdn.simpleicons.org/gnubash/white' },
  { name: 'HTML5', icon: 'https://cdn.simpleicons.org/html5/white' },
  { name: 'CSS3', icon: 'https://cdn.simpleicons.org/css/white' },
  { name: 'AWS', icon: 'https://cdn.simpleicons.org/icloud/white' },
  { name: 'EC2', icon: 'https://cdn.simpleicons.org/gnometerminal/white' },
  { name: 'S3', icon: 'https://cdn.simpleicons.org/bitbucket/white' },
  { name: 'Lambda', icon: 'https://cdn.simpleicons.org/serverless/white' },
  { name: 'RDS', icon: 'https://cdn.simpleicons.org/databricks/white' },
  { name: 'Azure', icon: 'https://cdn.simpleicons.org/icloud/white' },
  { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/white' },
  { name: 'Kubernetes', icon: 'https://cdn.simpleicons.org/kubernetes/white' },
  { name: 'GitHub Actions', icon: 'https://cdn.simpleicons.org/githubactions/white' },
  { name: 'Linux', icon: 'https://cdn.simpleicons.org/linux/white' },
  { name: 'Unix', icon: 'https://cdn.simpleicons.org/freebsd/white' },
  { name: 'Prometheus', icon: 'https://cdn.simpleicons.org/prometheus/white' },
  { name: 'Helm', icon: 'https://cdn.simpleicons.org/helm/white' }
];

const technologiesLine2: Skill[] = [
  { name: 'Flask', icon: 'https://cdn.simpleicons.org/flask/white' },
  { name: 'Django', icon: 'https://cdn.simpleicons.org/django/white' },
  { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi/white' },
  { name: 'Django REST Framework', icon: 'https://cdn.simpleicons.org/django/white' },
  { name: 'loguru', icon: 'https://cdn.simpleicons.org/python/white' },
  { name: 'Pydantic', icon: 'https://cdn.simpleicons.org/python/white' },
  { name: 'SMTP', icon: 'https://cdn.simpleicons.org/minutemailer/white' },
  { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/white' },
  { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/white' },
  { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis/white' },
  { name: 'Celery', icon: 'https://cdn.simpleicons.org/celery/white' },
  { name: 'RabbitMQ', icon: 'https://cdn.simpleicons.org/rabbitmq/white' },
  { name: 'React.js', icon: 'https://cdn.simpleicons.org/react/white' },
  { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/white' },
  { name: 'Three.js', icon: 'https://cdn.simpleicons.org/threedotjs/white' },
  { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/white' },
  { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/white' },
  { name: 'Shadcn', icon: 'https://cdn.simpleicons.org/shadcnui/white' },
  { name: 'TensorFlow', icon: 'https://cdn.simpleicons.org/tensorflow/white' },
  { name: 'scikit-learn', icon: 'https://cdn.simpleicons.org/scikitlearn/white' },
  { name: 'OpenAI GPT', icon: 'https://cdn.simpleicons.org/openai/white' },
  { name: 'Google Gemini', icon: 'https://cdn.simpleicons.org/google/white' },
  { name: 'Hugging Face', icon: 'https://cdn.simpleicons.org/huggingface/white' },
  { name: 'NLP', icon: 'https://cdn.simpleicons.org/openai/white' }
];

const variants = {
  visible: { opacity: 1, y: -50 },
  hidden: { opacity: 0, y: 0 },
};

function About() {
  const ref = useRef<HTMLDivElement>(null);
  const techSectionRef = useRef<HTMLDivElement>(null);
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

  // Create a larger array for truly seamless scrolling
  const generateSkillList = (technologies: Skill[]) => {
    // Create enough duplicates to ensure continuous scrolling
    // Triple the items to guarantee smooth looping
    return [...technologies, ...technologies, ...technologies];
  };

  const skillsRow1 = generateSkillList(technologiesLine1);
  const skillsRow2 = generateSkillList(technologiesLine2);

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
          
          <div className="tech-section" ref={techSectionRef}>
            <div className="tech-carousel">
              <div className="tech-container right-to-left">
                {skillsRow1.map((skill, index) => (
                  <motion.div
                    key={`line1-${skill.name}-${index}`} 
                    className="tech-badge"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                        delay: Math.min(index * 0.01, 0.2)
                      }
                    }}
                  >
                    <div className="tech-icon">
                      <img src={skill.icon} alt={`${skill.name} icon`} />
                    </div>
                    {skill.name}
                  </motion.div>
                ))}
              </div>
              
              <div className="tech-container left-to-right">
                {skillsRow2.map((skill, index) => (
                  <motion.div
                    key={`line2-${skill.name}-${index}`} 
                    className="tech-badge"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                        delay: Math.min(index * 0.01, 0.2)
                      }
                    }}
                  >
                    <div className="tech-icon">
                      <img src={skill.icon} alt={`${skill.name} icon`} />
                    </div>
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
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
