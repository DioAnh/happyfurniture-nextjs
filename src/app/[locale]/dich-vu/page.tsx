import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Dịch vụ & Giải pháp Nội thất Trọn gói',
  description: 'Tham khảo các gói dịch vụ và giải pháp thiết kế - thi công nội thất của Happy Furniture: Cho thuê, B2B, Dự án lớn, Sản phẩm lẻ.',
  alternates: { canonical: '/dich-vu' },
};

export default function ServicesPage() {
  return <ServicesClient />;
}