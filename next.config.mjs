/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Externalize bcrypt to avoid bundling it
    config.externals = [...config.externals, 'bcrypt'];
    return config;
  },
};

export default nextConfig;
