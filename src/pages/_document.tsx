import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#121212" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        
        {/* Privacy-focused analytics */}
        <script
          async
          defer
          data-website-id="ed35faf2-bbd5-4786-a055-e12bab68f1d9" // Replace with your actual Umami ID when deploying
          src="https://analytics.umami.is/script.js"
          data-domains="lohit.is-a.dev"
          data-do-not-track="true"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
