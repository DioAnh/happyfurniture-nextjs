'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, ShieldCheck, ChevronRight, Minus, Plus, 
  Check, ChevronDown, Loader2, Star, Layers, Hammer, MapPin, Phone, Mail, CheckCircle2, Ruler, ArrowRight, X
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { OptimizedImage } from '@/components/OptimizedImage';
import { supabase } from '@/lib/supabase';
import { QualityStandards } from '@/components/QualityStandards';

// --- DATA ---
const MATERIAL_NAMES: Record<string, string> = {
  'BT26': 'Gỗ Sồi Nga (Sáng)', 'BT56': 'Gỗ Óc Chó (Trầm)', 'BT120': 'Gỗ Mun (Đen Than)',
  'BT178': 'Gỗ Sồi Mỹ (Nâu Ấm)', 'BT180': 'Gỗ Tần Bì (Xám Nhạt)', 'BT58': 'Gỗ Xám Khói',
  'BT123': 'Gỗ Thích (Minimal)', 'BT131': 'Gỗ Cherry (Đỏ Trầm)', 'SW': 'Trắng Trơn (Smooth White)',
  'WC': 'Trắng Kem (White Cream)', 'LG': 'Xám Nhạt (Light Grey)', 'CR': 'Beige (Crema)',
  'DS': 'Xanh Đen (Dark Sky)', 'MB': 'Đen Mờ (Matte Black)'
};

const MATERIAL_COLORS: Record<string, string> = {
  'BT26': '#D4B595', 'BT56': '#5C4033', 'BT120': '#2C2C2C', 'BT178': '#A67B5B',
  'BT180': '#C4B7A6', 'BT58': '#8B8589', 'BT123': '#E8D8C8', 'BT131': '#8B4513',
  'SW': '#FFFFFF', 'WC': '#F5F5DC', 'LG': '#D3D3D3', 'CR': '#FFFDD0',
  'DS': '#00008B', 'MB': '#1A1A1A'
};

const getMaterialImageUrl = (code: string) => {
  let formattedCode = code;
  if (code.startsWith('BT')) formattedCode = code.replace('BT', 'BT_');
  return `https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/materials/${formattedCode}_MDF_Melamine_Chong_Am_E2_Ba_Thanh.webp`;
};

const DEMO_IMAGES: Record<string, string> = {
  'WD': 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/product-images/Aura/tu-quan-ao-mdf-aura-vua-roomshot-01.webp',
  'BS': 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/product-images/Cosmic/tu-dau-giuong-mdf-cosmic-vua-roomshot-01.webp',
  'BE': 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/product-images/Cosmic/giuong-mdf-cosmic-vua-roomshot-01.webp',
};

