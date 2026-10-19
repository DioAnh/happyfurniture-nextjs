import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { OptimizedImage } from '@/components/OptimizedImage';
import type { Metadata } from 'next';

export const revalidate = 60; // Cache 60s

// ==============================================================
// 1. TỐI ƯU THẺ META (TITLE & DESCRIPTION) ĐỘNG CHO TỪNG DANH MỤC
// ==============================================================
export async function generateMetadata({ params }: { params: Promise<{ category: string, locale: string }> }): Promise<Metadata> {
  const { category, locale } = await params;
  
  // Xử lý chuỗi URL thành Tên có nghĩa (VD: 'tu-quan-ao-mdf' -> 'tu quan ao')
  const displayTitle = category.replace(/-mdf/g, '').replace(/-/g, ' ');
  
  // Custom SEO Title & Description nhồi từ khóa mạnh
  const seoTitle = `100+ Mẫu ${displayTitle} Đẹp, Hiện Đại, Giá Xưởng | Happy Furniture`;
  const seoDescription = `Mua ${displayTitle} gỗ công nghiệp MDF lõi xanh chống ẩm chuẩn E2. Thiết kế hiện đại, tinh giản. Sản xuất trực tiếp tại xưởng Bình Dương, miễn phí lắp đặt.`;

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: `https://www.happyfurniture.net/danh-muc/${category}`,
      languages: {
        vi: `https://www.happyfurniture.net/danh-muc/${category}`,
        en: `https://www.happyfurniture.net/en/danh-muc/${category}`,
      }
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://www.happyfurniture.net/danh-muc/${category}`,
      type: 'website',
    }
  };
}


