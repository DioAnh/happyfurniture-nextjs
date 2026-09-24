import type { Metadata } from 'next';
import WarrantyClient from './WarrantyClient';

export const metadata: Metadata = {
  title: 'Chính sách bảo hành',
  description: 'Chi tiết chính sách bảo hành, bảo trì uy tín dành cho các sản phẩm nội thất gỗ công nghiệp tại Xưởng nội thất Happy Furniture.',
  alternates: { canonical: '/chinh-sach-bao-hanh' },
};

export default function WarrantyPolicyPage() {
  return <WarrantyClient />;
}