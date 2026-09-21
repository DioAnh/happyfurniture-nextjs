'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, X, ChevronRight, Search, SlidersHorizontal } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { OptimizedImage } from '@/components/OptimizedImage';
import { CategorySelectionCard } from '@/components/CategorySelectionCard';
import { supabase } from '@/lib/supabase';

// --- DATA CỐ ĐỊNH ---
// Xóa RANGES cũ, thay bằng DESIGN_LINES mới
export const DESIGN_LINES = [
  { code: 'MIN', name: 'Minimal Functional' },
  { code: 'MOD', name: 'Modern European' }
];

export const TYPES = ['WD', 'BS', 'DC', 'TV', 'OT', 'SH', 'SC', 'ST', 'CO', 'CF', 'DT', 'BE'];

export const TYPE_TRANSLATIONS: Record<string, string> = {
  'SH': 'Kệ trang trí', 'DC': 'Tủ hộc kéo', 'SC': 'Tủ giày', 'ST': 'Tủ kho', 'WD': 'Tủ quần áo',
  'OT': 'Bàn làm việc', 'TV': 'Kệ TV', 'CO': 'Bàn console', 'CF': 'Bàn cà phê', 'DT': 'Bàn ăn',
  'BE': 'Giường', 'BS': 'Tủ đầu giường'
};

export const DEMO_IMAGES = {
  categories: {
    'WD': 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/product-images/Aura/tu-quan-ao-mdf-aura-vua-roomshot-01.webp',
    'BS': 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/product-images/Cosmic/tu-dau-giuong-mdf-cosmic-vua-roomshot-01.webp',
    'DC': 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/product-images/Aether/tu-hoc-keo-mdf-aether-vua-roomshot-01.webp',
    'TV': 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/product-images/Woodland/tu-ke-tivi-mdf-woodland-vua-roomshot-01.webp',
    'OT': 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/product-images/Amberglow/ban-lam-viec-hoc-keo-mdf-amberglow-vua-roomshot-01.webp',
    'SH': 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/product-images/Amberglow/ke-trang-tri-mdf-amberglow-vua-roomshot-01.webp',
    'SC': 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/product-images/Woodland/tu-giay-mdf-woodland-vua-roomshot-01.webp',
    'ST': 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/product-images/Aura/tu-dung-do-da-nang-mdf-aura-lon-roomshot-01.webp',
    'CO': 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/product-images/Aether/ban-console-trang-tri-mdf-aether-vua-roomshot-01.webp',
    'CF': 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/product-images/Aura/ban-ca-phe-mdf-aura-vua-roomshot-01.webp',
    'DT': 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/product-images/Aether/ban-an-mdf-aether-vua-roomshot-01.webp',
    'BE': 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/product-images/Cosmic/giuong-mdf-cosmic-vua-roomshot-01.webp',
  }
};

