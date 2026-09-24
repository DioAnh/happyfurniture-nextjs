import type { Metadata } from 'next';
import ProjectDetailClient from './ProjectDetailClient';

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Dự án nội thất ${id} - Happy Furniture`,
    description: 'Khám phá chi tiết công trình thực tế thi công nội thất của Happy Furniture.',
    alternates: { canonical: `/du-an/${id}` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  return <ProjectDetailClient projectId={id} />;
}