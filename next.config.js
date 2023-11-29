// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withHighlightConfig } = require('@highlight-run/next/config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    instrumentationHook: true,
  },
};

module.exports = withHighlightConfig(nextConfig);
