import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { OptimizedImage } from '@/components/OptimizedImage';

export const revalidate = 60; 

// 1. Cập nhật type của params thành Promise
export default async function CategoryPage({ params }: { params: Promise<{ category: string, locale: string }> }) {
  
  // 2. THÊM AWAIT VÀO ĐÂY ĐỂ ĐỢI NEXT.JS LẤY URL XONG
  const { category, locale } = await params; 

  let dbCategoryName = '';
  if (category.includes('tu-quan-ao')) dbCategoryName = 'Tủ';
  else if (category.includes('giuong')) dbCategoryName = 'Giường';
  else if (category.includes('tu-dau-giuong')) dbCategoryName = 'Tủ đầu giường';
  else if (category.includes('tu-giay')) dbCategoryName = 'Tủ giày';
  else if (category.includes('ke-trang-tri')) dbCategoryName = 'Kệ';
  else if (category.includes('ban-')) dbCategoryName = 'Bàn';
  else dbCategoryName = category;

  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, slug, price, old_price, images')
    .ilike('category', `%${dbCategoryName}%`); 

  if (error || !products || products.length === 0) {
    notFound();
  }

  const formatPrice = (price: number) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  return (
    <div className="pt-24 pb-32 bg-ivory min-h-screen">
       <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 border-b border-wood/10 pb-6">
            <div>
              <h1 className="text-[32px] md:text-[40px] font-serif font-bold text-wood capitalize mb-2">
                {category.replace(/-/g, ' ')}
              </h1>
              <p className="text-wood/60 text-sm">Tìm thấy {products.length} sản phẩm phù hợp</p>
            </div>
          </div>
       </div>
       
       <div className="max-w-7xl mx-auto px-6">
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