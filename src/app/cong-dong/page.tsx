import type { Metadata } from 'next';
import CommunityClient from './CommunityClient';
import { supabase } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'Cộng Đồng & Kiến Thức Nội Thất',
  description: 'Nơi giao lưu, học hỏi và chia sẻ đam mê nội thất dành cho kiến trúc sư trẻ, nhà thiết kế và các gia chủ. Cập nhật xu hướng, kiến thức và sự kiện mới nhất.',
  alternates: {
    canonical: '/cong-dong',
  },
};

export default async function CommunityPage() {
  // Lấy dữ liệu bài viết trực tiếp trên Server (Rất tốt cho SEO)
  const { data: posts } = await supabase
    .from('community_posts')
    .select('*')
    .order('created_at', { ascending: false });

  return <CommunityClient initialPosts={posts || []} />;
}