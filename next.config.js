/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["hashconnect"]);

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const nextConfig = {
  basePath,
  assetPrefix: basePath,
  reactStrictMode: true,
};

module.exports = withTM(nextConfig);
