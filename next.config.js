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
      {
        source: '/student/syllabus',
        destination: '/student/subjects',
        permanent: false,
      },
      {
        source: '/student/notes',
        destination: '/student/revision',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
