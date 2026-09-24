import type { Metadata } from 'next';
import ShippingClient from './ShippingClient';

export const metadata: Metadata = {
  title: 'Chính sách vận chuyển',
  description: 'Chính sách vận chuyển và lắp đặt nội thất tại Bình Dương, TP.HCM và Đồng Nai.',
  alternates: { canonical: '/chinh-sach-van-chuyen' },
};

export default function ShippingPolicyPage() {
  return <ShippingClient />;
}