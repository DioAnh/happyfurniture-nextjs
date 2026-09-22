'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, Phone, MessageCircle, Ruler, ShieldCheck, 
  Truck, ChevronRight, Star, Minus, Plus, Heart, PenTool, Check, ChevronDown, Loader2
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { OptimizedImage } from '@/components/OptimizedImage';
import { supabase } from '@/lib/supabase';

const MATERIAL_NAMES: Record<string, string> = {
  'BT26': 'Gỗ Sồi Nga (Sáng)',
  'BT56': 'Gỗ Óc Chó (Trầm)',
  'BT120': 'Gỗ Mun (Đen Than)',
  'BT178': 'Gỗ Sồi Mỹ (Nâu Ấm)',
  'BT180': 'Gỗ Tần Bì (Xám Nhạt)',
  'BT58': 'Gỗ Xám Khói',
  'BT123': 'Gỗ Thích (Minimal)',
  'BT131': 'Gỗ Cherry (Đỏ Trầm)',
  'SW': 'Trắng Trơn (Smooth White)',
  'WC': 'Trắng Kem (White Cream)',
  'LG': 'Xám Nhạt (Light Grey)',
  'CR': 'Beige (Crema)',
  'DS': 'Xanh Đen (Dark Sky)',
  'MB': 'Đen Mờ (Matte Black)'
};

const MATERIAL_COLORS: Record<string, string> = {
  'BT26': '#D4B595',
  'BT56': '#5C4033',
  'BT120': '#2C2C2C',
  'BT178': '#A67B5B',
  'BT180': '#C4B7A6',
  'BT58': '#8B8589',
  'BT123': '#E8D8C8',
  'BT131': '#8B4513',
  'SW': '#FFFFFF',
  'WC': '#F5F5DC',
  'LG': '#D3D3D3',
  'CR': '#FFFDD0',
  'DS': '#00008B',
  'MB': '#1A1A1A'
};

const getMaterialImageUrl = (code: string) => {
  let formattedCode = code;
  if (code.startsWith('BT')) {
    formattedCode = code.replace('BT', 'BT_');
  }
  return `https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/materials/${formattedCode}_MDF_Melamine_Chong_Am_E2_Ba_Thanh.webp`;
};

const DEMO_IMAGES: Record<string, string> = {
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
};

