import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useInView, motion } from "framer-motion";

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
  Hello! I&apos;m Lohit Kolluri, a passionate and versatile technologist with a strong foundation in machine learning, cloud computing, and software development. I thrive on the intersection of creativity and technology, constantly exploring new ways to innovate and solve complex problems.
</p>
<p className="about-grid-info-text text-justify">
  I specialize in Python, Google Cloud, and Three.Js, with hands-on experience in machine learning, C++, and Node.JS. My expertise extends to building robust web applications with React, Vue.Js, and Tailwind CSS. As an AI/ML enthusiast, I&apos;ve honed my skills through internships, including one at EduSkill Foundation, where I delved into AWS Cloud and machine learning fundamentals.
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
            <Image src="/lohit.jpg" alt="profile" fill />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default About;
