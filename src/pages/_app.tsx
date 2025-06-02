import '@/scss/globals.css';
import '@/scss/index.scss';
import { AppProvider } from '@/utils/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Fira_Code, Raleway } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

const raleway = Raleway({ subsets: ['latin'] });
const firaCode = Fira_Code({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

// Use 'any' type for the dynamic import to avoid type mismatches
const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
  ssr: false,
});

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Register service worker
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(
          (registration) => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          },
          (err) => {
            console.log('ServiceWorker registration failed: ', err);
          }
        );
      });
    }

    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fix for hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <style jsx global>{`
        :root {
          --raleway: ${raleway.style.fontFamily};
          --fira-code: ${firaCode.style.fontFamily};
        }

        html {
          scroll-padding-top: 80px; /* Ensures anchor links don't get hidden behind fixed header */
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        body {
          animation: fadeIn 0.8s ease-in;
        }
      `}</style>
      
      <AppProvider>
        <AnimatePresence mode="wait">
          <motion.div
            key={router.route}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
        
        {!isMobile && mounted && (
          <AnimatedCursor
            innerSize={8}
            outerSize={35}
            color="187, 134, 252"
            outerAlpha={0.2}
            innerScale={1}
            outerScale={1.7}
            trailingSpeed={5}
            showSystemCursor={false}
            outerStyle={{
              mixBlendMode: 'difference',
            }}
            clickables={[
              'a',
              'input[type="text"]',
              'input[type="email"]',
              'input[type="number"]',
              'input[type="submit"]',
              'input[type="image"]',
              'label[for]',
              'select',
              'textarea',
              'button',
              '.link',
              '.exp-slider-item',
              '.hover-this',
              '.timeline-item',
              '.experience-item',
              '.md-btn',
            ]}
          />
        )}
      </AppProvider>
    </>
  );
};

export default App;
