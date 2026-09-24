import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';
import { PenTool, LayoutTemplate, Hammer, BookOpen, CalendarDays, Sofa, Building2 } from 'lucide-react';
import MarkdownRenderer from '@/components/MarkdownRenderer';

// NEXT.JS 15 YÊU CẦU PARAMS PHẢI LÀ PROMISE
interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // Phải await params
  
  const { data: post } = await supabase
    .from('community_posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!post) {
    return { title: 'Bài viết không tồn tại' };
  }

  return {
    title: `${post.title}`,
    description: post.meta_description,
    keywords: post.focus_keyword,
    alternates: {
      canonical: `/cong-dong/${post.slug}`,
    },
    openGraph: {
      title: `${post.title}`,
      description: post.meta_description,
      url: `/cong-dong/${post.slug}`,
      type: "article",
      publishedTime: post.created_at,
      authors: [post.author],
      images: [
        {
          url: post.thumbnail_url || 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/ogimage.png',
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const getIconForType = (type: string) => {
  switch (type) {
    case 'Thiết kế': return <PenTool className="w-3 h-3" />;
    case 'Thi công': return <Hammer className="w-3 h-3" />;
    case 'Sản xuất': return <LayoutTemplate className="w-3 h-3" />;
    case 'Kiến thức': return <BookOpen className="w-3 h-3" />;
    case 'Sự kiện': return <CalendarDays className="w-3 h-3" />;
    case 'Nội thất lẻ': return <Sofa className="w-3 h-3" />;
    case 'Dự án': return <Building2 className="w-3 h-3" />;
    default: return <BookOpen className="w-3 h-3" />;
  }
};

export default async function CommunityPostPage({ params }: Props) {
  const { slug } = await params; // Phải await params

  const { data: post, error } = await supabase
    .from('community_posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !post) {
    notFound();
  }

  const { data: relatedPosts } = await supabase
    .from('community_posts')
    .select('*')
    .neq('id', post.id)
    .limit(3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    image: post.thumbnail_url,
    datePublished: post.created_at,
    dateModified: post.created_at,
    author: {
      '@type': 'Person',
      name: post.author || 'Happy Furniture'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Happy Furniture',
      logo: {
        '@type': 'ImageObject',
        url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/favicon.png'
      }
    }
  };

  return (
    <div className="bg-ivory min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      {/* Article Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-wood/80 z-10" />
        <OptimizedImage 
          src={post.thumbnail_url} 
          alt={post.title} 
          aspectRatio="video"
          className="absolute inset-0 w-full h-full object-cover"
          priority={true} 
        />
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center mt-20">
          {post.type && (
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20 text-white">
              {getIconForType(post.type)}
              <span className="text-[10px] font-bold uppercase tracking-widest">{post.type}</span>
            </div>
          )}
          <h1 className="text-[32px] md:text-[48px] font-serif font-bold text-white mb-8 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-[12px] text-white/80 uppercase tracking-widest font-bold">
            <span>{new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-maroon" />
            <span>{post.author}</span>
          </div>
        </div>
      </section>

      {/* Content wrapper */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <Link 
          href="/cong-dong" 
          className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-wood/60 hover:text-maroon transition-colors mb-10"
        >
          <ChevronLeft className="w-4 h-4" /> TRỞ VỀ TRANG CỘNG ĐỒNG
        </Link>
        
        <div className="bg-white p-6 sm:p-10 md:p-16 rounded-2xl shadow-xl shadow-wood/5 border border-wood/10">
          <article className="prose prose-wood max-w-none lg:prose-lg prose-img:rounded-2xl prose-img:w-full prose-img:object-cover prose-img:shadow-md prose-a:text-maroon">
            {/* Sử dụng Client Component để Render nội dung bài viết */}
            <MarkdownRenderer content={post.content} />
          </article>
        </div>
      </section>

      {/* Related Posts Section */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="bg-white py-24 border-t border-wood/5 mt-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-serif font-bold text-wood mb-2">Bài viết liên quan</h2>
                <p className="text-wood/60">Khám phá thêm các kiến thức và xu hướng mới.</p>
              </div>
              <Link href="/cong-dong" className="hidden md:inline-block text-[12px] font-bold uppercase tracking-widest text-maroon hover:text-wood transition-colors">
                Xem tất cả
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost: any) => (
                <article key={relatedPost.id} className="bg-ivory rounded-sm overflow-hidden border border-wood/5 hover:border-maroon/30 transition-all group flex flex-col h-full shadow-sm">
                  <Link href={`/cong-dong/${relatedPost.slug}`} className="block h-full flex flex-col">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <OptimizedImage 
                        src={relatedPost.thumbnail_url} 
                        alt={relatedPost.title} 
                        aspectRatio="video"
                        className="w-full h-full group-hover:scale-105 transition-transform duration-700 object-cover"
                      />
                      {relatedPost.type && (
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                          <span className="text-maroon">{getIconForType(relatedPost.type)}</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-wood">{relatedPost.type}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-[11px] text-wood/40 uppercase tracking-widest mb-4 font-bold">
                        <span>{new Date(relatedPost.created_at).toLocaleDateString('vi-VN')}</span>
                      </div>
                      
                      <h3 className="text-[18px] font-bold text-wood mb-4 group-hover:text-maroon transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      
                      <p className="text-wood/60 text-sm leading-relaxed mb-8 line-clamp-3">
                        {relatedPost.meta_description}
                      </p>
                      
                      <div className="mt-auto block text-center w-full bg-white border border-wood/10 text-wood py-3 rounded-sm font-bold uppercase tracking-widest text-[11px] group-hover:bg-maroon group-hover:text-white group-hover:border-maroon transition-all">
                        Đọc tiếp
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}