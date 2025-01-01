import '@/scss/globals.css';
import '@/scss/index.scss';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Fira_Code, Raleway } from 'next/font/google';
import { useEffect, useState } from 'react';

const raleway = Raleway({ subsets: ['latin'] });
const firaCode = Fira_Code({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <style jsx global>{`
        :root {
          --raleway: ${raleway.style.fontFamily};
          --fira-code: ${firaCode.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
      {!isMobile && (
        <AnimatedCursor
          innerSize={8}
          outerSize={35}
          color="255, 255, 255"
          outerAlpha={0.3}
          innerScale={1}
          outerScale={1.7}
          showSystemCursor={false}
          outerStyle={{
            mixBlendMode: 'exclusion',
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
          ]}
        />
      )}
    </>
  );
}
