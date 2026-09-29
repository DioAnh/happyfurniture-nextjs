import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

// Khởi tạo Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.happyfurniture.net';

  // 1. Các trang chính
  const mainRoutes = [
    '', '/san-pham', '/du-an', '/cong-dong', '/dich-vu',
    '/xuong-san-xuat-noi-that',
    '/dich-vu/can-ho-cho-thue', '/dich-vu/nha-pho-chung-cu', '/dich-vu/gia-cong-noi-that',
    '/dich-vu/thi-cong-lap-dat', '/dich-vu/thau-du-an-chung-cu',
    '/vat-lieu', '/hoc-vien', '/lien-he',
    '/quy-trinh-lam-viec', '/chinh-sach-thanh-toan', '/chinh-sach-bao-hanh', '/chinh-sach-van-chuyen'
  ];

  const mainPages = mainRoutes.map((route) => ({
    url: `${baseUrl}${route}`, // Bản gốc Tiếng Việt (Không có /en)
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
    alternates: {
      languages: {
        vi: `${baseUrl}${route}`, // Báo cho Google: Đây là bản VN
        en: `${baseUrl}/en${route}`, // Báo cho Google: Đây là bản Tiếng Anh
      },
    },
  }));

  // 2. Danh mục sản phẩm SEO tĩnh
  const categoryRoutes = [
    'tu-quan-ao-mdf', 'giuong-ngu-mdf', 'ke-trang-tri-mdf', 'tu-hoc-keo-mdf', 'tu-giay-mdf',
    'tu-dung-do-da-nang-mdf', 'tu-dau-giuong-mdf', 'ban-console-mdf', 'ban-tra-ca-phe-mdf',
    'ban-an-mdf', 'ban-lam-viec-mdf', 'ke-tivi-mdf'
  ];

  const categoryPages = categoryRoutes.map((cat) => ({
    url: `${baseUrl}/danh-muc/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
    alternates: {
      languages: {
        vi: `${baseUrl}/danh-muc/${cat}`,
        en: `${baseUrl}/en/danh-muc/${cat}`,
      },
    },
  }));

  // 3. Tự động lấy danh sách URL Sản phẩm từ Supabase
  const { data: products } = await supabase
    .from('products')
    .select('slug, created_at');

  const productPages = (products || []).map((product: any) => ({
    url: `${baseUrl}/san-pham/${product.slug}`,
    lastModified: product.created_at ? new Date(product.created_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
    alternates: {
      languages: {
        vi: `${baseUrl}/san-pham/${product.slug}`,
        en: `${baseUrl}/en/san-pham/${product.slug}`,
      },
    },
  }));

  // Hợp nhất toàn bộ URL thành một Sitemap hoàn chỉnh
  return [...mainPages, ...categoryPages, ...productPages];
}