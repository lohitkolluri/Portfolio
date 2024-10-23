import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

function About() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  useEffect(() => {
    console.log("Element is in view: ", isInView);
  }, [isInView]);

  return (
    <motion.div
      className="about"
      id="about"
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
        <h2>About Me</h2>
      </div>
      <div className="about-grid">
        <div className="about-grid-info">
          <p className="about-grid-info-text text-justify">
            Hello! I&apos;m Lohit Kolluri, a Full Stack Developer passionate about DevOps and Machine Learning. With experience across a wide array of technologies, I strive to deliver scalable, cost-effective solutions. I hold a Bachelor of Technology from SRM Institute of Science and Technology, with a focus on cloud computing, backend development, and intelligent automation.
          </p>
          <p className="about-grid-info-text text-justify">
            At Apollo Tyres R&D, I developed an intelligent task queuing system and architected a scalable backend using Django and PostgreSQL, boosting performance by 40%. My hands-on experience spans Python, Google Cloud, AWS, and frameworks like FastAPI and Flask. I've led projects such as a Natural Language to SQL Converter that reduced deployment costs by 40% while improving query accuracy to 95%.
          </p>
          <p className="about-grid-info-text text-justify">
            Here are a few technologies I&apos;ve been working with recently:
          </p>

          <ul className="about-grid-info-list">
            <li className="about-grid-info-list-item">React</li>
            <li className="about-grid-info-list-item">Next.js</li>
            <li className="about-grid-info-list-item">Node.js</li>
            <li className="about-grid-info-list-item">TailwindCSS</li>
            <li className="about-grid-info-list-item">Azure</li>
            <li className="about-grid-info-list-item">Google Cloud</li>
          </ul>
        </div>
        <div className="about-grid-photo">
          <div className="overlay"></div>
          <div className="overlay-border"></div>
          <div className="about-grid-photo-container">
            <Image
              src="/etc/image.png"
              alt="profile"
              fill
              sizes="100vw" // Add appropriate sizes
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default About;
