import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import CategoryClient from './CategoryClient';
import type { Metadata } from 'next';

export const revalidate = 60;

const resolveTypeCode = (category: string): string => {
  if (category.includes('tu-quan-ao')) return 'WD';
  if (category.includes('giuong-ngu')) return 'BE';
  if (category.includes('tu-dau-giuong')) return 'BS';
  if (category.includes('tu-hoc-keo')) return 'DC';
  if (category.includes('tu-luu-tru') || category.includes('tu-kho')) return 'ST';
  if (category.includes('tu-giay')) return 'SC';
  if (category.includes('ke-trang-tri')) return 'SH';
  if (category.includes('ke-tivi')) return 'TV';
  if (category.includes('ban-lam-viec')) return 'OT';
  if (category.includes('ban-console')) return 'CO';
  if (category.includes('ban-tra-ca-phe')) return 'CF';
  if (category.includes('ban-an')) return 'DT';
  return '';
};

export async function generateMetadata({ params }: { params: Promise<{ category: string; locale: string }> }): Promise<Metadata> {
  const { category, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'CategoryPage' });
  
  const typeCode = resolveTypeCode(category);
  const displayTitle = typeCode
    ? t(`names.${typeCode}`)
    : category.replace(/-mdf/g, '').replace(/-/g, ' ');
  
  const seoTitle = t('metaTitle', { name: displayTitle });
  const seoDescription = t('metaDesc', { name: displayTitle });

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: `https://www.happyfurniture.net/${locale === 'en' ? 'en/' : ''}danh-muc/${category}`,
      languages: {
        vi: `https://www.happyfurniture.net/danh-muc/${category}`,
        en: `https://www.happyfurniture.net/en/danh-muc/${category}`,
      }
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://www.happyfurniture.net/${locale === 'en' ? 'en/' : ''}danh-muc/${category}`,
      type: 'website',
    }
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string; locale: string }> }) {
  const { category, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'CategoryPage' });

  const typeCode = resolveTypeCode(category);

  let query = supabase
    .from('products')
    .select('id, group_id, name, slug, sku, price, old_price, size, dimensions, material_code, images, is_avatar')
    .order('is_avatar', { ascending: false });
  
  if (typeCode) {
    query = query.eq('type_code', typeCode);
  } else {
    query = query.ilike('category', `%${category.split('-')[0]}%`); 
  }

  const { data: products, error } = await query;

  if (error || !products || products.length === 0) {
    notFound();
  }

  const displayTitle = typeCode
    ? t(`names.${typeCode}`)
    : category.replace(/-mdf/g, '').replace(/-/g, ' ');

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.map((p, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://www.happyfurniture.net/${locale === 'en' ? 'en/' : ''}san-pham/${p.slug}`
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <CategoryClient
        categorySlug={category}
        typeCode={typeCode}
        displayTitle={displayTitle}
        initialProducts={products}
      />
    </>
  );
}