// --- LOGIC COMPONENT ---
function ProductListingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [productGroups, setProductGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả'); 
  const [selectedMaterialType, setSelectedMaterialType] = useState<string>('Tất cả');
  const [priceRange, setPriceRange] = useState<string>('Tất cả');
  const [showOnlyDiscount, setShowOnlyDiscount] = useState<boolean>(false);
  const [selectedDesignLine, setSelectedDesignLine] = useState<string>('Tất cả');
  const [selectedType, setSelectedType] = useState<string>('Tất cả');

  // Khai báo state cho tính năng Xem thêm (Load More)
  const ITEMS_PER_PAGE = 18;
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);

  const filterSummaryRef = useRef<HTMLDivElement>(null);

  // Lấy data THEO CẤU TRÚC MỚI (Group + Variants)
  useEffect(() => {
    async function fetchProductGroups() {
      setLoading(true);
      // Lấy toàn bộ groups kèm các variants (products) chưa bị ẩn
      const { data, error } = await supabase
        .from('product_groups')
        .select(`
          *,
          products (*)
        `);

        // THÊM 2 DÒNG LOG NÀY VÀO
      console.log("Supabase Error:", error);
      console.log("Supabase Data:", data);
      
      if (data) {
        // Lọc bỏ các group chưa có variants nào sinh ra để tránh lỗi UI
        const validGroups = data.filter(group => group.products && group.products.length > 0);
        setProductGroups(validGroups);
      } else {
        console.error("Lỗi lấy sản phẩm từ Supabase", error);
      }
      setLoading(false);
    }
    fetchProductGroups();
  }, []);

  // Xử lý Search Params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    setSelectedCategory(categoryParam || 'Tất cả');

    const typeParam = searchParams.get('type');
    setSelectedType(typeParam || 'Tất cả');

    const designParam = searchParams.get('design_line');
    setSelectedDesignLine(designParam || 'Tất cả');
  }, [searchParams]);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [selectedCategory, selectedMaterialType, priceRange, showOnlyDiscount, selectedDesignLine, selectedType, searchParams.get('search')]);

  // Chuẩn bị dữ liệu hiển thị Đại diện cho mỗi Group
  const representativeProducts = productGroups.map(group => {
    // Ưu tiên chọn size M, nếu không có lấy biến thể đầu tiên
    const variants = group.products || [];
    let repVariant = variants.find((v: any) => v.size === 'M') || variants[0];
    
    // Nếu biến thể chưa có ảnh (do DB mới tạo), fallback tạm thời dùng DEMO_IMAGES
    const defaultImage = DEMO_IMAGES.categories[group.type_code as keyof typeof DEMO_IMAGES.categories] || DEMO_IMAGES.categories['WD'];
    const imagesToDisplay = (repVariant.images && repVariant.images.length > 0) ? repVariant.images : [defaultImage];

    return {
      group_id: group.id,
      name: group.name,
      base_slug: group.slug,
      design_code: group.design_code,
      type_code: group.type_code,
      rooms: group.rooms,
      description: group.description,
      // Dữ liệu từ biến thể đại diện
      variant_id: repVariant.id,
      slug: repVariant.slug, // Dùng slug của biến thể làm URL để load trang chi tiết
      sku: repVariant.sku,
      price: repVariant.price,
      old_price: repVariant.old_price,
      size: repVariant.size,
      material_code: repVariant.material_code,
      images: imagesToDisplay,
      // Tính toán thêm tổng số biến thể màu/size để hiển thị tag "Có X tùy chọn"
      totalVariants: variants.length,
      availableColors: Array.from(new Set(variants.map((v:any) => v.material_code))).length
    };
  });

  const filteredProducts = representativeProducts.filter(product => {
    let matchRoom = true;
    if (selectedCategory !== 'Tất cả') {
      matchRoom = product.rooms ? product.rooms.includes(selectedCategory) : false;
    }

    let matchMaterialType = true;
    if (selectedMaterialType !== 'Tất cả') {
        const isWood = product.material_code.startsWith('BT');
        if (selectedMaterialType === 'Hệ vân gỗ') matchMaterialType = isWood;
        else if (selectedMaterialType === 'Hệ màu đơn sắc') matchMaterialType = !isWood;
    }

    let matchPrice = true;
    if (priceRange !== 'Tất cả') {
      if (!product.price) {
        matchPrice = false;
      } else {
        const p = product.price;
        if (priceRange === 'Dưới 3 triệu') matchPrice = p < 3000000;
        else if (priceRange === 'Dưới 5 triệu') matchPrice = p < 5000000;
        else if (priceRange === 'Dưới 9 triệu') matchPrice = p < 9000000;
        else if (priceRange === 'Dưới 15 triệu') matchPrice = p < 15000000;
        else if (priceRange === 'Trên 15 triệu') matchPrice = p >= 15000000;
      }
    }

    let matchType = false;
    if (selectedType === 'Tất cả') {
      matchType = true;
    } else {
      const searchKeyword = TYPE_TRANSLATIONS[selectedType]?.toLowerCase() || selectedType.toLowerCase();
      let isNameMatch = product.name.toLowerCase().includes(searchKeyword);
      
      if (selectedType === 'BE' && product.name.toLowerCase().includes('tủ đầu giường')) {
        isNameMatch = false;
      }
      matchType = product.type_code === selectedType || isNameMatch;
    }

    const matchDiscount = !showOnlyDiscount || (product.old_price && product.old_price > product.price);
    const matchDesignLine = selectedDesignLine === 'Tất cả' || product.design_code === selectedDesignLine;
    
    const searchString = searchParams.get('search');
    let matchSearch = true;
    if (searchString) {
      const lowerSearch = searchString.toLowerCase();
      matchSearch = product.name.toLowerCase().includes(lowerSearch) || 
                    (product.description || '').toLowerCase().includes(lowerSearch);
    }

    return matchSearch && matchRoom && matchMaterialType && matchPrice && matchDiscount && matchDesignLine && matchType;
  });

  const sortedAndFilteredProducts = [...filteredProducts].sort((a, b) => {
      // Ưu tiên hiện các sản phẩm có nhiều biến thể màu sắc hơn lên trước (Hấp dẫn hơn)
      return b.availableColors - a.availableColors;
  });

  const displayedProducts = sortedAndFilteredProducts.slice(0, visibleCount);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Design Line (Thay thế Range cũ) */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-wood/80 mb-4 border-b border-wood/5 pb-2">Dòng Thiết Kế</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="radio" name="design_line" className="w-4 h-4 accent-maroon" checked={selectedDesignLine === 'Tất cả'} onChange={() => setSelectedDesignLine('Tất cả')} />
            <span className={`text-[13px] font-sans transition-colors ${selectedDesignLine === 'Tất cả' ? 'text-wood font-medium' : 'text-wood/60 group-hover:text-wood'}`}>Tất cả</span>
          </label>
          {DESIGN_LINES.map((r) => (
            <label key={r.code} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" name="design_line" className="w-4 h-4 accent-maroon"
                checked={selectedDesignLine === r.code}
                onChange={() => setSelectedDesignLine(r.code)}
              />
              <span className={`text-[13px] font-sans transition-colors ${selectedDesignLine === r.code ? 'text-wood font-medium' : 'text-wood/60 group-hover:text-wood'}`}>
                {r.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Theo không gian */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-wood/80 mb-4 border-b border-wood/5 pb-2">Theo không gian</h3>
        <div className="space-y-3">
          {['Tất cả', 'Phòng khách', 'Phòng ngủ', 'Phòng bếp', 'Phòng làm việc', 'Phòng thay đồ'].map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="category" 
                className="w-4 h-4 accent-maroon" 
                checked={selectedCategory === cat}
                onChange={() => setSelectedCategory(cat)}
              />
              <span className={`text-[13px] font-sans transition-colors ${selectedCategory === cat ? 'text-wood font-medium' : 'text-wood/60 group-hover:text-wood'}`}>
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Loại bề mặt (Tách từ 13 mã màu) */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-wood/80 mb-4 border-b border-wood/5 pb-2">Loại bề mặt</h3>
        <div className="space-y-3">
          {['Tất cả', 'Hệ vân gỗ', 'Hệ màu đơn sắc'].map((mat) => (
            <label key={mat} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="material_type" 
                className="w-4 h-4 accent-maroon"
                checked={selectedMaterialType === mat}
                onChange={() => setSelectedMaterialType(mat)}
              />
              <span className={`text-[13px] font-sans transition-colors ${selectedMaterialType === mat ? 'text-wood font-medium' : 'text-wood/60 group-hover:text-wood'}`}>
                {mat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Khoảng giá */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-wood/80 mb-4 border-b border-wood/5 pb-2">Khoảng giá</h3>
        <div className="space-y-3">
          {['Tất cả', 'Dưới 3 triệu', 'Dưới 5 triệu', 'Dưới 9 triệu', 'Dưới 15 triệu', 'Trên 15 triệu'].map((range) => (
            <label key={range} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="price" 
                className="w-4 h-4 accent-maroon"
                checked={priceRange === range}
                onChange={() => setPriceRange(range)}
              />
              <span className={`text-[13px] font-sans transition-colors ${priceRange === range ? 'text-wood font-medium' : 'text-wood/60 group-hover:text-wood'}`}>
                {range}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Ưu đãi */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-wood/80 mb-4 border-b border-wood/5 pb-2">Chương trình ưu đãi</h3>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input 
            type="checkbox" 
            className="w-4 h-4 accent-maroon"
            checked={showOnlyDiscount}
            onChange={(e) => setShowOnlyDiscount(e.target.checked)}
          />
          <span className={`text-[13px] font-sans transition-colors ${showOnlyDiscount ? 'text-wood font-medium' : 'text-wood/60 group-hover:text-wood'}`}>
            Đang giảm giá
          </span>
        </label>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-ivory flex items-center justify-center">
        <div className="text-wood/40 text-sm uppercase tracking-widest animate-pulse">Đang nạp dữ liệu cửa hàng...</div>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen">
      {/* Header Section */}
      <div className="bg-ivory border-b border-wood/5 pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-wood/40 mb-3">
            <Link className="hover:text-maroon" href="/">Trang chủ</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-wood/80 font-bold">Danh mục sản phẩm</span>
          </div>
          <h1 className="text-[36px] font-serif font-bold text-wood">Sản Phẩm Nội Thất May Đo</h1>
          <p className="text-wood/60 mt-2 mb-0 max-w-4xl">Các sản phẩm nội thất với thiết kế phù hợp không gian sống hiện đại, chất liệu MDF lõi xanh chống ẩm tiêu chuẩn E2 an toàn cho sức khỏe, sản xuất theo yêu cầu cá nhân hóa từ xưởng Happy Furniture.</p>
        </div>
      </div>

      {/* LƯỚI DANH MỤC DÒNG SẢN PHẨM */}
      <div className="border-b border-wood/5 bg-ivory/30 pt-8 pb-12">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-8 md:gap-y-10">
              {TYPES.map((t) => (
                <CategorySelectionCard 
                  key={t} 
                  id={t} 
                  name={TYPE_TRANSLATIONS[t] || t}
                  image={DEMO_IMAGES.categories[t as keyof typeof DEMO_IMAGES.categories]}
                  isActive={selectedType === t}
                  onClick={() => {
                    const targetType = selectedType === t ? 'Tất cả' : t;
                    setSelectedType(targetType);
                    if (targetType !== 'Tất cả') {
                      setTimeout(() => {
                        filterSummaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 100);
                    }
                  }}
                />
              ))}
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Sidebar (Desktop) */}
          <aside className="hidden lg:block w-[250px] shrink-0">
            <div className="sticky top-[100px] h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar pb-10 pr-2">
              <FilterContent />
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Search Result Feedback */}
            {searchParams.get('search') && (
              <div className="mb-6 pb-6 border-b border-wood/5">
                <h2 className="text-xl font-bold text-wood">
                  Kết quả tìm kiếm cho: <span className="text-maroon">&quot;{searchParams.get('search')}&quot;</span>
                </h2>
                <p className="text-sm text-wood/60 mt-1">
                  Tìm thấy <span className="font-bold">{sortedAndFilteredProducts.length}</span> thiết kế phù hợp.
                </p>
              </div>
            )}

            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-8 flex justify-between items-center">
              <button 
                onClick={() => setIsFilterDrawerOpen(true)}
                className="flex items-center gap-2 bg-ivory border border-wood/10 px-6 py-3 rounded-full text-[12px] font-bold uppercase tracking-widest shadow-sm"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Bộ lọc nâng cao
              </button>
            </div>

            {/* Sticky Summary / Dynamic Header */}
            <div 
              ref={filterSummaryRef}
              className="sticky top-[80px] z-[40] bg-ivory/95 backdrop-blur-md py-4 border-b border-wood/5 mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 scroll-mt-[80px]"
            >
              <h2 className="text-2xl font-serif text-wood font-bold">
                {selectedType !== 'Tất cả' 
                  ? `Sản phẩm loại ${TYPE_TRANSLATIONS[selectedType] || selectedType}` 
                  : (selectedDesignLine !== 'Tất cả' ? `Thiết kế dòng ${DESIGN_LINES.find(r => r.code === selectedDesignLine)?.name}` : 'Tất cả thiết kế')}
              </h2>
              {(selectedType !== 'Tất cả' || selectedDesignLine !== 'Tất cả') && (
                <button 
                  onClick={() => {
                    setSelectedDesignLine('Tất cả');
                    setSelectedType('Tất cả');
                  }} 
                  className="text-maroon font-semibold hover:text-maroon/80 border-b border-maroon hover:border-maroon/80 pb-1 transition-colors uppercase tracking-[0.2em] text-xs flex-shrink-0"
                >
                  Xóa bộ lọc
                </button>
              )}
            </div>

            {/* Product Rendering */}
            {sortedAndFilteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-ivory/50 rounded-2xl">
                <p className="text-lg text-wood/60 mb-4 font-sans leading-relaxed">Không tìm thấy sản phẩm nào phù hợp với bộ lọc hiện tại.</p>
                <button onClick={() => {
                  setSelectedCategory('Tất cả'); setSelectedMaterialType('Tất cả'); setPriceRange('Tất cả'); setShowOnlyDiscount(false); setSelectedDesignLine('Tất cả'); setSelectedType('Tất cả');
                }} className="text-wood font-semibold hover:text-maroon border-b border-wood hover:border-maroon pb-1 transition-colors uppercase tracking-[0.2em] text-xs">
                  Xóa bộ lọc & xem tất cả
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                  {displayedProducts.map((product) => (
                    <motion.div
                      key={product.group_id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="group cursor-pointer flex flex-col"
                    >
                      <Link className="block" href={`/san-pham/${product.slug}`}>
                        <div className="relative aspect-square overflow-hidden bg-[#faf8f5] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] rounded-[2px] mb-6">
                          {/* Dấu Tag "X tùy chọn màu" hấp dẫn click */}
                          {product.availableColors > 1 && (
                             <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest text-wood shadow-sm border border-wood/5">
                               + {product.availableColors} Màu
                             </div>
                          )}
                          <OptimizedImage 
                            src={product.images?.[0]} 
                            alt={product.name} 
                            aspectRatio="square" 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                          />
                          {product.images?.[1] && (
                            <OptimizedImage 
                              src={product.images[1]} 
                              alt={`${product.name} detail`} 
                              aspectRatio="square" 
                              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
                            />
                          )}
                        </div>

                        <div className="flex flex-col items-start px-2">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-[10px] tracking-[0.1em] font-semibold text-wood/40">
                              {product.design_code === 'MIN' ? 'MINIMAL' : 'MODERN'}
                            </span>
                            {product.old_price && (
                              <>
                                <span className="w-1 h-px bg-wood/20"></span>
                                <span className="text-[10px] tracking-widest uppercase font-bold text-maroon">
                                  -{Math.round((1 - product.price / product.old_price) * 100)}%
                                </span>
                              </>
                            )}
                          </div>
                          <h3 className="text-xl font-serif text-wood font-light tracking-wide mb-3 group-hover:text-maroon transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                          
                          <div className="flex flex-col">
                            <span className="text-[10px] text-wood/50 mb-1">Giá tham khảo từ</span>
                            <div className="flex items-center gap-3">
                              <span className="text-[15px] font-sans font-medium text-wood">{formatPrice(product.price)}</span>
                              {product.old_price && (
                                <span className="text-[13px] font-sans text-wood/40 line-through">{formatPrice(product.old_price)}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Nút Xem Thêm (Load More) */}
                {visibleCount < sortedAndFilteredProducts.length && (
                  <div className="mt-20 text-center">
                    <button
                      onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                      className="inline-flex items-center gap-2 bg-transparent border-2 border-wood text-wood px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[12px] hover:bg-wood hover:text-white transition-all shadow-sm"
                    >
                      Xem thêm thiết kế
                    </button>
                    <p className="text-wood/40 text-xs mt-4">
                      Đang hiển thị {displayedProducts.length} / {sortedAndFilteredProducts.length} thiết kế
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterDrawerOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-[350px] bg-ivory z-[70] p-8 shadow-2xl overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-10">
                <div className="font-bold text-wood uppercase tracking-widest">Bộ lọc sản phẩm</div>
                <button onClick={() => setIsFilterDrawerOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <FilterContent />
              <div className="mt-12">
                <button 
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="w-full bg-maroon text-white py-5 rounded-sm font-bold uppercase tracking-widest text-[12px]"
                >
                  Áp dụng bộ lọc
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Bọc Component chính trong Suspense
export default function ProductListingClient() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-wood/40 text-sm uppercase tracking-widest animate-pulse">Đang nạp dữ liệu cửa hàng...</div>
      </div>
    }>
      <ProductListingContent />
    </Suspense>
  );
}