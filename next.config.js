/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: false,
  transpilePackages: ['@mui/x-charts']
}

module.exports = nextConfig
