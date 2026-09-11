import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Liên Hệ Với Chúng Tôi',
  description: 'Thông tin liên hệ Xưởng Nội thất Happy Furniture tại Bình Dương và TP.HCM.',
  alternates: {
    canonical: '/lien-he',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}