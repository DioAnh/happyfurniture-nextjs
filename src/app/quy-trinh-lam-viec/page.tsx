import type { Metadata } from 'next';
import WorkflowClient from './WorkflowClient';

export const metadata: Metadata = {
  title: 'Quy trình làm việc',
  description: 'Quy trình tư vấn thiết kế, đo đạc hiện trạng, sản xuất và thi công lắp đặt nội thất chuyên nghiệp tại Xưởng nội thất Happy Furniture.',
  alternates: { canonical: '/quy-trinh-lam-viec' },
};

export default function WorkflowPage() {
  return <WorkflowClient />;
}