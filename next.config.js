/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.externals = [...(config.externals || []), { canvas: "canvas" }];
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/student/dashboard',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
