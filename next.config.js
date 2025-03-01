/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60 * 60 * 24, // 24 saat
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    workerThreads: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Three.js ve React Three Fiber için gerekli yapılandırma
  webpack: (config, { dev, isServer }) => {
    // Webpack önbellek stratejisini yapılandır
    config.cache = {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename]
      },
      cacheDirectory: path.resolve(process.cwd(), '.next/cache'),
      maxAge: 5184000000, // 60 gün
      compression: false // Önbellek sıkıştırmasını devre dışı bırak
    };
    
    // Three.js için gerekli modülleri dahil et
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/images',
          outputPath: 'static/images',
        },
      },
    });
    
    return config;
  },
}

module.exports = nextConfig 