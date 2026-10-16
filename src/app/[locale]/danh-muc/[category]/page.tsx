import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

// 1. SỬA DÒNG NÀY: Trỏ đúng vào tên file ProductsClient.tsx của bạn
import ProductsClient from '../../san-pham/ProductListingClient'; 

export const revalidate = 60; 

export default async function CategoryPage({ params }: { params: { category: string, locale: string } }) {
  const { category, locale } = params;

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
    .select('*, product_groups(name, description)')
    .ilike('category', `%${dbCategoryName}%`); 

  if (error || !products || products.length === 0) {
    notFound();
  }

  return (
    <div className="pt-24 pb-20 bg-ivory min-h-screen">
       <div className="max-w-7xl mx-auto px-6 mb-12">
          <h1 className="text-4xl font-serif font-bold text-wood capitalize">
            {category.replace(/-/g, ' ')}
          </h1>
       </div>
       
       {/* 2. SỬA DÒNG NÀY: Dùng đúng tên Component */}
       <ProductsClient initialProducts={products} />
    </div>
  );
}