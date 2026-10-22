'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, ArrowRight, ChevronRight, Mail, PenTool, LayoutTemplate, Hammer, BookOpen, CalendarDays, Sofa, Building2 } from 'lucide-react';
import { Link } from '@/routing';
import { OptimizedImage } from '@/components/OptimizedImage';
import { useLocale, useTranslations } from 'next-intl';

const CATEGORY_MAP = [
  { dbValue: 'Tất cả', labelKey: 'all' },
  { dbValue: 'Thiết kế', labelKey: 'design' },
  { dbValue: 'Thi công', labelKey: 'build' },
  { dbValue: 'Sản xuất', labelKey: 'production' },
  { dbValue: 'Kiến thức', labelKey: 'knowledge' },
  { dbValue: 'Sự kiện', labelKey: 'event' },
  { dbValue: 'Nội thất lẻ', labelKey: 'retail' },
  { dbValue: 'Dự án', labelKey: 'project' }
] as const;

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

export default function CommunityClient({ initialPosts }: { initialPosts: any[] }) {
  const t = useTranslations('CommunityPage');
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState('Tất cả');

  const filteredPosts = activeCategory === 'Tất cả' 
    ? initialPosts 
    : initialPosts.filter(post => post.type === activeCategory);

  const translateType = (dbType: string) => {
    const found = CATEGORY_MAP.find(c => c.dbValue === dbType);
    return found ? t(`categories.${found.labelKey}`) : dbType;
  };

  return (
    <div className="bg-ivory min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-wood text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <OptimizedImage 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop" 
            alt={t('title')} 
            aspectRatio="video"
            className="w-full h-full"
            priority={true}
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/20"
          >
            <Users className="w-4 h-4 text-maroon" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-white">{t('badge')}</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[42px] md:text-[56px] font-serif font-bold mb-6 leading-tight"
          >
            {t('title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            {t('desc')}
          </motion.p>
        </div>
      </section>

      {/* Categories & Content */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {CATEGORY_MAP.map((cat) => (
            <button
              key={cat.dbValue}
              onClick={() => setActiveCategory(cat.dbValue)}
              className={`px-6 py-3 rounded-full text-[12px] font-bold uppercase tracking-widest transition-all ${
                activeCategory === cat.dbValue 
                  ? 'bg-maroon text-white shadow-lg shadow-maroon/20' 
                  : 'bg-white text-wood/60 hover:bg-ivory hover:text-maroon border border-wood/10'
              }`}
            >
              {t(`categories.${cat.labelKey}`)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-sm overflow-hidden border border-wood/5 hover:border-maroon/30 transition-all group flex flex-col h-full shadow-sm hover:shadow-xl"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <OptimizedImage 
                  src={post.thumbnail_url} 
                  alt={post.title} 
                  aspectRatio="video"
                  className="w-full h-full group-hover:scale-105 transition-transform duration-700 object-cover"
                />
                {post.type && (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                    <span className="text-maroon">{getIconForType(post.type)}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-wood">{translateType(post.type)}</span>
                  </div>
                )}
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-[11px] text-wood/40 uppercase tracking-widest mb-4 font-bold">
                  <span>{new Date(post.created_at).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US')}</span>
                  <span className="w-1 h-1 rounded-full bg-wood/20" />
                  <span>{post.author}</span>
                </div>
                
                <h3 className="text-[20px] font-bold text-wood mb-4 group-hover:text-maroon transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-wood/60 text-sm leading-relaxed mb-8 line-clamp-3 flex-1">
                  {post.meta_description}
                </p>
                
                <Link 
                  href={`/cong-dong/${post.slug}`} 
                  className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-maroon group-hover:gap-4 transition-all mt-auto"
                >
                  {t('readMore')} <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Newsletter / Join CTA */}
      <section className="py-24 bg-wood text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="w-16 h-16 bg-maroon/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Mail className="w-8 h-8 text-maroon" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            {t('nlTitle')}
          </h2>
          <p className="text-white/70 mb-10 text-lg">
            {t('nlDesc')}
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder={t('nlPlaceholder')} 
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-maroon transition-colors"
              required
            />
            <button 
              type="submit"
              className="bg-maroon text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[12px] hover:bg-white hover:text-maroon transition-all flex items-center justify-center gap-2 shrink-0"
            >
              {t('nlBtn')} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}