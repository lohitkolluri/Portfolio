import React from "react";
import { motion } from "framer-motion";
import Button from "../components/Button";

const Contact = () => {
  const containerVariants = {
    visible: { opacity: 1, y: -50 },
    hidden: { opacity: 0, y: 0 },
  };

  return (
    <motion.div
      className="contact"
      id="contact"
      style={{ paddingTop: '250px' }}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="contact-title">What&apos;s Next?</h2>
      <h2 className="contact-sub-title">Get In Touch</h2>
      <p className="contact-text">
        I&apos;m always looking for new opportunities, and my inbox is always open.
        Whether you have a question or just want to say hi, I&apos;ll try my best to
        get back to you!
      </p>
      <div className="contact-cta">
        <Button link="mailto:lohitkolluri@gmail.com" text="Say Hello" aria-label="Email Lohit Kolluri" />
      </div>
    </motion.div>
  );
};

export default Contact;
