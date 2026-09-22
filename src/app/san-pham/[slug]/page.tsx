import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import ProductDetailClient from './ProductDetailClient';
import { notFound } from 'next/navigation';

// FIX: Yêu cầu Vercel KHÔNG ĐƯỢC CACHE trang này, luôn lấy data mới nhất từ Supabase
export const revalidate = 0; 
export const dynamic = 'force-dynamic';

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

  // Ưu tiên lấy description của product (Biến thể), nếu ko có mới lấy của group (Gốc)
  let descriptionText = product.description || '';
  if (!descriptionText && product.group_id) {
    const { data: group } = await supabase
      .from('product_groups')
      .select('description')
      .eq('id', product.group_id)
      .single();
    if (group?.description) {
      descriptionText = group.description;
    }
  }

  const images = Array.isArray(product.images) ? product.images : [];
  const imageUrl = images.length > 0 
    ? images[0] 
    : 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/ogimage.png';

  const title = product.name || 'Sản Phẩm Nội Thất';
  
  // Tối ưu Meta Description chứa từ khóa mạnh
  const finalDescription = descriptionText 
    ? descriptionText.substring(0, 150) + '... Sản xuất trực tiếp từ ván MDF lõi xanh Ba Thanh chuẩn E2. Miễn phí lắp đặt.'
    : `Mua ${title} thiết kế hiện đại, ván MDF lõi xanh chống ẩm chuẩn E2. Sản xuất trực tiếp tại xưởng Happy Furniture. Bảo hành 12 tháng.`;

  return {
    title: `${title} | Xưởng Nội Thất Happy Furniture`, // Nối thêm đuôi Branding Local
    description: finalDescription,
    alternates: { canonical: `https://happyfurniture.vn/san-pham/${product.slug}` }, // URL chuẩn SEO (nhớ đổi domain thực tế)
    openGraph: {
      title: `${title} | Happy Furniture`,
      description: finalDescription,
      url: `https://happyfurniture.vn/san-pham/${product.slug}`, // URL chuẩn SEO
      images: [{ url: imageUrl, width: 800, height: 800, alt: title }],
      type: 'website',
    }
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  const { data: product, error: productError } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (productError || !product) {
    notFound(); 
  }

  let groupData = null;
  if (product.group_id) {
    const { data: group } = await supabase
      .from('product_groups')
      .select('*')
      .eq('id', product.group_id)
      .single();
    groupData = group;
  }

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

  // Tối ưu hóa dữ liệu truyền xuống Client
  const mergedProduct = {
    ...product,
    description: product.description || groupData?.description || 'Chi tiết sản phẩm đang được cập nhật.', 
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

  // --- VŨ KHÍ BÍ MẬT: SCHEMA MARKUP (JSON-LD) CHO GOOGLE BOT ---
  
  // 1. Schema Sản phẩm (Product) -> Hiển thị giá, trạng thái kho, 5 ngôi sao trên Google
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": mergedProduct.name,
    "image": mergedProduct.images,
    "description": mergedProduct.description.substring(0, 200),
    "sku": mergedProduct.sku,
    "brand": {
      "@type": "Brand",
      "name": "Happy Furniture"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://happyfurniture.vn/san-pham/${mergedProduct.slug}`,
      "priceCurrency": "VND",
      "price": mergedProduct.price,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock" // Khai báo luôn còn hàng
    },
    "aggregateRating": { // Hiển thị 5 ngôi sao trên Google Search
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "12" // Khớp với số (12) hiển thị trên Client
    }
  };

  // 2. Schema Câu hỏi thường gặp (FAQPage) -> Chiếm diện tích cực lớn trên trang tìm kiếm Google
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Chất liệu cốt gỗ của ${mergedProduct.base_name} là gì?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Happy Furniture sử dụng 100% gỗ công nghiệp MDF lõi xanh chống ẩm tiêu chuẩn E2 nhập trực tiếp từ Ba Thanh. Khung và đợt tủ dày chuẩn 17mm (không dùng loại 15mm), bề mặt phủ Melamine cao cấp chống xước, chống cong vênh.`
        }
      },
      {
        "@type": "Question",
        "name": `Xưởng có hỗ trợ làm theo kích thước nhà tôi không?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Chắc chắn có. Happy Furniture là xưởng sản xuất trực tiếp. Nếu các Size tiêu chuẩn (S, M, L) không vừa không gian, đội ngũ kỹ thuật sẽ đến tận nơi đo đạc và may đo lại chính xác theo yêu cầu của bạn.`
        }
      },
      {
        "@type": "Question",
        "name": `Thời gian giao hàng tận nơi là bao lâu?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Với các sản phẩm lẻ thuộc bộ sưu tập có sẵn, thời gian gia công và lắp ráp tại xưởng là 3-7 ngày. Khu vực Bình Dương và TP.HCM sẽ được xếp lịch giao và lắp ráp tận phòng ngay sau khi hoàn thiện.`
        }
      }
    ]
  };

  return (
    <>
      {/* Chèn đoạn mã Script JSON-LD vào DOM ẩn để Google Bot cào dữ liệu */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* Component Giao diện hiển thị cho người dùng */}
      <ProductDetailClient 
        initialProduct={mergedProduct} 
        groupVariants={groupVariants} 
      />
    </>
  );
}