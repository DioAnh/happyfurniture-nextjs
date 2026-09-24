import type { Metadata } from 'next';
import AcademyClient from './AcademyClient';

export const metadata: Metadata = {
  title: 'Học Viện Nội Thất Thực Chiến - Happy Furniture Academy',
  description: 'Đào tạo nhân lực ngành nội thất theo mô hình Apprenticeship: Học thật - Làm thật - Kết quả thật.',
  alternates: { canonical: '/hoc-vien' },
};

export default function AcademyPage() {
  return <AcademyClient />;
}