export default function ProductDetailClient({ initialProduct, groupVariants }: { initialProduct: any, groupVariants: any[] }) {
  const router = useRouter();
  const [product, setProduct] = useState(initialProduct);
  const [isNavigating, setIsNavigating] = useState(false);
  
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('dimensions');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { addToCart, setIsCartOpen, setIsAnimatingCartIcon } = useCart();

  useEffect(() => { setActiveImage(0); }, [product.slug]);

  // LOGIC LỌC THÔNG MINH: Chỉ lấy những Size và Màu CÓ TỒN TẠI trong bảng groupVariants
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL'].filter(s => groupVariants.some(v => v.size === s));
  const availableMaterials = Array.from(new Set(groupVariants.map(v => v.material_code)));

  const displayImages = (product.images && product.images.length > 0) ? product.images : [DEMO_IMAGES[product.type_code] || DEMO_IMAGES['WD']];

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price || 0,
      image: displayImages[0],
      material: product.material
    }, quantity);

    setIsAdded(true);
    setIsAnimatingCartIcon(true); 
    setTimeout(() => {
      setIsAdded(false);
      setIsAnimatingCartIcon(false); 
      setIsCartOpen(true); 
    }, 2000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleVariantChange = async (targetSlug: string) => {
    if (targetSlug === product.slug) return;
    setIsNavigating(true);

    try {
      const { data: newVariant, error } = await supabase.from('products').select('*').eq('slug', targetSlug).single();
      if (!error && newVariant) {
        setProduct({
          ...newVariant,
          description: product.description,
          base_name: product.base_name,
          rooms: product.rooms
        });
        window.history.replaceState(null, '', `/san-pham/${targetSlug}`);
      }
    } catch (e) {
      console.error("Lỗi chuyển biến thể:", e);
    } finally {
      setIsNavigating(false);
    }
  };

  const tabs = [
    { id: 'dimensions', label: 'Kích thước', icon: Ruler },
    { id: 'material', label: 'Chất liệu', icon: PenTool },
    { id: 'warranty', label: 'Bảo hành', icon: ShieldCheck },
    { id: 'shipping', label: 'Vận chuyển', icon: Truck },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dimensions':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h4 className="font-bold text-wood mb-4">Thông số kỹ thuật</h4>
            <table className="w-full text-sm border-collapse">
              <tbody>
                <tr className="border-b border-wood/5">
                  <td className="py-3 text-wood/60 w-1/3">Kích thước (Size)</td>
                  <td className="py-3 font-medium text-maroon font-bold">Size {product.size}</td>
                </tr>
                <tr className="border-b border-wood/5">
                  <td className="py-3 text-wood/60">SKU Phân Loại</td>
                  <td className="py-3 font-medium tracking-widest">{product.sku}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'material':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h4 className="font-bold text-wood mb-4">Đặc tính vật liệu</h4>
            <p className="text-sm text-wood/70 leading-relaxed">
              Sản phẩm sử dụng bề mặt <span className="text-maroon font-bold">{MATERIAL_NAMES[product.material_code] || product.material_code}</span>. 
              Ván MDF lõi xanh chống ẩm tiêu chuẩn E2, chống cong vênh, chịu ẩm cực tốt.
            </p>
          </div>
        );
      case 'warranty':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <p className="text-sm text-wood/70">Bảo hành 12 tháng lỗi kỹ thuật từ nhà sản xuất. Hỗ trợ bảo trì trọn đời.</p>
          </div>
        );
      case 'shipping':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <p className="text-sm text-wood/70">Miễn phí giao hàng và lắp đặt trong bán kính 20km từ Thuận An, Bình Dương.</p>
          </div>
        );
      default: return null;
    }
  };

  if (!product) return null;

  return (
    <div className="bg-ivory min-h-screen pb-20 relative">
      
      <AnimatePresence>
        {isNavigating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ivory/50 backdrop-blur-[2px] z-50 flex items-start justify-center pt-[30vh]"
          >
            <div className="bg-white/80 px-6 py-3 rounded-full shadow-lg border border-wood/10 flex items-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-maroon" />
              <span className="text-[12px] font-bold uppercase tracking-widest text-wood">Đang nạp biến thể...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-wood/40">
          <Link href="/" className="hover:text-maroon">Trang chủ</Link> <ChevronRight className="w-3 h-3" />
          <Link href="/san-pham" className="hover:text-maroon">Sản phẩm</Link> <ChevronRight className="w-3 h-3" />
          <span className="text-wood/80 font-bold line-clamp-1">{product.base_name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          
          <div className="space-y-6">
            <div className="aspect-square rounded-sm overflow-hidden bg-white border border-wood/5 relative">
              <OptimizedImage 
                src={displayImages[activeImage]} 
                alt={product.name} 
                aspectRatio="square" 
                className="w-full h-full" 
                priority={true} 
              />
            </div>
            {displayImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {displayImages.map((img: string, index: number) => (
                  <button key={index} onClick={() => setActiveImage(index)} className={`relative aspect-square rounded-sm overflow-hidden border-2 transition-all ${activeImage === index ? 'border-maroon' : 'border-transparent hover:border-maroon/30'}`}>
                    <OptimizedImage src={img} alt="thumbnail" aspectRatio="square" className="w-full h-full" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col text-left">
            <div className="mb-2">
              <h1 className="text-[32px] md:text-[40px] font-serif font-bold text-wood leading-tight mb-2">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6 mt-4">
                <span className="text-[28px] font-bold text-maroon">{formatPrice(product.price)}</span>
                {product.old_price && <span className="text-[18px] text-wood/30 line-through">{formatPrice(product.old_price)}</span>}
              </div>

              <div className="space-y-6 mb-8 border-y border-wood/5 py-6 relative">
                
                {/* 1. KÍCH THƯỚC */}
                <div>
                  <h4 className="text-sm font-bold text-wood mb-3">Kích thước</h4>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map(size => {
                      // Ưu tiên tìm biến thể có cùng màu hiện tại. Nếu không có, tự động chuyển sang màu khác của size đó
                      const targetVariant = groupVariants.find(v => v.size === size && v.material_code === product.material_code) || groupVariants.find(v => v.size === size);
                      const isActive = product.size === size;

                      return (
                        <button
                          key={size}
                          onClick={() => handleVariantChange(targetVariant.slug)}
                          disabled={isNavigating}
                          className={`px-6 py-2 border rounded-[2px] text-[12px] font-bold transition-all ${isActive ? 'border-maroon text-maroon bg-maroon/5 shadow-sm' : 'border-wood/10 text-wood/60 hover:border-wood/40 bg-white hover:bg-ivory'}`}
                        >
                          Size {size}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* 2. MÀU SẮC */}
                <div>
                  <h4 className="text-sm font-bold text-wood mb-3">
                    Bề mặt & Màu sắc: <span className="font-normal text-maroon">{MATERIAL_NAMES[product.material_code] || product.material_code}</span>
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {availableMaterials.map(matCode => {
                      const codeStr = matCode as string;
                      const matName = MATERIAL_NAMES[codeStr] || codeStr;
                      
                      // Ưu tiên tìm biến thể cùng size hiện tại. Nếu không có, tự động chuyển sang size khác của màu đó
                      const targetVariant = groupVariants.find(v => v.material_code === codeStr && v.size === product.size) || groupVariants.find(v => v.material_code === codeStr);
                      const isActive = product.material_code === codeStr;
                      const fallbackColor = MATERIAL_COLORS[codeStr] || '#CCCCCC';

                      return (
                        <button
                          key={codeStr}
                          onClick={() => handleVariantChange(targetVariant.slug)}
                          disabled={isNavigating}
                          className={`relative rounded-full transition-all flex items-center justify-center p-0.5 ${isActive ? 'border-2 border-maroon shadow-md scale-110' : 'border border-wood/20 hover:border-maroon/50 hover:scale-105'}`}
                          title={matName}
                        >
                          <div 
                            className="w-10 h-10 rounded-full overflow-hidden border border-wood/5"
                            style={{ backgroundColor: fallbackColor }}
                          >
                            <img 
                              src={getMaterialImageUrl(codeStr)} 
                              alt={matName} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          </div>
                          {isActive && (
                            <div className="absolute -top-1 -right-1 bg-maroon text-white rounded-full p-0.5 shadow-sm">
                              <Check className="w-3 h-3" />
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

              </div>

              <div className="mb-6">
                <div className={`space-y-4 text-justify relative transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-[1000px]' : 'max-h-[130px]'}`}>
                  {(product.description || '').split('\n').map((p: string, i: number) => (
                    p.trim() && <p key={i} className="text-wood/75 text-[15px] leading-[1.8]">{p}</p>
                  ))}
                  {!isExpanded && <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-ivory to-transparent pointer-events-none" />}
                </div>
                <button onClick={() => setIsExpanded(!isExpanded)} className="mt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-maroon hover:text-wood transition-colors flex items-center gap-1.5">
                  {isExpanded ? 'Thu gọn' : 'Đọc thêm chi tiết'} <ChevronDown className={`w-3.5 h-3.5 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

            <div className="space-y-6 mb-12 mt-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center border border-wood/10 rounded-full px-4 py-2 bg-white">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 hover:text-maroon"><Minus className="w-4 h-4" /></button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-1 hover:text-maroon"><Plus className="w-4 h-4" /></button>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} disabled={isAdded || isNavigating} onClick={handleAddToCart}
                  className={`flex-1 text-white py-4 rounded-full font-bold uppercase tracking-widest text-[13px] shadow-xl flex justify-center gap-3 ${isAdded ? 'bg-green-600' : 'bg-maroon hover:bg-wood'}`}
                >
                  {isAdded ? <><Check className="w-5 h-5" /> Đã thêm</> : <><ShoppingBag className="w-5 h-5" /> Thêm vào giỏ</>}
                </motion.button>
              </div>
            </div>

            <div className="border-t border-wood/10 pt-10">
              <div className="flex flex-wrap gap-6 mb-8">
                {tabs.map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 pb-2 text-[11px] font-bold uppercase tracking-widest border-b-2 ${activeTab === tab.id ? 'border-maroon text-maroon' : 'border-transparent text-wood/40 hover:text-wood'}`}>
                    <tab.icon className="w-4 h-4" /> {tab.label}
                  </button>
                ))}
              </div>
              <div className="min-h-[120px]">{renderTabContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}