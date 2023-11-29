/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['@mui/x-charts'],
  compiler: {
    styledComponents: true,
  }
}

module.exports = nextConfig
