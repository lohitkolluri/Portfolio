import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Suspense, useEffect, useState } from 'react';
import Loader from '../components/Loader';

// Components that are needed immediately
import Hero from '../sections/Hero';
import Navbar from '../sections/Navbar';

// Dynamically import components that can be loaded later
const Email = dynamic(() => import('../components/Email'), {
  ssr: false,
});

const SocialIcons = dynamic(() => import('../components/SocialIcons'), {
  ssr: false,
});

const About = dynamic(() => import('../sections/About'), {
  loading: () => <div className="section-loader">Loading...</div>,
});

const Experience = dynamic(() => import('../sections/Experience'), {
  loading: () => <div className="section-loader">Loading...</div>,
});

const Projects = dynamic(() => import('../sections/Projects'), {
  loading: () => <div className="section-loader">Loading...</div>,
});

const OtherProjects = dynamic(() => import('@/sections/OtherProjects'), {
  loading: () => <div className="section-loader">Loading...</div>,
});

const Contact = dynamic(() => import('../sections/Contact'), {
  loading: () => <div className="section-loader">Loading...</div>,
});

const Footer = dynamic(() => import('../sections/Footer'), {
  ssr: false,
});

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

    const links = document.querySelectorAll('nav > .hover-this');

    const animateit = (e: Event) => {
      if (isMobile) return; // Skip animation on mobile

      const event = e as MouseEvent;
      const { offsetX: x, offsetY: y } = event,
        { offsetWidth: width, offsetHeight: height } = event.target as HTMLElement,
        move = 25,
        xMove = (x / width) * (move * 2) - move,
        yMove = (y / height) * (move * 2) - move;
    };

    const editCursor = (e: Event) => {
      if (isMobile) return; // Skip cursor update on mobile
    };

    const handleMouseDown = () => {
      if (isMobile) return; // Skip click animation on mobile
    };

    if (!isMobile) {
      // Only add event listeners on desktop
      links.forEach((link) => link.addEventListener('mousemove', animateit));
      links.forEach((link) => link.addEventListener('mouseleave', animateit));
      window.addEventListener('mousemove', editCursor);
      window.addEventListener('mousedown', handleMouseDown);
    }

    // Add fade-in effect
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.classList.add('fade-in');
      setTimeout(() => {
        mainContent.classList.add('show');
      }, 100);
    }

    return () => {
      // Clean up event listeners
      window.removeEventListener('resize', checkMobile);
      if (!isMobile) {
        links.forEach((link) => link.removeEventListener('mousemove', animateit));
        links.forEach((link) => link.removeEventListener('mouseleave', animateit));
        window.removeEventListener('mousemove', editCursor);
        window.removeEventListener('mousedown', handleMouseDown);
      }
    };
  }, [isMobile]);

  return (
    <div className="app">
      <Head>
        <title>Lohit&apos;s Portfolio</title>
        <meta name="description" content="Lohit's personal portfolio website" />
        <link rel="canonical" href="https://lohit.is-a.dev" />
        <meta property="og:title" content="Lohit's Portfolio" />
        <meta property="og:description" content="Lohit's personal portfolio website" />
        <meta property="og:url" content="https://lohit.is-a.dev" />
        <link rel="shortcut icon" href="/favicon.png" />
        <meta
          name="google-site-verification"
          content="DgzOS3oNMuUQ4Y1sU7x860SgyvsYvnd1BCWQLFu0KT8"
        />
      </Head>
      {showContent && (
        <>
          <Navbar />
          <Suspense fallback={<div className="loading-icon">Loading...</div>}>
            <SocialIcons />
            <Email />
          </Suspense>
          <main style={{ paddingTop: '60px' }} className="fade-in">
            <Hero />
            <Suspense fallback={<div className="section-loader">Loading about section...</div>}>
              <About />
            </Suspense>
            <Suspense
              fallback={<div className="section-loader">Loading experience section...</div>}
            >
              <Experience />
            </Suspense>
            <Suspense fallback={<div className="section-loader">Loading projects section...</div>}>
              <Projects />
              <OtherProjects />
            </Suspense>
            <Suspense fallback={<div className="section-loader">Loading contact section...</div>}>
              <Contact />
            </Suspense>
          </main>
          <Suspense fallback={<div className="footer-loader">Loading footer...</div>}>
            <Footer />
          </Suspense>
        </>
      )}
      <Loader isLoading={isLoading} setIsLoading={handleLoaderLoaded} />
    </div>
  );
}

export default Index;
