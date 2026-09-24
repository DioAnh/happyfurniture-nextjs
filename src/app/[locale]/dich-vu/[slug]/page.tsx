import type { Metadata } from 'next';
import ServiceDetailClient from './ServiceDetailClient';

// NEXT.JS 15 YÊU CẦU PARAMS LÀ PROMISE
interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  // Tạo title dựa trên slug để SEO tốt hơn
  const formatTitle = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return {
    title: `${formatTitle} | Happy Furniture`,
    description: 'Chi tiết gói dịch vụ thiết kế và thi công nội thất chuyên nghiệp tại Happy Furniture.',
    alternates: {
      canonical: `/dich-vu/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params; // Lấy slug từ Server
  
  // Truyền slug xuống cho Client Component xử lý giao diện
  return <ServiceDetailClient slug={slug} />;
}