import type { Metadata } from 'next';
import ProductListingClient from './ProductListingClient';
import { useTranslations } from 'next-intl';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Sản Phẩm Lẻ Bán Sẵn',
  description: 'Khám phá các sản phẩm nội thất như giường, tủ quần áo, tab đầu giường, kệ tivi với chất liệu MDF lõi xanh chống ẩm tiêu chuẩn E2 chất lượng cao tại Bình Dương.',
  alternates: {
    canonical: '/san-pham',
  },
};

export default function ProductListingPage() {
  return <ProductListingClient />;
}