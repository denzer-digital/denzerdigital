/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Otimizações de performance
  compress: true,
  poweredByHeader: false,
  // Otimização de imagens
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Otimização de bundle
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  // Otimizações de CSS e renderização
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Otimização de JavaScript - reduz polyfills desnecessários
  swcMinify: true,
  // Desabilita cache do webpack em desenvolvimento para evitar erros de permissão no Windows
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
  // Headers para cache e performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
        ],
      },
      {
        // Assets estáticos - cache longo (1 ano)
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Arquivos de imagem - cache longo
        source: '/:all*(jpg|jpeg|png|gif|ico|svg|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Arquivos CSS e JS do Next.js - cache médio (1 semana)
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Arquivos de fontes - cache longo
        source: '/:all*(woff|woff2|ttf|otf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Arquivos de dados JSON - cache curto (1 hora)
        source: '/:all*.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

