import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import ProductDetailClient from './ProductDetailClient';
import { notFound } from 'next/navigation';

// NEXT.JS 15 YÊU CẦU PARAMS PHẢI LÀ PROMISE
interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // BẮT BUỘC PHẢI AWAIT
  
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!product) {
    return { title: 'Sản phẩm không tồn tại' };
  }

  return {
    title: `${product.seo_title || product.name}`,
    description: product.description?.substring(0, 160),
    alternates: {
      canonical: `/san-pham/${product.slug}`,
    },
    openGraph: {
      title: `${product.seo_title || product.name}`,
      description: product.description?.substring(0, 160),
      url: `/san-pham/${product.slug}`,
      images: [
        {
          url: product.images?.[0] || 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/ogimage.png',
          width: 800,
          height: 800,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params; // BẮT BUỘC PHẢI AWAIT

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!product) {
    notFound(); 
  }

  const productSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.sku || product.id,
    brand: { '@type': 'Brand', name: 'Happy Furniture' },
    offers: {
      '@type': 'Offer',
      url: `https://www.happyfurniture.net/san-pham/${product.slug}`,
      priceCurrency: 'VND',
      price: product.price,
      availability: product.stock_status?.toLowerCase().includes('còn hàng')
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '24',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductDetailClient initialProduct={product} />
    </>
  );
}