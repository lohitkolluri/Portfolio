import Head from "next/head";
import Email from "../components/Email";
import Loader from "../components/Loader";
import SocialIcons from "../components/SocialIcons";
import Footer from "../sections/Footer";
import Hero from "../sections/Hero";
import Navbar from "../sections/Navbar";
import React, { useState } from "react";
import About from "../sections/About";
import Contact from "../sections/Contact";
import Projects from "../sections/Projects";
import Experience from "../sections/Experience";

function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoaderLoaded = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 450);
  };

  return (
    <div className="app">
      <Head>
        <title>LOHIT KOLLURI</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="google-site-verification" content="DgzOS3oNMuUQ4Y1sU7x860SgyvsYvnd1BCWQLFu0KT8" />
      </Head>
      {showContent && (
        <>
          <Navbar />
          <SocialIcons />
          <Email />
          <main>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </>
      )}
      <Loader isLoading={isLoading} setIsLoading={handleLoaderLoaded} />
    </div>
  );
}

export default Index;
