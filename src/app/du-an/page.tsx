import type { Metadata } from 'next';
import ProjectsClient from './ProjectsClient';

export const metadata: Metadata = {
  title: 'Dự Án Thực Tế - Kinh Nghiệm Thi Công Nội Thất',
  description: 'Xem các dự án thi công thực tế tại Happy Furniture. Từ căn hộ chung cư, nhà phố đến Penthouse, tối ưu không gian và cá nhân hóa theo từng khách hàng.',
  alternates: { canonical: '/du-an' },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}