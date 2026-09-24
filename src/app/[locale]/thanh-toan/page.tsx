import type { Metadata } from 'next';
import CheckoutClient from './CheckoutClient';

export const metadata: Metadata = {
  title: 'Thanh toán an toàn',
  alternates: {
    canonical: '/thanh-toan',
  },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}