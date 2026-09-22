import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import ProductDetailClient from './ProductDetailClient';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (productError || !product) {
    return { title: 'Sản phẩm không tồn tại | Happy Furniture' };
  }

  // Fetch group an toàn (có thể null nếu data chưa chuẩn)
  let groupDescription = '';
  if (product.group_id) {
    const { data: group } = await supabase
      .from('product_groups')
      .select('description')
      .eq('id', product.group_id)
      .single();
    if (group?.description) {
      groupDescription = group.description;
    }
  }

  // Xử lý an toàn khi images bị NULL hoặc rỗng
  const images = Array.isArray(product.images) ? product.images : [];
  const imageUrl = images.length > 0 
    ? images[0] 
    : 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/ogimage.png';

  const title = product.name || 'Sản Phẩm Nội Thất';
  const description = groupDescription.substring(0, 160) || 'Khám phá sản phẩm nội thất cao cấp từ Happy Furniture.';

  return {
    title: `${title} | Happy Furniture`,
    description: description,
    alternates: { canonical: `/san-pham/${product.slug}` },
    openGraph: {
      title: `${title} | Happy Furniture`,
      description: description,
      url: `/san-pham/${product.slug}`,
      images: [{ url: imageUrl, width: 800, height: 800 }],
    }
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  // 1. Fetch Biến thể hiện tại
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (productError || !product) {
    notFound(); 
  }

  // 2. Fetch Thông tin gốc (Group) an toàn
  let groupData = null;
  if (product.group_id) {
    const { data: group } = await supabase
      .from('product_groups')
      .select('*')
      .eq('id', product.group_id)
      .single();
    groupData = group;
  }

  // 3. Fetch Toàn bộ biến thể của Group này an toàn
  let groupVariants: any[] = [];
  if (product.group_id) {
    const { data: variants } = await supabase
      .from('products')
      .select('slug, size, material_code, material')
      .eq('group_id', product.group_id);
    if (variants) {
      groupVariants = variants;
    }
  }

  // 4. Gộp thông tin gốc và Xử lý an toàn các giá trị NULL
  const mergedProduct = {
    ...product,
    description: groupData?.description || 'Chi tiết sản phẩm đang được cập nhật.', 
    base_name: groupData?.name || product.name || 'Sản phẩm nội thất',
    rooms: groupData?.rooms || '[]',
    images: Array.isArray(product.images) ? product.images : [],
    price: product.price || 0,
    old_price: product.old_price || null,
    sku: product.sku || 'N/A',
    size: product.size || 'M',
    material_code: product.material_code || 'N/A',
    material: product.material || 'Vật liệu tiêu chuẩn'
  };

  return (
    <ProductDetailClient 
      initialProduct={mergedProduct} 
      groupVariants={groupVariants} 
    />
  );
}