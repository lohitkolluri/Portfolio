import { useEffect } from "react";
import Head from "next/head";
import { useState } from "react";
import Email from "../components/Email";
import Loader from "../components/Loader";
import SocialIcons from "../components/SocialIcons";
import About from "../sections/About";
import Contact from "../sections/Contact";
import Experience from "../sections/Experience";
import Footer from "../sections/Footer";
import Hero from "../sections/Hero";
import Navbar from "../sections/Navbar";
import Projects from "../sections/Projects";
import OtherProjects from "@/sections/OtherProjects";

function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoaderLoaded = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 450);
  };

  useEffect(() => {
    const links = document.querySelectorAll("nav > .hover-this");
    const cursor = document.querySelector(".cursor");

    const animateit = (e) => {
      const { offsetX: x, offsetY: y } = e,
        { offsetWidth: width, offsetHeight: height } = e.target,
        move = 25,
        xMove = (x / width) * (move * 2) - move,
        yMove = (y / height) * (move * 2) - move;

      cursor.classList.add("cursor-animate");
      cursor.style.transform = `translate(${xMove}px, ${yMove}px) scale(1.2)`;

      if (e.type === "mouseleave") {
        cursor.classList.remove("cursor-animate");
        cursor.style.transform = "";
      }
    };

    const editCursor = (e) => {
      const cursor = document.querySelector(".cursor");
      if (cursor) {
        const { clientX: x, clientY: y } = e;
        cursor.style.left = x + "px";
        cursor.style.top = y + "px";
        cursor.style.transition = "transform 0.2s ease";
      }
    };

    const handleMouseDown = () => {
      const cursor = document.querySelector(".cursor");
      if (cursor) {
        cursor.classList.add("clicked");
        setTimeout(() => {
          cursor.classList.remove("clicked");
        }, 300);
      }
    };

    links.forEach((link) => link.addEventListener("mousemove", animateit));
    links.forEach((link) => link.addEventListener("mouseleave", animateit));
    window.addEventListener("mousemove", editCursor);
    window.addEventListener("mousedown", handleMouseDown);

    // Add fade-in effect
    const mainContent = document.querySelector("main");
    if (mainContent) {
      mainContent.classList.add("fade-in");
      setTimeout(() => {
        mainContent.classList.add("show");
      }, 100); // Delay to allow for the fade-in effect
    }

    return () => {
      links.forEach((link) => link.removeEventListener("mousemove", animateit));
      links.forEach((link) => link.removeEventListener("mouseleave", animateit));
      window.removeEventListener("mousemove", editCursor);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <div className="app">
      <Head>
        <title>Lohit&apos;s Portfolio</title>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta
          name="google-site-verification"
          content="DgzOS3oNMuUQ4Y1sU7x860SgyvsYvnd1BCWQLFu0KT8"
        />
      </Head>
      {showContent && (
        <>
          <Navbar />
          <SocialIcons />
          <Email />
          <main style={{ paddingTop: "60px" }} className="fade-in">
            <Hero />
            <About />
            <Experience />
            <Projects />
            <OtherProjects />
            <Contact />
          </main>
          <Footer />
          <div className="cursor"></div>
        </>
      )}
      <Loader isLoading={isLoading} setIsLoading={handleLoaderLoaded} />
    </div>
  );
}

export default Index;
