import type { Metadata } from 'next';
import HomeClient from './HomeClient';

// ĐÂY LÀ CHỖ NEXT.JS SẼ RENDER THẺ META TRỰC TIẾP TRÊN SERVER CHO GOOGLE ĐỌC
export const metadata: Metadata = {
  title: 'Happy Furniture - Xưởng Nội thất Sản xuất, Thiết kế và Thi công',
  description: 'Xưởng Nội thất Happy Furniture chuyên sản xuất, thiết kế và thi công lắp đặt nội thất gỗ công nghiệp MDF lõi xanh chống ẩm phủ Melamine chất lượng cao tại Bình Dương, Thành phố Hồ Chí Minh và Đồng Nai.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return <HomeClient />;
}