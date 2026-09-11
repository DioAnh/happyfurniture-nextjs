import type { Metadata } from 'next';
import PaymentClient from './PaymentClient';

export const metadata: Metadata = {
  title: 'Chính sách thanh toán',
  description: 'Các hình thức thanh toán linh hoạt tại Xưởng nội thất Happy Furniture.',
  alternates: { canonical: '/chinh-sach-thanh-toan' },
};

export default function PaymentPolicyPage() {
  return <PaymentClient />;
}