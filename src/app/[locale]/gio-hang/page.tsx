import type { Metadata } from 'next';
import CartClient from './CartClient';

export const metadata: Metadata = {
  title: 'Giỏ hàng của bạn',
  alternates: {
    canonical: '/gio-hang',
  },
};

export default function CartPage() {
  return <CartClient />;
}