export default async function CategoryPage({ params }: { params: Promise<{ category: string, locale: string }> }) {
  const { category, locale } = await params;

  let typeCode = '';
  if (category.includes('tu-quan-ao')) typeCode = 'WD';
  else if (category.includes('giuong-ngu')) typeCode = 'BE';
  else if (category.includes('tu-dau-giuong')) typeCode = 'BS';
  else if (category.includes('tu-hoc-keo')) typeCode = 'DC';
  else if (category.includes('da-nang') || category.includes('tu-kho')) typeCode = 'ST';
  else if (category.includes('tu-giay')) typeCode = 'SC';
  else if (category.includes('ke-trang-tri')) typeCode = 'SH';
  else if (category.includes('ke-tivi')) typeCode = 'TV';
  else if (category.includes('ban-lam-viec')) typeCode = 'OT';
  else if (category.includes('ban-console')) typeCode = 'CO';
  else if (category.includes('ban-tra-ca-phe')) typeCode = 'CF';
  else if (category.includes('ban-an')) typeCode = 'DT';

  let query = supabase.from('products').select('id, name, slug, price, old_price, images');
  
  if (typeCode) {
    query = query.eq('type_code', typeCode);
  } else {
    query = query.ilike('category', `%${category.split('-')[0]}%`); 
  }

  const { data: products, error } = await query;

  if (error || !products || products.length === 0) {
    notFound();
  }

  const formatPrice = (price: number) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  const displayTitle = category.replace(/-mdf/g, '').replace(/-/g, ' ');

  // ==============================================================
  // 2. TẠO SCHEMA ITEMLIST CHO GOOGLE ĐỌC (Tăng khả năng lên Top)
  // ==============================================================
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.map((p, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://www.happyfurniture.net/san-pham/${p.slug}`
    }))
  };

  return (
    <div className="pt-24 pb-32 bg-ivory min-h-screen">
       {/* Inject Schema Ẩn vào mã nguồn */}
       <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

       <div className="max-w-7xl mx-auto px-6 mb-10">
          
          {/* ==============================================================
              3. KHỐI CONTENT SEO CHUẨN (GIỐNG ĐỐI THỦ NHƯNG SANG TRỌNG HƠN)
              ============================================================== */}
          <div className="bg-white rounded-lg p-8 border border-wood/10 shadow-sm mb-12">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="lg:w-2/3 space-y-4">
                <h1 className="text-[30px] md:text-[38px] font-serif font-bold text-wood capitalize leading-tight">
                  100+ Mẫu {displayTitle} Đẹp, Hiện Đại & Bền Bỉ
                </h1>
                <p className="text-wood/80 leading-relaxed text-[15px]">
                  <strong className="capitalize text-maroon">{displayTitle}</strong> là mảnh ghép không thể thiếu trong không gian nội thất hiện đại. Tại Happy Furniture, chúng tôi cung cấp các dòng sản phẩm được gia công 100% từ <strong>gỗ công nghiệp MDF lõi xanh chống ẩm Ba Thanh (tiêu chuẩn E2)</strong>, đảm bảo độ bền vượt thời gian, chống cong vênh và tuyệt đối an toàn cho sức khỏe hô hấp của gia đình bạn.
                </p>
                <p className="text-wood/80 leading-relaxed text-[15px]">
                  Đặc biệt, với lợi thế <strong className="text-wood">sản xuất trực tiếp tại xưởng</strong> không qua trung gian đại lý, khách hàng sẽ nhận được mức giá tận gốc cực kỳ tối ưu. Kèm theo đó là chính sách bảo hành kỹ thuật 12 tháng, miễn phí vận chuyển & lắp đặt tận nhà khu vực TP.HCM và Bình Dương.
                </p>
              </div>
              <div className="lg:w-1/3 w-full aspect-[4/3] rounded-md overflow-hidden bg-wood/5 relative shadow-inner border border-wood/10">
                 {/* Lấy ảnh sản phẩm đầu tiên của mảng làm ảnh đại diện cho khối SEO */}
                 <OptimizedImage
                    src={products[0]?.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800'}
                    alt={`Mua ${displayTitle} giá xưởng`}
                    tier="detail"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                 />
                 <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-wood/10 shadow-sm">
                   <span className="text-[10px] font-bold text-maroon uppercase tracking-widest">Giá Tại Xưởng</span>
                 </div>
              </div>
            </div>
          </div>

          {/* ==============================================================
              4. THANH CÔNG CỤ & KẾT QUẢ TÌM KIẾM
              ============================================================== */}
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 border-b border-wood/10 pb-6 mb-8">
            <h2 className="text-xl font-bold text-wood">Danh sách sản phẩm ({products.length})</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-wood/60">Sắp xếp:</span>
              <select className="border border-wood/20 rounded px-3 py-1.5 text-sm bg-white outline-none focus:border-maroon font-medium text-wood cursor-pointer">
                <option>Mặc định</option>
                <option>Giá: Thấp đến cao</option>
                <option>Giá: Cao đến thấp</option>
              </select>
            </div>
          </div>

         {/* ==============================================================
             5. LƯỚI SẢN PHẨM (Grid)
             ============================================================== */}
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <Link 
                href={`/san-pham/${product.slug}`} 
                key={product.id} 
                className="group block bg-white rounded-sm border border-wood/5 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-square relative overflow-hidden bg-wood/5 border-b border-wood/5">
                   <OptimizedImage
                     src={product.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800'}
                     alt={product.name}
                     tier="card" 
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                   />
                </div>
                
                <div className="p-4 md:p-5">
                   <h3 className="font-bold text-wood text-[13px] md:text-[14px] mb-2 line-clamp-2 group-hover:text-maroon transition-colors leading-relaxed">
                     {product.name}
                   </h3>
                   <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-3">
                     <span className="text-maroon font-bold text-[15px] md:text-[16px]">
                       {formatPrice(product.price)}
                     </span>
                     {product.old_price && (
                       <span className="text-wood/40 text-[12px] line-through">
                         {formatPrice(product.old_price)}
                       </span>
                     )}
                   </div>
                </div>
              </Link>
            ))}
         </div>
       </div>
    </div>
  );
}