const WORKSHOP_PHOTOS = [
  { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_001.webp', caption: 'XƯỞNG SẢN XUẤT TẠI QUẬN 12' },
  { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_002.webp', caption: 'LẮP RÁP THÀNH PHẨM' },
  { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_003.webp', caption: 'KIỂM TRA CHẤT LƯỢNG' },
  { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_004.webp', caption: 'DÁN CẠNH NẸP VÁN BẰNG KEO PUR' },
  { url: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/manufacturer/interior_manufacturer_005.webp', caption: 'ĐÓNG GÓI CHUẨN BỊ GIAO HÀNG' }
];

const AnimatedCounter = ({ end, suffix = "", title }: { end: number, suffix?: string, title: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasCounted, setHasCounted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasCounted) {
        setHasCounted(true);
        let start = 0;
        const duration = 2000;
        const increment = Math.ceil(end / (duration / 30));
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(start);
          }
        }, 30);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, hasCounted]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-7xl font-serif font-bold text-white mb-2">{count}{suffix}</div>
      <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-white/60">{title}</div>
    </div>
  );
};

// Hàm tính toán kích thước động dựa trên Loại sản phẩm và Size
const generateDimensions = (typeCode: string, size: string) => {
  const t = typeCode?.toUpperCase();
  const s = size?.toUpperCase();
  
  if (t === 'WD') { // Tủ quần áo
    if (s === 'S') return 'Ngang 1200 x Sâu 600 x Cao 2000 (mm)';
    if (s === 'M') return 'Ngang 1600 x Sâu 600 x Cao 2000 (mm)';
    if (s === 'L') return 'Ngang 2000 x Sâu 600 x Cao 2000 (mm)'; // Dành cho Lumina
  } else if (t === 'BE') { // Giường
    if (s === 'S') return 'Rộng 1200 x Dài 2000 x Cao 300 (mm)';
    if (s === 'M') return 'Rộng 1600 x Dài 2000 x Cao 300 (mm)';
    if (s === 'L') return 'Rộng 1800 x Dài 2000 x Cao 300 (mm)';
  } else if (t === 'BS') { // Tủ đầu giường
    return 'Ngang 480 x Sâu 350 x Cao 660 (mm)';
  } else if (t === 'DT') { // Bàn ăn
    return 'Ngang 1500 x Sâu 800 x Cao 800 (mm)';
  } else if (t === 'CO') { // Bàn console
    return 'Ngang 1000 x Sâu 320 x Cao 900 (mm)';
  } else if (t === 'OT') { // Bàn làm việc
    return 'Ngang 1000 x Sâu 550 x Cao 770 (mm)';
  } else if (t === 'CF') { // Bàn trà
    return 'Ngang 950 x Sâu 550 x Cao 390 (mm)';
  } else if (t === 'SH') { // Kệ trang trí
    if (s === 'S') return 'Ngang 620 x Sâu 410 x Cao 2200 (mm)';
    return 'Ngang 950 x Sâu 410 x Cao 2200 (mm)'; // M
  } else if (t === 'TV') { // Kệ TV
    return 'Ngang 1500 x Sâu 380 x Cao 450 (mm)';
  } else if (t === 'ST') { // Tủ kho đa năng
    if (s === 'M') return 'Ngang 1200 x Sâu 480 x Cao 1140 (mm)';
    if (s === 'L') return 'Ngang 1500 x Sâu 480 x Cao 1050 (mm)';
  } else if (t === 'SC') { // Tủ giày
    if (s === 'S') return 'Ngang 650 x Sâu 420 x Cao 1050 (mm)';
    if (s === 'M') return 'Ngang 900 x Sâu 420 x Cao 1050 (mm)';
  } else if (t === 'DC') { // Tủ hộc kéo
    if (s === 'S') return 'Ngang 800 x Sâu 400 x Cao 950 (mm)';
    if (s === 'M') return 'Ngang 950 x Sâu 420 x Cao 1050 (mm)';
  }
  
  return 'Kích thước tiêu chuẩn (Có thể tùy chỉnh khi đặt hàng)';
};

export default function ProductDetailClient({ initialProduct, groupVariants }: { initialProduct: any, groupVariants: any[] }) {
  const router = useRouter();
  const [product, setProduct] = useState(initialProduct);
  const [isNavigating, setIsNavigating] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  
  // States cho tính năng Amazon UI
  const [openAccordion, setOpenAccordion] = useState<string | null>('desc');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('specs');

  const workshopScrollRef = useRef<HTMLDivElement>(null);
  const { addToCart, setIsCartOpen, setIsAnimatingCartIcon } = useCart();

  useEffect(() => { setActiveImage(0); }, [product.slug]);

  useEffect(() => {
    const autoScroll = () => {
      if (workshopScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = workshopScrollRef.current;
        const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 10;
        if (isAtEnd) {
          workshopScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          const itemWidth = workshopScrollRef.current.children[0].clientWidth;
          workshopScrollRef.current.scrollBy({ left: itemWidth + 24, behavior: 'smooth' });
        }
      }
    };
    const timer = setInterval(autoScroll, 3000);
    return () => clearInterval(timer);
  }, []);

  // Khóa cuộn trang khi mở Drawer thông số
  useEffect(() => {
    if (isDrawerOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; }
  }, [isDrawerOpen]);

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL'].filter(s => groupVariants.some(v => v.size === s));
  const availableMaterials = Array.from(new Set(groupVariants.map(v => v.material_code)));
  const displayImages = (product.images && product.images.length > 0) ? product.images : [DEMO_IMAGES[product.type_code] || DEMO_IMAGES['WD']];

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({ id: product.id, name: product.name, price: product.price || 0, image: displayImages[0], material: product.material }, quantity);
    setIsAdded(true); setIsAnimatingCartIcon(true); 
    setTimeout(() => { setIsAdded(false); setIsAnimatingCartIcon(false); setIsCartOpen(true); }, 2000);
  };

  const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  const handleVariantChange = async (targetSlug: string) => {
    if (targetSlug === product.slug) return;
    setIsNavigating(true);
    try {
      const { data: newVariant, error } = await supabase.from('products').select('*').eq('slug', targetSlug).single();
      if (!error && newVariant) {
        setProduct({ ...newVariant, description: newVariant.description || product.description, base_name: product.base_name, rooms: product.rooms });
        window.history.replaceState(null, '', `/san-pham/${targetSlug}`);
      }
    } catch (e) { console.error(e); } finally { setIsNavigating(false); }
  };

  return (
    <div className="bg-ivory min-h-screen pb-20 relative">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 25s linear infinite; display: flex; width: max-content; }
        .animate-marquee:hover { animation-play-state: paused; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* COMPONENT: SLIDE-OUT DRAWER CHỨA THÔNG SỐ */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="absolute inset-0 bg-wood/40 backdrop-blur-sm cursor-pointer"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col z-10"
            >
              <div className="flex items-center justify-between p-6 border-b border-wood/10 bg-ivory/50">
                <h2 className="text-2xl font-serif font-bold text-wood">Thông số chi tiết</h2>
                <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-wood/10 rounded-full transition-colors">
                  <X className="w-5 h-5 text-wood" />
                </button>
              </div>

              <div className="flex px-6 pt-4 gap-2 border-b border-wood/10 overflow-x-auto hide-scrollbar shrink-0">
                <button onClick={() => setActiveTab('specs')} className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'specs' ? 'border-maroon text-maroon' : 'border-transparent text-wood/60 hover:text-wood'}`}>Thông số & Kích thước</button>
                <button onClick={() => setActiveTab('material')} className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'material' ? 'border-maroon text-maroon' : 'border-transparent text-wood/60 hover:text-wood'}`}>Chất liệu & Xuất xứ</button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'specs' && (
                  <div className="space-y-0 text-sm">
                    <div className="grid grid-cols-3 border-b border-wood/5 py-4">
                      <div className="font-bold text-wood/70">Mã sản phẩm (SKU)</div>
                      <div className="col-span-2 text-wood font-medium">{product.sku}</div>
                    </div>
                    <div className="grid grid-cols-3 border-b border-wood/5 py-4">
                      <div className="font-bold text-wood/70">Phân loại</div>
                      <div className="col-span-2 text-wood font-medium">{product.base_name}</div>
                    </div>
                    <div className="grid grid-cols-3 border-b border-wood/5 py-4">
                      <div className="font-bold text-wood/70">Kích thước (DxRxC)</div>
                      <div className="col-span-2 text-wood font-medium text-maroon">{generateDimensions(product.type_code, product.size)}</div>
                    </div>
                    <div className="grid grid-cols-3 border-b border-wood/5 py-4">
                      <div className="font-bold text-wood/70">Size tiêu chuẩn</div>
                      <div className="col-span-2 text-wood font-medium">Size {product.size}</div>
                    </div>
                    <div className="grid grid-cols-3 border-b border-wood/5 py-4">
                      <div className="font-bold text-wood/70">Phòng phù hợp</div>
                      <div className="col-span-2 text-wood font-medium">Phòng ngủ, Căn hộ chung cư</div>
                    </div>
                    <div className="grid grid-cols-3 border-b border-wood/5 py-4">
                      <div className="font-bold text-wood/70">Phong cách</div>
                      <div className="col-span-2 text-wood font-medium">Hiện đại (Modern), Tối giản (Minimalist)</div>
                    </div>
                  </div>
                )}

                {activeTab === 'material' && (
                  <div className="space-y-0 text-sm">
                    <div className="grid grid-cols-3 border-b border-wood/5 py-4">
                      <div className="font-bold text-wood/70">Thương hiệu ván</div>
                      <div className="col-span-2 text-wood font-medium text-maroon">Ván Ba Thanh (Chính hãng)</div>
                    </div>
                    <div className="grid grid-cols-3 border-b border-wood/5 py-4">
                      <div className="font-bold text-wood/70">Cốt gỗ</div>
                      <div className="col-span-2 text-wood font-medium">MDF Lõi xanh chống ẩm</div>
                    </div>
                    <div className="grid grid-cols-3 border-b border-wood/5 py-4">
                      <div className="font-bold text-wood/70">Độ dày ván</div>
                      <div className="col-span-2 text-wood font-medium">Khung \u0026 Cánh 17mm. Hậu 9mm</div>
                    </div>
                    <div className="grid grid-cols-3 border-b border-wood/5 py-4">
                      <div className="font-bold text-wood/70">Bề mặt hoàn thiện</div>
                      <div className="col-span-2 text-wood font-medium">Phủ Melamine chống xước</div>
                    </div>
                    <div className="grid grid-cols-3 border-b border-wood/5 py-4">
                      <div className="font-bold text-wood/70">Mã màu Melamine</div>
                      <div className="col-span-2 text-wood font-medium">{product.material_code} - {MATERIAL_NAMES[product.material_code]}</div>
                    </div>
                    <div className="grid grid-cols-3 border-b border-wood/5 py-4">
                      <div className="font-bold text-wood/70">Tiêu chuẩn an toàn</div>
                      <div className="col-span-2 text-wood font-medium">E2 (An toàn cho sức khỏe, không hắc)</div>
                    </div>
                    <div className="grid grid-cols-3 border-b border-wood/5 py-4">
                      <div className="font-bold text-wood/70">Công nghệ dán cạnh</div>
                      <div className="col-span-2 text-wood font-medium">Keo PUR chống thấm nước tự động</div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isNavigating && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-ivory/50 backdrop-blur-[2px] z-50 flex items-start justify-center pt-[30vh]">
            <div className="bg-white/80 px-6 py-3 rounded-full shadow-lg border border-wood/10 flex items-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-maroon" />
              <span className="text-[12px] font-bold uppercase tracking-widest text-wood">Đang nạp biến thể...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DẢI CHỮ CHẠY CỐ ĐỊNH */}
      <div className="w-full bg-wood text-white overflow-hidden py-3 border-b border-maroon/30 shadow-md sticky top-[64px] md:top-[72px] z-50">
        <div className="animate-marquee flex items-center text-[11px] font-bold uppercase tracking-widest whitespace-nowrap cursor-default">
          {[...Array(6)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="mx-8">100% VÁN MDF LÕI XANH BA THANH CHUẨN E2</span>
              <span className="mx-2 text-maroon/80">✦</span>
              <span className="mx-8">SẢN XUẤT TRỰC TIẾP TẠI XƯỞNG Q.12</span>
              <span className="mx-2 text-maroon/80">✦</span>
              <span className="mx-8">BẢO HÀNH 12 THÁNG - LẮP ĐẶT TẬN NƠI TỈ MỈ</span>
              <span className="mx-2 text-maroon/80">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-3">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-wood/40">
          <Link href="/" className="hover:text-maroon">Trang chủ</Link> <ChevronRight className="w-3 h-3" />
          <Link href="/san-pham" className="hover:text-maroon">Sản phẩm</Link> <ChevronRight className="w-3 h-3" />
          <span className="text-wood/80 font-bold line-clamp-1">{product.base_name}</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          
          {/* CỘT TRÁI (Hình ảnh) */}
          <div className="w-full lg:w-[48%] shrink-0 flex justify-start">
            <div className="sticky top-[130px] flex flex-col-reverse lg:flex-row items-start gap-3 w-full max-w-[640px] mx-auto lg:ml-0 lg:mr-auto">
              
              {/* Ảnh nhỏ (Thumbnails) */}
              {displayImages.length > 1 && (
                <div className="flex lg:flex-col gap-3 w-full lg:w-[80px] shrink-0 overflow-x-auto hide-scrollbar">
                  {displayImages.map((img: string, index: number) => (
                    <button key={index} onClick={() => setActiveImage(index)} className={`relative aspect-square w-[80px] lg:w-full shrink-0 rounded-sm overflow-hidden border-2 transition-all ${activeImage === index ? 'border-maroon shadow-md' : 'border-transparent hover:border-maroon/30'}`}>
                      <OptimizedImage src={img} alt={`${product.name} - Thumbnail ${index + 1}`} aspectRatio="square" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Ảnh chính */}
              <div className="flex-1 aspect-square w-full rounded-sm overflow-hidden bg-white border border-wood/5 relative shadow-sm h-fit">
                <OptimizedImage src={displayImages[activeImage]} alt={product.name} aspectRatio="square" className="w-full h-full object-cover" priority={true} />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full shadow-sm border border-wood/5 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-maroon" />
                  <span className="text-[10px] font-bold tracking-widest uppercase text-wood">Bảo hành 12 tháng</span>
                </div>
              </div>
              
            </div>
          </div>

          {/* CỘT PHẢI (Thông tin) */}
          <div className="w-full lg:w-[52%] flex flex-col text-left pt-1">
            <div className="mb-3">
              <h1 className="text-[32px] md:text-[36px] font-serif font-bold text-wood leading-tight mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-yellow-500"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
                <span className="text-[13px] text-wood/60">(Xem đánh giá thực tế)</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[32px] font-bold text-maroon">{formatPrice(product.price)}</span>
                {product.old_price && <span className="text-[16px] text-wood/30 line-through">{formatPrice(product.old_price)}</span>}
              </div>
            </div>

            {/* KHÔI PHỤC LẠI KHỐI BOX 4 BULLET POINTS NHƯ YÊU CẦU */}
            <div className="flex flex-col xl:flex-row gap-5 mb-5 mt-2">
              <div className="xl:w-[45%] bg-white border border-wood/10 rounded-md p-3.5 shadow-sm space-y-2.5">
                <div className="flex items-start gap-2">
                   <CheckCircle2 className="w-3.5 h-3.5 text-maroon shrink-0 mt-0.5" />
                   <p className="text-[12px] text-wood/80 leading-snug"><strong>Nguồn gốc:</strong> Trực tiếp xưởng Q12, không qua trung gian.</p>
                </div>
                <div className="flex items-start gap-2">
                   <CheckCircle2 className="w-3.5 h-3.5 text-maroon shrink-0 mt-0.5" />
                   <p className="text-[12px] text-wood/80 leading-snug"><strong>Kích thước:</strong> Hiện xem Size {product.size} (Nhận may đo tùy chỉnh).</p>
                </div>
                <div className="flex items-start gap-2">
                   <Layers className="w-3.5 h-3.5 text-maroon shrink-0 mt-0.5" />
                   <p className="text-[12px] text-wood/80 leading-snug">
                     <strong>Kết cấu:</strong> Ván MDF lõi xanh <strong>17mm</strong> chuẩn E2. Hậu 9mm cứng cáp.
                   </p>
                </div>
                <div className="flex items-start gap-2">
                   <Hammer className="w-3.5 h-3.5 text-maroon shrink-0 mt-0.5" />
                   <p className="text-[12px] text-wood/80 leading-snug"><strong>Hoàn thiện:</strong> Melamine chống xước. Dán cạnh PUR. Phụ kiện giảm chấn.</p>
                </div>
              </div>

              <div className="xl:flex-1 space-y-4 flex flex-col justify-center">
                <div>
                  <h4 className="text-[13px] font-bold text-wood mb-2">Kích thước (Size)</h4>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map(size => {
                      const targetVariant = groupVariants.find(v => v.size === size && v.material_code === product.material_code) || groupVariants.find(v => v.size === size);
                      const isActive = product.size === size;
                      return (
                        <button key={size} onClick={() => targetVariant && handleVariantChange(targetVariant.slug)} disabled={isNavigating || !targetVariant}
                          className={`px-5 py-1.5 border rounded-[2px] text-[12px] font-bold transition-all ${isActive ? 'border-maroon text-maroon bg-maroon/5 shadow-sm' : 'border-wood/10 text-wood/60 hover:border-wood/40 bg-white hover:bg-ivory'}`}
                        >
                          Size {size}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="text-[13px] font-bold text-wood mb-2 flex items-center flex-wrap gap-1">
                    Màu sắc: <span className="font-normal text-maroon">{MATERIAL_NAMES[product.material_code] || product.material_code}</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {availableMaterials.map(matCode => {
                      const codeStr = matCode as string;
                      const targetVariant = groupVariants.find(v => v.material_code === codeStr && v.size === product.size) || groupVariants.find(v => v.material_code === codeStr);
                      if (!targetVariant) return null;
                      const isActive = product.material_code === codeStr;

                      return (
                        <button key={codeStr} onClick={() => handleVariantChange(targetVariant.slug)} disabled={isNavigating} title={MATERIAL_NAMES[codeStr] || codeStr}
                          className={`relative rounded-full transition-all flex items-center justify-center p-0.5 ${isActive ? 'border-2 border-maroon shadow-md scale-110' : 'border border-wood/20 hover:border-maroon/50 hover:scale-105'}`}
                        >
                          <div className="w-8 h-8 rounded-full overflow-hidden border border-wood/5" style={{ backgroundColor: MATERIAL_COLORS[codeStr] || '#CCCCCC' }}>
                            <img src={getMaterialImageUrl(codeStr)} alt={MATERIAL_NAMES[codeStr] || codeStr} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                          </div>
                          {isActive && <div className="absolute -top-1 -right-1 bg-maroon text-white rounded-full p-0.5 shadow-sm"><Check className="w-2.5 h-2.5" /></div>}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Nút Action */}
            <div className="space-y-3 mb-6 border-b border-wood/10 pb-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-wood/10 rounded-full px-3 py-2.5 bg-white h-[46px]">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 hover:text-maroon"><Minus className="w-4 h-4" /></button>
                  <span className="w-10 text-center font-bold text-wood text-sm">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-1 hover:text-maroon"><Plus className="w-4 h-4" /></button>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} disabled={isAdded || isNavigating} onClick={handleAddToCart}
                  className={`flex-1 text-white h-[46px] rounded-full font-bold uppercase tracking-widest text-[12px] shadow-lg flex items-center justify-center gap-2 ${isAdded ? 'bg-green-600' : 'bg-maroon hover:bg-wood'}`}
                >
                  {isAdded ? <><Check className="w-4 h-4" /> Đã thêm</> : <><ShoppingBag className="w-4 h-4" /> Thêm vào giỏ</>}
                </motion.button>
              </div>

              <a href="tel:0909163593" className="w-full flex items-center justify-center gap-2 bg-[#1e3a8a] text-yellow-400 h-[46px] rounded-full font-bold text-[13px] hover:bg-[#1e3a8a]/90 transition-colors shadow-md border border-[#1e3a8a]">
                <Phone className="w-4 h-4" /> GỌI HOTLINE TƯ VẤN: 0909.163.593
              </a>
            </div>

            {/* COMPONENT MENU ACCORDION */}
            <div className="border-t border-wood/10 -mt-2">
              
              <div className="border-b border-wood/10">
                <button onClick={() => toggleAccordion('desc')} className="flex w-full items-center justify-between py-4 text-left hover:text-maroon transition-colors group">
                  <span className="font-bold text-[15px]">Mô tả sản phẩm</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 text-wood/50 group-hover:text-maroon ${openAccordion === 'desc' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openAccordion === 'desc' && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="pb-4 space-y-3">
                        {(product.description || '').split('\n').map((p: string, i: number) => (
                          p.trim() && <p key={i} className="text-wood/75 text-[14px] leading-relaxed">{p}</p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="border-b border-wood/10">
                <button onClick={() => { setIsDrawerOpen(true); setActiveTab('specs'); }} className="flex w-full items-center justify-between py-4 text-left hover:text-maroon transition-colors group">
                  <span className="font-bold text-[15px]">Thông số chi tiết & Kích thước</span>
                  <ChevronRight className="w-4 h-4 text-wood/50 group-hover:text-maroon transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              <div className="border-b border-wood/10">
                <button onClick={() => toggleAccordion('warranty')} className="flex w-full items-center justify-between py-4 text-left hover:text-maroon transition-colors group">
                  <span className="font-bold text-[15px]">Giao hàng & Bảo hành</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 text-wood/50 group-hover:text-maroon ${openAccordion === 'warranty' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openAccordion === 'warranty' && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="pb-4 space-y-3 text-[13px] text-wood/80">
                         <p className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-maroon shrink-0 mt-0.5"/> <span><strong>Bảo hành:</strong> 12 tháng lỗi kỹ thuật từ nhà sản xuất. Hỗ trợ bảo trì trọn đời.</span></p>
                         <p className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-maroon shrink-0 mt-0.5"/> <span><strong>Giao hàng:</strong> Miễn phí vận chuyển và lắp đặt tận nơi trong bán kính 10km từ xưởng Q.12 và Showroom Bình Dương.</span></p>
                         <p className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-maroon shrink-0 mt-0.5"/> <span><strong>Sản xuất:</strong> 3-7 ngày làm việc tùy thuộc vào số lượng và tùy chỉnh may đo.</span></p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
            
          </div>
        </div>
      </div>

      {/* SECTION CTA MAY ĐO */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 mt-16">
        <Link href="/dich-vu" className="group block relative overflow-hidden bg-white border-2 border-wood/5 rounded-2xl shadow-xl transition-shadow duration-300">
          <div className="absolute inset-0 bg-maroon translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-2/3">
              <div className="inline-flex items-center gap-2 text-maroon group-hover:text-white/90 mb-4 transition-colors duration-300">
                <Ruler className="w-5 h-5" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Dịch Vụ Thiết Kế - Sản Xuất May Đo</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-wood group-hover:text-white mb-4 leading-tight transition-colors duration-300">
                Sản phẩm không vừa với không gian thực tế nhà bạn?
              </h2>
              <p className="text-wood/70 group-hover:text-white/80 text-sm leading-relaxed mb-0 transition-colors duration-300">
                Mỗi căn phòng mang một đặc thù riêng. Nếu các Size tiêu chuẩn không hoàn toàn đáp ứng được nhu cầu, đội ngũ kỹ thuật Happy Furniture sẵn sàng đến tận nơi khảo sát, đo đạc hiện trạng, lên bản vẽ chi tiết và sản xuất may đo chính xác từng milimet.
              </p>
            </div>
            
            <div className="md:w-1/3 flex justify-end w-full">
              <div className="w-full text-center bg-maroon group-hover:bg-white text-white group-hover:text-maroon px-6 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] transition-colors duration-300 shadow-lg inline-block">
                Tìm hiểu dịch vụ may đo
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="w-full bg-wood py-20 mt-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 divide-x-0 md:divide-x divide-white/20">
            <AnimatedCounter end={10} suffix="+" title="Năm Kinh Nghiệm" />
            <AnimatedCounter end={1500} suffix="+" title="Sản Phẩm Đã Giao" />
            <AnimatedCounter end={250} suffix="+" title="Dự Án Nội Thất" />
            <AnimatedCounter end={100} suffix="%" title="Khách Hàng Hài Lòng" />
          </div>
        </div>
      </div>

      <section className="py-20 bg-ivory/50 border-b border-wood/5 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-maroon font-bold uppercase tracking-[4px] text-xs mb-3">Năng lực sản xuất</h2>
              <h3 className="text-[32px] md:text-[45px] font-serif font-bold text-wood">Hình Ảnh Xưởng Thực Tế</h3>
            </div>
            <Link href="/xuong-san-xuat-noi-that" className="inline-flex items-center gap-2 text-maroon font-bold text-xs uppercase tracking-widest border-b-2 border-maroon pb-1 hover:text-wood hover:border-wood transition-colors shrink-0">
              Khám phá xưởng <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="-mx-4 px-4 md:mx-0 md:px-0">
            <div ref={workshopScrollRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {WORKSHOP_PHOTOS.map((photo, index) => (
                <div key={index} className="w-[85vw] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start">
                  <div className="group relative overflow-hidden bg-wood/5 aspect-[3/4] rounded-sm shadow-sm">
                    <OptimizedImage src={photo.url} alt={photo.caption} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-wood/90 via-wood/20 to-transparent opacity-90 flex items-end p-6 md:p-8">
                      <p className="text-white text-xs md:text-sm font-bold tracking-widest uppercase">{photo.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="pt-0">
        <QualityStandards showPricing={false} />
      </div>

      <div className="bg-ivory py-16 border-t border-wood/10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-16">
            
            <div className="lg:col-span-7">
              <h3 className="text-2xl font-serif font-bold text-wood mb-8">Khách hàng đánh giá (12)</h3>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-sm border border-wood/5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-wood/10 rounded-full flex items-center justify-center font-bold text-wood">A.T</div>
                      <div>
                        <p className="text-sm font-bold text-wood">Anh Tú (KDC Việt Sing, Thuận An)</p>
                        <p className="text-[11px] text-wood/50">Đã mua Size {product.size} - {MATERIAL_NAMES[product.material_code] || 'Màu gỗ'}</p>
                      </div>
                    </div>
                    <div className="flex text-yellow-500"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
                  </div>
                  <p className="text-sm text-wood/80 leading-relaxed">
                    "Sản phẩm hoàn thiện rất sắc nét, ván cầm lên nặng và đầm tay. Giao hàng đúng hẹn. Anh thợ lắp đặt nhiệt tình và cẩn thận, lắp xong còn hút bụi lau chùi sạch sẽ. Rất ưng ý với chất liệu ván lõi xanh này, cứng cáp hơn hẳn hàng chợ tớ từng mua."
                  </p>
                </div>
                <div className="bg-white p-6 rounded-sm border border-wood/5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-wood/10 rounded-full flex items-center justify-center font-bold text-wood">C.M</div>
                      <div>
                        <p className="text-sm font-bold text-wood">Chị Mai (Vinhome Grand Park, Q9)</p>
                        <p className="text-[11px] text-wood/50">Đã mua {product.base_name}</p>
                      </div>
                    </div>
                    <div className="flex text-yellow-500"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
                  </div>
                  <p className="text-sm text-wood/80 leading-relaxed">
                    "Bề mặt Melamine sờ rất thích tay, màu gỗ lên phòng siêu ấm cúng. Thiết kế tinh gọn đúng chuẩn phong cách Minimal mà vợ chồng mình đang tìm kiếm. Ban đầu mua online hơi sợ nhưng nhận hàng xong phải review 5 sao ngay. Xưởng làm việc uy tín!"
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <h3 className="text-2xl font-serif font-bold text-wood mb-8">Câu hỏi thường gặp</h3>
              <div className="space-y-3">
                {[
                  { q: `Chất liệu cốt gỗ của ${product.base_name} là gì?`, a: `Happy Furniture sử dụng 100% gỗ công nghiệp MDF lõi xanh chống ẩm tiêu chuẩn E2 nhập trực tiếp từ Ba Thanh. Khung và đợt tủ dày chuẩn 17mm (không dùng loại 15mm), bề mặt phủ Melamine cao cấp chống xước, chống cong vênh.` },
                  { q: `Xưởng có hỗ trợ làm theo kích thước nhà tôi không?`, a: `Chắc chắn có. Happy Furniture là xưởng sản xuất trực tiếp. Nếu các Size tiêu chuẩn (S, M, L) không vừa không gian, đội ngũ kỹ thuật sẽ đến tận nơi đo đạc và may đo lại chính xác theo yêu cầu của bạn.` },
                  { q: `Thời gian giao hàng tận nơi là bao lâu?`, a: `Với các sản phẩm lẻ thuộc bộ sưu tập có sẵn, thời gian gia công và lắp ráp tại xưởng là 3-7 ngày. Khu vực Bình Dương và TP.HCM sẽ được xếp lịch giao và lắp ráp tận phòng ngay sau khi hoàn thiện.` },
                  { q: `Chính sách bảo hành như thế nào?`, a: `Mọi sản phẩm nội thất đều được bảo hành 12 tháng đối với các lỗi kỹ thuật từ nhà sản xuất (như bản lề, ray trượt, bong tróc nẹp do keo). Hỗ trợ bảo trì trọn đời với chi phí vật tư gốc.` }
                ].map((faq, index) => (
                  <div key={index} className="border border-wood/10 rounded-sm bg-white overflow-hidden shadow-sm">
                    <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex items-center justify-between p-4 text-left hover:bg-ivory/50 transition-colors">
                      <span className="font-bold text-[13px] text-wood pr-4">{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-maroon transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openFaq === index && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                          <div className="p-4 pt-0 text-[13px] text-wood/70 leading-relaxed border-t border-wood/5 mt-2">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>

      <section className="bg-ivory pb-20 border-t border-wood/5 pt-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h3 className="text-2xl font-serif font-bold text-wood mb-2">Sản Phẩm Cùng Không Gian</h3>
              <p className="text-sm text-wood/60">Gợi ý các thiết kế đồng bộ để hoàn thiện nội thất nhà bạn</p>
            </div>
            <Link href={`/san-pham`} className="text-xs font-bold uppercase tracking-widest text-maroon border-b border-maroon pb-1 hover:text-wood hover:border-wood transition-colors">
              Xem tất cả sản phẩm
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { img: DEMO_IMAGES['WD'], title: 'Tủ Quần Áo Đương Đại', sub: 'Giải pháp lưu trữ' },
              { img: DEMO_IMAGES['BS'], title: 'Tủ Đầu Giường Tiện Ích', sub: 'Nội thất phòng ngủ' },
              { img: DEMO_IMAGES['BE'], title: 'Giường Ngủ Hiện Đại', sub: 'Khung MDF 17mm vững chãi' },
              { img: 'https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/product-images/Woodland/tu-ke-tivi-mdf-woodland-vua-roomshot-01.webp', title: 'Kệ Tivi Minimal', sub: 'Tối ưu không gian phòng khách' },
            ].map((item, i) => (
              <Link href="/san-pham" key={i} className="group block">
                <div className="aspect-square bg-white border border-wood/5 rounded-sm overflow-hidden mb-4 relative shadow-sm">
                  <OptimizedImage src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <h4 className="font-bold text-wood group-hover:text-maroon transition-colors text-sm line-clamp-1">{item.title}</h4>
                <p className="text-wood/50 text-xs mt-1">{item.sub}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}