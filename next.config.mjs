/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'ar-rajaa-schools-backend.onrender.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
