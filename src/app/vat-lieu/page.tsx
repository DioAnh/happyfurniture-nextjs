import type { Metadata } from 'next';
import MaterialsClient from './MaterialsClient';

export const metadata: Metadata = {
  title: 'Bảng Mã Vân Gỗ & Vật Liệu',
  description: 'Khám phá các mã ván gỗ MDF, vân gỗ, bề mặt Acrylic/Melamine đang được trang bị tại xưởng Happy Furniture.',
  alternates: { canonical: '/vat-lieu' },
};

export default function MaterialsPage() {
  return <MaterialsClient />;
}