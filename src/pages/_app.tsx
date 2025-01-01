import '@/scss/globals.css';
import '@/scss/index.scss';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Fira_Code, Raleway } from 'next/font/google';

const raleway = Raleway({ subsets: ['latin'] });
const firaCode = Fira_Code({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --raleway: ${raleway.style.fontFamily};
          --fira-code: ${firaCode.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
      <AnimatedCursor
        innerSize={8}
        outerSize={35}
        color="255, 255, 255"
        outerAlpha={0.3}
        innerScale={0.7}
        outerScale={5}
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
    </>
  );
}
