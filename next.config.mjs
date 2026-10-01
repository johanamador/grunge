/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: false, // Habilitar optimización
    domains: [
      'api-v3.findify.io',
      'www.bandmerch.com',
      'bandmerch.com',
      'cdn.findify.io',
      'rockabilia.com',
      'www.rockabilia.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/1/0090/2447/1140/**',
      },
      {
        protocol: 'https',
        hostname: '**.findify.io',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '**.bandmerch.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '**.rockabilia.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: '**.findify.io',
        port: '',
        pathname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 604800,
  },
  async headers() {
    return [{
      source: '/media/v1/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    }]
  },
}

export default nextConfig
