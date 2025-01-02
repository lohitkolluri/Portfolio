import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import Logo from '../components/Logo';

function Navbar() {
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [responsiveNavVisible, setResponsiveNavVisible] = useState(false);
  const sectionLinks = [
    { name: 'About', link: '/#about' },
    { name: 'Experience', link: '/#experience' },
    { name: 'Work', link: '/#work' },
    {
      name: 'Contact',
      link: '/#contact',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      window.pageYOffset > 100 ? setNavbarVisible(true) : setNavbarVisible(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup listener
  }, []);

  useEffect(() => {
    const links = document.querySelectorAll('.nav-items-list-item-link');
    links.forEach((link) => {
      link.addEventListener('click', () => setResponsiveNavVisible(false));
    });
    const nav = document.querySelector('.nav-items');
    nav?.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    const html = document.querySelector('html');
    html?.addEventListener('click', (e) => {
      setResponsiveNavVisible(false);
    });
  }, []);

  useEffect(() => {
    const main = document.querySelector('main');
    if (responsiveNavVisible) {
      main?.classList.add('blur');
    } else {
      main?.classList.remove('blur');
    }
  }, [responsiveNavVisible]);

  return (
    <nav>
      <div className={`wrapper ${navbarVisible ? 'blur-nav' : ''}`}>
        <motion.div
          className="brand"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
        >
          <Link href="">
            <Logo />
          </Link>
        </motion.div>
        <motion.div
          className="nav-responsive-toggle"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
        >
          {responsiveNavVisible ? (
            <X
              onClick={(e) => {
                e.stopPropagation();
                setResponsiveNavVisible(false);
              }}
              size={24} // Customize size if needed
            />
          ) : (
            <Menu
              onClick={(e) => {
                e.stopPropagation();
                setResponsiveNavVisible(true);
              }}
              size={24} // Customize size if needed
            />
          )}
        </motion.div>
        <motion.div
          className={`${responsiveNavVisible && 'nav-responsive'} nav-items`}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
        >
          <ul className="nav-items-list">
            {sectionLinks.map(({ name, link }, index) => (
              <motion.li
                key={name}
                className="nav-items-list-item"
                initial={{ opacity: 0, y: -25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                  delay: 0.1 + index * 0.1,
                }}
              >
                <Link
                  href={link}
                  className="nav-items-list-item-link"
                  aria-label={`Navigate to ${name}`}
                >
                  {name}
                </Link>
              </motion.li>
            ))}
          </ul>
          <motion.div
            className="nav-items-button"
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
              delay: 0.6,
            }}
          >
            <Button
              text="Resume"
              link="https://drive.google.com/file/d/1KwoW5uTW2aUEoi14CnM6JGQatup_5aAf/view?usp=sharing"
            />
          </motion.div>
        </motion.div>
      </div>
    </nav>
  );
}

export default Navbar;
