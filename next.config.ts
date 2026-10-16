import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

// Khởi tạo plugin đa ngôn ngữ trỏ đến file cấu hình i18n
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

// Gom TẤT CẢ các cấu hình vào trong một biến nextConfig duy nhất
const nextConfig: NextConfig = {
  images: {
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
      // 1. Chuyển hướng tên miền Vercel về tên miền chính (Bảo vệ SEO cốt lõi)
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
      // 2. Chuyển các sản phẩm đã bị xóa mềm (ẩn) về lại trang danh mục
      {
        source: '/san-pham/archived-:slug(.*)',
        destination: '/san-pham',
        permanent: true,
      },
      
      // ==============================================================
      // 3. CODE MỚI THÊM: DỌN RÁC LỖI 404 CỦA CÁC URL CHỨA UUID CŨ
      // ==============================================================
      {
        // Bắt link tiếng Việt chứa ID (UUID)
        source: '/san-pham/:id([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})',
        destination: '/san-pham',
        permanent: true, // Báo Google xóa URL cũ
      },
      {
        // Bắt link tiếng Anh chứa ID (UUID)
        source: '/en/san-pham/:id([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})',
        destination: '/en/san-pham',
        permanent: true, // Báo Google xóa URL cũ
      }
    ];
  },
};

// Đóng gói toàn bộ cấu hình bằng plugin i18n và chỉ có MỘT lệnh export default
export default withNextIntl(nextConfig);