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
export const LEGACY_TYPE_MAP: Record<string, string> = {
  'Wardrobe': 'WD', 'Bedside': 'BS', 'Drawer Cabinet': 'DC', 'TV Unit': 'TV', 'TV Media Unit': 'TV',
  'Desk': 'OT', 'Office Desk': 'OT', 'Shelf': 'SH', 'Shoes Cabinet': 'SC', 'Sideboard': 'ST',
  'Storage Cabinet': 'ST', 'Console Table': 'CO', 'Coffee Table': 'CF', 'Dining Table': 'DT', 'Bed': 'BE'
};

export const RANGES = [
  { id: 'AMB', name: 'Amberglow', code: 'AMB' },
  { id: 'WDL', name: 'Woodland', code: 'WDL' },
  { id: 'CSM', name: 'Cosmic', code: 'CSM' },
  { id: 'AET', name: 'Aether', code: 'AET' },
  { id: 'AUR', name: 'Aura', code: 'AUR' }
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
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả'); 
  const [selectedMaterial, setSelectedMaterial] = useState<string>('Tất cả');
  const [priceRange, setPriceRange] = useState<string>('Tất cả');
  const [showOnlyDiscount, setShowOnlyDiscount] = useState<boolean>(false);
  const [selectedRange, setSelectedRange] = useState<string>('Tất cả');
  const [selectedType, setSelectedType] = useState<string>('Tất cả');

  const filterSummaryRef = useRef<HTMLDivElement>(null);

  // Lấy data từ Supabase
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*');
      if (data) {
        setProducts(data);
      } else {
        console.error("Lỗi lấy sản phẩm từ Supabase", error);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  // Xử lý Search Params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    setSelectedCategory(categoryParam || 'Tất cả');

    const typeParam = searchParams.get('type');
    if (typeParam) {
      const mappedType = LEGACY_TYPE_MAP[typeParam] || typeParam;
      setSelectedType(mappedType);
    } else {
      setSelectedType('Tất cả');
    }

    const rangeParam = searchParams.get('range');
    setSelectedRange(rangeParam || 'Tất cả');
  }, [searchParams]);

  const filteredProducts = products.filter(product => {
    let matchRoom = true;
    if (selectedCategory !== 'Tất cả') {
      matchRoom = product.rooms ? product.rooms.includes(selectedCategory) : false;
    }

    let matchMaterial = true;
    if (selectedMaterial !== 'Tất cả') {
      const mat = (product.material || '').toLowerCase();
      if (selectedMaterial === 'MDF Melamine lõi xanh') matchMaterial = mat.includes('mdf') || mat.includes('melamine') || mat.includes('bt');
      else if (selectedMaterial === 'Laminate') matchMaterial = mat.includes('laminate');
      else if (selectedMaterial === 'PVD phủ Acrylic cao cấp') matchMaterial = mat.includes('acrylic') || mat.includes('pvd');
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
        else if (priceRange === 'Dưới 25 triệu') matchPrice = p < 25000000;
      }
    }

    let matchType = false;
    if (selectedType === 'Tất cả') {
      matchType = true;
    } else {
      const isCodeMatch = product.type_code === selectedType;
      const isLegacyMatch = product.type && LEGACY_TYPE_MAP[product.type] === selectedType;
      const searchKeyword = TYPE_TRANSLATIONS[selectedType]?.toLowerCase() || selectedType.toLowerCase();
      let isNameMatch = product.name.toLowerCase().includes(searchKeyword);
      
      if (selectedType === 'BE' && product.name.toLowerCase().includes('tủ đầu giường')) {
        isNameMatch = false;
      }
      matchType = isCodeMatch || isLegacyMatch || product.category === selectedType || isNameMatch;
    }

    const matchDiscount = !showOnlyDiscount || (product.old_price && product.old_price > product.price);
    const matchRange = selectedRange === 'Tất cả' || product.range_code === selectedRange;
    
    const searchString = searchParams.get('search');
    let matchSearch = true;
    if (searchString) {
      const lowerSearch = searchString.toLowerCase();
      matchSearch = product.name.toLowerCase().includes(lowerSearch) || 
                    (product.description || '').toLowerCase().includes(lowerSearch) ||
                    (product.type || '').toLowerCase().includes(lowerSearch) ||
                    (product.category || '').toLowerCase().includes(lowerSearch);
    }

    return matchSearch && matchRoom && matchMaterial && matchPrice && matchDiscount && matchRange && matchType;
  });

  const sizeOrder: Record<string, number> = { 'S': 1, 'M': 2, 'L': 3 };
  const sortedAndFilteredProducts = [...filteredProducts].sort((a, b) => {
      if (a.range !== b.range) {
        return (a.range || '').localeCompare(b.range || '');
      }
      return (sizeOrder[a.size || 'S'] || 0) - (sizeOrder[b.size || 'S'] || 0);
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Bộ sưu tập */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-wood/80 mb-4 border-b border-wood/5 pb-2">Bộ Sưu Tập</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="radio" name="range" className="w-4 h-4 accent-maroon" checked={selectedRange === 'Tất cả'} onChange={() => setSelectedRange('Tất cả')} />
            <span className={`text-[13px] font-sans transition-colors ${selectedRange === 'Tất cả' ? 'text-wood font-medium' : 'text-wood/60 group-hover:text-wood'}`}>Tất cả</span>
          </label>
          {RANGES.map((r) => (
            <label key={r.code} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" name="range" className="w-4 h-4 accent-maroon"
                checked={selectedRange === r.code}
                onChange={() => setSelectedRange(r.code)}
              />
              <span className={`text-[13px] font-sans transition-colors ${selectedRange === r.code ? 'text-wood font-medium' : 'text-wood/60 group-hover:text-wood'}`}>
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
          {['Tất cả', 'Phòng khách', 'Phòng ngủ', 'Phòng bếp', 'Phòng làm việc'].map((cat) => (
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

      {/* Theo vật liệu */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-wood/80 mb-4 border-b border-wood/5 pb-2">Theo vật liệu</h3>
        <div className="space-y-3">
          {['Tất cả', 'MDF Melamine lõi xanh', 'Laminate', 'PVD phủ Acrylic cao cấp'].map((mat) => (
            <label key={mat} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="material" 
                className="w-4 h-4 accent-maroon"
                checked={selectedMaterial === mat}
                onChange={() => setSelectedMaterial(mat)}
              />
              <span className={`text-[13px] font-sans transition-colors ${selectedMaterial === mat ? 'text-wood font-medium' : 'text-wood/60 group-hover:text-wood'}`}>
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
          {['Tất cả', 'Dưới 3 triệu', 'Dưới 5 triệu', 'Dưới 9 triệu', 'Dưới 15 triệu', 'Dưới 25 triệu'].map((range) => (
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
          <p className="text-wood/60 mt-2 mb-0 max-w-4xl">Các sản phẩm nội thất với thiết kế phù hợp không gian sống hiện đại, chất liệu MDF lõi xanh chống ẩm phủ Melamine vân gỗ, đạt chuẩn E2 an toàn cho sức khỏe, được sản xuất trực tiếp từ xưởng Happy Furniture.</p>
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
                  Tìm thấy <span className="font-bold">{sortedAndFilteredProducts.length}</span> sản phẩm phù hợp.
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
                  : (selectedRange !== 'Tất cả' ? `Sản phẩm thuộc dòng ${RANGES.find(r => r.code === selectedRange)?.name}` : 'Tất cả sản phẩm')}
              </h2>
              {(selectedType !== 'Tất cả' || selectedRange !== 'Tất cả') && (
                <button 
                  onClick={() => {
                    setSelectedRange('Tất cả');
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
                  setSelectedCategory('Tất cả'); setSelectedMaterial('Tất cả'); setPriceRange('Tất cả'); setShowOnlyDiscount(false); setSelectedRange('Tất cả'); setSelectedType('Tất cả');
                }} className="text-wood font-semibold hover:text-maroon border-b border-wood hover:border-maroon pb-1 transition-colors uppercase tracking-[0.2em] text-xs">
                  Xóa bộ lọc & xem tất cả
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                {sortedAndFilteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer flex flex-col"
                  >
                    <Link className="block" href={`/san-pham/${product.slug}`}>
                      <div className="relative aspect-square overflow-hidden bg-[#faf8f5] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] rounded-[2px] mb-6">
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
                            {product.dimensions ? `${product.dimensions} mm` : (product.size ? `SIZE ${product.size}` : '')}
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
                        
                        <div className="flex items-center gap-3">
                          <span className="text-[15px] font-sans font-medium text-wood">{formatPrice(product.price)}</span>
                          {product.old_price && (
                            <span className="text-[13px] font-sans text-wood/40 line-through">{formatPrice(product.old_price)}</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
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