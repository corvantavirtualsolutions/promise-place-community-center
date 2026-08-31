/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // The games page was briefly published as /mini-games — keep that URL working.
      { source: "/mini-games", destination: "/wellness-games", permanent: true },
      // The first four games were replaced with clearer ones; keep old links alive.
      { source: "/wellness-games/breathe-and-grow", destination: "/wellness-games/balloon-breath", permanent: true },
      { source: "/wellness-games/memory-match", destination: "/wellness-games/sound-garden", permanent: true },
      { source: "/wellness-games/pop-the-worries", destination: "/wellness-games/zen-sand-garden", permanent: true },
      { source: "/wellness-games/color-your-mood", destination: "/wellness-games/mandala-maker", permanent: true },
    ];
  },
};

module.exports = nextConfig;
