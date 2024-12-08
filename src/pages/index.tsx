import React, { useEffect, useState } from "react";
import Head from "next/head";
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
  const [isMobile, setIsMobile] = useState(false);

  const handleLoaderLoaded = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 450);
  };

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    const links = document.querySelectorAll("nav > .hover-this");
    const cursor = document.querySelector(".cursor") as HTMLElement;

    // Only show cursor on desktop
    if (cursor) {
      cursor.style.display = isMobile ? 'none' : 'block';
    }

    const animateit = (e: Event) => {
      if (isMobile) return; // Skip animation on mobile
      
      const event = e as MouseEvent;
      const { offsetX: x, offsetY: y } = event,
        { offsetWidth: width, offsetHeight: height } = event.target as HTMLElement,
        move = 25,
        xMove = (x / width) * (move * 2) - move,
        yMove = (y / height) * (move * 2) - move;

      if (cursor) {
        cursor.classList.add("cursor-animate");
        cursor.style.transform = `translate(${xMove}px, ${yMove}px) scale(1.2)`;
      }
      if (event.type === "mouseleave") {
        if (cursor) {
          cursor.classList.remove("cursor-animate");
          cursor.style.transform = "";
        }
      }
    };

    const editCursor = (e: Event) => {
      if (isMobile) return; // Skip cursor update on mobile
      
      const cursor = document.querySelector(".cursor");
      const event = e as MouseEvent;
      if (cursor instanceof HTMLElement) {
        const { clientX: x, clientY: y } = event;
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
        cursor.style.transition = "transform 0.2s ease";
      }
    };

    const handleMouseDown = () => {
      if (isMobile) return; // Skip click animation on mobile
      
      const cursor = document.querySelector(".cursor");
      if (cursor) {
        cursor.classList.add("clicked");
        setTimeout(() => {
          cursor.classList.remove("clicked");
        }, 300);
      }
    };

    if (!isMobile) {
      // Only add event listeners on desktop
      links.forEach((link) => link.addEventListener("mousemove", animateit));
      links.forEach((link) => link.addEventListener("mouseleave", animateit));
      window.addEventListener("mousemove", editCursor);
      window.addEventListener("mousedown", handleMouseDown);
    }

    // Add fade-in effect
    const mainContent = document.querySelector("main");
    if (mainContent) {
      mainContent.classList.add("fade-in");
      setTimeout(() => {
        mainContent.classList.add("show");
      }, 100);
    }

    return () => {
      // Clean up event listeners
      window.removeEventListener('resize', checkMobile);
      if (!isMobile) {
        links.forEach((link) => link.removeEventListener("mousemove", animateit));
        links.forEach((link) => link.removeEventListener("mouseleave", animateit));
        window.removeEventListener("mousemove", editCursor);
        window.removeEventListener("mousedown", handleMouseDown);
      }
    };
  }, [isMobile]); // Add isMobile to dependency array

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