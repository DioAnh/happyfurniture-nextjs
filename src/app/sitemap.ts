import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

// Khởi tạo Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.happyfurniture.net';

  // 1. Các trang chính
  const mainPages = [
    '', '/san-pham', '/du-an', '/cong-dong', '/dich-vu',
    '/xuong-san-xuat-noi-that',
    '/dich-vu/can-ho-cho-thue', '/dich-vu/nha-pho-chung-cu', '/dich-vu/gia-cong-noi-that',
    '/dich-vu/thi-cong-lap-dat', '/dich-vu/thau-du-an-chung-cu',
    '/vat-lieu', '/hoc-vien', '/lien-he',
    '/quy-trinh-lam-viec', '/chinh-sach-thanh-toan', '/chinh-sach-bao-hanh', '/chinh-sach-van-chuyen'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Danh mục sản phẩm SEO tĩnh
  const categoryPages = [
    'tu-quan-ao-mdf', 'giuong-ngu-mdf', 'ke-trang-tri-mdf', 'tu-hoc-keo-mdf', 'tu-giay-mdf',
    'tu-dung-do-da-nang-mdf', 'tu-dau-giuong-mdf', 'ban-console-mdf', 'ban-tra-ca-phe-mdf',
    'ban-an-mdf', 'ban-lam-viec-mdf', 'ke-tivi-mdf'
  ].map((cat) => ({
    url: `${baseUrl}/danh-muc/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 3. Tự động lấy danh sách URL Sản phẩm từ Supabase (Đã fix lỗi thiếu cột)
  const { data: products } = await supabase
    .from('products')
    .select('slug, created_at')
    .order('is_avatar', { ascending: false }); // Chỉ lấy slug và created_at

  const productPages = (products || []).map((product: any) => ({
    url: `${baseUrl}/san-pham/${product.slug}`,
    // Sử dụng ngày tạo (created_at) làm mốc thời gian khai báo với Google
    lastModified: product.created_at ? new Date(product.created_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Hợp nhất toàn bộ URL thành một Sitemap hoàn chỉnh
  return [...mainPages, ...categoryPages, ...productPages];
}