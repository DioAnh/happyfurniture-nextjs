import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.happyfurniture.net';

  // Các trang chính
  const mainPages = [
    '', '/san-pham', '/du-an', '/cong-dong', '/dich-vu',
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

  // Danh mục sản phẩm SEO tĩnh (Dựa theo dữ liệu cũ)
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

  return [...mainPages, ...categoryPages];
}