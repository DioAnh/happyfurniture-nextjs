'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { 
  ShoppingBag, Phone, MessageCircle, Ruler, ShieldCheck, 
  Truck, ChevronRight, Star, Minus, Plus, Heart, PenTool, Check, ChevronDown
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { OptimizedImage } from '@/components/OptimizedImage';

export default function ProductDetailClient({ initialProduct }: { initialProduct: any }) {
  const [product] = useState(initialProduct);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('dimensions');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { addToCart, setIsCartOpen, setIsAnimatingCartIcon } = useCart();

  useEffect(() => {
    if (product) {
      const dataLayer = (window as any).dataLayer = (window as any).dataLayer || [];
      dataLayer.push({ ecommerce: null });
      dataLayer.push({
        event: "view_item",
        ecommerce: {
          currency: "VND",
          value: product.price || 0,
          items: [{
            item_id: product.sku || product.id,
            item_name: product.name,
            index: 0,
            item_category: product.type_code || product.category,
            price: product.price || 0,
            quantity: 1
          }]
        }
      });
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price || 0,
      image: product.images?.[0],
      material: product.material
    }, quantity);

    const dataLayer = (window as any).dataLayer = (window as any).dataLayer || [];
    dataLayer.push({ ecommerce: null });
    dataLayer.push({
      event: "add_to_cart",
      ecommerce: {
        currency: "VND",
        value: (product.price || 0) * quantity,
        items: [{
          item_id: product.sku || product.id,
          item_name: product.name,
          item_category: product.type_code || product.category,
          price: product.price || 0,
          quantity: quantity
        }]
      }
    });

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
                  <td className="py-3 text-wood/60 w-1/3">Kích thước tổng thể</td>
                  <td className="py-3 font-medium">{product?.dimensions || 'Liên hệ để biết thêm'}</td>
                </tr>
                <tr className="border-b border-wood/5">
                  <td className="py-3 text-wood/60">Kích cỡ</td>
                  <td className="py-3 font-medium">{product?.size || 'N/A'}</td>
                </tr>
                <tr className="border-b border-wood/5">
                  <td className="py-3 text-wood/60">SKU</td>
                  <td className="py-3 font-medium">{product?.sku || 'N/A'}</td>
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
              Sản phẩm sử dụng <span className="text-maroon font-bold">{product?.material}</span>. 
              Đây là loại ván công nghiệp loại 1, có khả năng chống cong vênh, mối mọt và chịu ẩm cực tốt 
              trong điều kiện khí hậu Việt Nam. Bề mặt phủ lớp chống trầy xước, dễ dàng vệ sinh và giữ màu bền đẹp theo thời gian.
            </p>
          </div>
        );
      case 'warranty':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h4 className="font-bold text-wood mb-4">Chính sách hậu mãi</h4>
            <ul className="space-y-3 text-sm text-wood/70">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-maroon mt-1.5 shrink-0" />
                <span>Cam kết bảo hành <span className="font-bold text-wood">12 tháng</span> cho các lỗi kỹ thuật từ nhà sản xuất.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-maroon mt-1.5 shrink-0" />
                <span>Hỗ trợ bảo trì trọn đời từ đội ngũ thợ lành nghề của Happy Furniture.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-maroon mt-1.5 shrink-0" />
                <span>Xử lý yêu cầu bảo hành trong vòng 48h làm việc.</span>
              </li>
            </ul>
          </div>
        );
      case 'shipping':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h4 className="font-bold text-wood mb-4">Giao hàng & Lắp đặt</h4>
            <p className="text-sm text-wood/70 leading-relaxed">
              <span className="text-maroon font-bold">Miễn phí lắp đặt tận nơi</span> trong bán kính 20km 
              từ showroom Thuận An, Bình Dương. Hỗ trợ vận chuyển và lắp đặt trọn gói toàn khu vực TPHCM 
              và các tỉnh lân cận với mức phí ưu đãi từ xưởng.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  if (!product) return null;

  return (
    <div className="bg-ivory min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-wood/40">
          <Link href="/" className="hover:text-maroon">Trang chủ</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/san-pham" className="hover:text-maroon">Sản phẩm</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-wood/80 font-bold line-clamp-1">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Gallery */}
          <div className="space-y-6">
            <div className="aspect-square rounded-sm overflow-hidden bg-white border border-wood/5 relative">
              <OptimizedImage 
                src={product.images?.[activeImage]} 
                alt={`${product.name} - ảnh lớn`} 
                aspectRatio="square"
                className="w-full h-full"
                priority={true} 
              />
            </div>
            
            {product.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative aspect-square rounded-sm overflow-hidden border-2 transition-all ${
                      activeImage === index ? 'border-maroon' : 'border-transparent hover:border-maroon/30'
                    }`}
                  >
                    <OptimizedImage src={img} alt={`${product.name} thumbnail ${index + 1}`} aspectRatio="square" className="w-full h-full" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="flex flex-col text-left">
            <div className="mb-2">
              <h1 className="text-[32px] md:text-[40px] font-serif font-bold text-wood leading-tight mb-2">
                {product.name}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-[14px] text-wood/50 font-medium mb-5">
                {product.dimensions && (
                  <span>Kích thước: {product.dimensions}</span>
                )}
                <span className="w-1 h-1 rounded-full bg-wood/30"></span>
                <div className="flex items-center gap-1.5">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest mt-0.5">(24)</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-[28px] font-bold text-maroon">
                  {product.price ? formatPrice(product.price) : 'Liên hệ'}
                </span>
                {product.old_price && (
                  <span className="text-[18px] text-wood/30 line-through">{formatPrice(product.old_price)}</span>
                )}
              </div>

              <div className="mb-6">
                <div 
                  className={`space-y-4 text-justify relative transition-all duration-500 overflow-hidden ${
                    isExpanded ? 'max-h-[1000px]' : 'max-h-[130px]'
                  }`}
                >
                  {product.description?.split('\n').map((paragraph: string, index: number) => {
                    if (!paragraph.trim()) return null;
                    return (
                      <p key={index} className="text-wood/75 text-[15px] leading-[1.8]">
                        {paragraph}
                      </p>
                    );
                  })}
                  
                  {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-ivory to-transparent pointer-events-none" />
                  )}
                </div>

                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-maroon hover:text-wood transition-colors flex items-center gap-1.5"
                >
                  {isExpanded ? 'Thu gọn' : 'Đọc thêm chi tiết'}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-between mb-4 border-b border-wood/5 pb-4">
                <div className="flex items-center gap-2 text-sm font-bold text-green-600">
                  <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                  {product.stock_status || 'Đang có hàng tại kho'}
                </div>
                <div className="text-[11px] uppercase tracking-widest text-wood/40 font-bold">
                  SKU: <span className="text-wood/80">{product.sku || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-6">
                <div className="flex items-center border border-wood/10 rounded-full px-4 py-2 bg-white">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 hover:text-maroon">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-1 hover:text-maroon">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.97 }}   
                  disabled={isAdded}           
                  onClick={handleAddToCart}
                  className={`flex-1 text-white py-4 rounded-full font-bold uppercase tracking-widest text-[13px] transition-all duration-300 shadow-xl flex items-center justify-center gap-3 ${
                    isAdded 
                      ? 'bg-green-600 shadow-green-600/20' 
                      : 'bg-maroon hover:bg-wood shadow-maroon/20'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5" /> Đã thêm thành công
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" /> Thêm vào giỏ hàng
                    </>
                  )}
                </motion.button>
                <button className="w-14 h-14 rounded-full border border-wood/10 flex items-center justify-center hover:bg-maroon/5 hover:border-maroon transition-all group bg-white">
                  <Heart className="w-6 h-6 text-wood group-hover:text-maroon" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <a 
                  href="tel:0909163593"
                  className="flex items-center justify-center gap-3 border-2 border-wood/10 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-wood hover:text-white transition-all bg-white"
                >
                  <Phone className="w-4 h-4" /> Gọi tư vấn
                </a>
                <a 
                  href="https://zalo.me/0909163593"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-3 bg-[#0068ff] text-white py-4 rounded-full font-bold uppercase tracking-widest text-[11px] hover:opacity-90 transition-all"
                >
                  <MessageCircle className="w-4 h-4" /> Chat Zalo
                </a>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-t border-wood/10 pt-10">
              <div className="flex flex-wrap gap-6 mb-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 pb-2 text-[11px] font-bold uppercase tracking-widest transition-all border-b-2 ${
                      activeTab === tab.id ? 'border-maroon text-maroon' : 'border-transparent text-wood/40 hover:text-wood'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="min-h-[120px]">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}