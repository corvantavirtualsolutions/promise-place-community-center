/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // The games page was briefly published as /mini-games — keep that URL working.
      { source: "/mini-games", destination: "/wellness-games", permanent: true },
    ];
  },
};

module.exports = nextConfig;
