/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // The section was briefly called Wellness Games; keep those URLs working.
      // NOTE: nothing here may point AT /wellness-games — that would loop.
      { source: "/wellness-games", destination: "/mini-games", permanent: true },
      { source: "/wellness-games/:slug", destination: "/mini-games/:slug", permanent: true },
      // The first four games were replaced with clearer ones; keep old links alive.
      { source: "/mini-games/breathe-and-grow", destination: "/mini-games/balloon-breath", permanent: true },
      { source: "/mini-games/memory-match", destination: "/mini-games/sound-garden", permanent: true },
      { source: "/mini-games/pop-the-worries", destination: "/mini-games/zen-sand-garden", permanent: true },
      { source: "/mini-games/color-your-mood", destination: "/mini-games/mandala-maker", permanent: true },
    ];
  },
};

module.exports = nextConfig;
