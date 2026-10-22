import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  images: {
    // Cache ảnh đã tối ưu trong 30 ngày để tiết kiệm tối đa quota Vercel Free Tier
    minimumCacheTTL: 2592000,
    deviceSizes: [640, 1080, 1920],
    imageSizes: [128, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hkrgketabjgrmtjwntta.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  
  async redirects() {
    return [
      {
        source: '/:slug',
        has: [
          {
            type: 'host',
            value: 'happyfurniture-nextjs-4ltt.vercel.app',
          },
        ],
        destination: 'https://www.happyfurniture.net/:slug',
        permanent: true,
      },
      {
        source: '/san-pham/archived-:slug(.*)',
        destination: '/san-pham',
        permanent: true,
      },
      {
        source: '/san-pham/:id([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})',
        destination: '/san-pham',
        permanent: true,
      },
      {
        source: '/en/san-pham/:id([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})',
        destination: '/en/san-pham',
        permanent: true,
      }
    ];
  },
};

export default withNextIntl(nextConfig);