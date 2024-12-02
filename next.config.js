// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lohitcdn.blob.core.windows.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};
