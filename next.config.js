/** @type {import('next').NextConfig} */
const nextConfig = {
  // html2pdf.js uses browser APIs, exclude from SSR
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), "html2pdf.js"];
    }
    return config;
  },
};

module.exports = nextConfig;

