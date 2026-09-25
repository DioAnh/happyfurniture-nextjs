'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';
import { useTranslations } from 'next-intl';

export default function CartClient() {
  const { cart, updateQuantity, removeFromCart, totalPrice } = useCart();
  const t = useTranslations('Cart');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center bg-ivory border-t border-wood/5">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm">
          <ShoppingBag className="w-10 h-10 text-wood/20" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-wood mb-4 text-center">{t('emptyTitle')}</h2>
        <p className="text-wood/50 mb-10 max-w-md mx-auto">{t('emptyDesc')}</p>
        <Link href="/san-pham" className="bg-maroon text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[13px] hover:bg-wood transition-all shadow-xl shadow-maroon/20">
          {t('exploreBtn')}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen py-20 border-t border-wood/5">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-[32px] md:text-[42px] font-serif font-bold text-wood mb-12">{t('title')}</h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* CỘT TRÁI: DANH SÁCH MÓN HÀNG */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <motion.div key={item.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-sm shadow-sm border border-wood/5 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-[2px] overflow-hidden shrink-0 border border-wood/5 aspect-square relative">
                  {/* DÙNG THUMBNAIL ĐỂ LOAD SIÊU TỐC TRONG GIỎ HÀNG */}
                  <OptimizedImage src={item.image} alt={item.name} tier="thumbnail" aspectRatio="square" className="w-full h-full" />
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-wood mb-1">{item.name}</h3>
                  <p className="text-xs text-wood/40 uppercase tracking-widest mb-2">{item.material}</p>
                  <p className="text-maroon font-bold">{formatPrice(item.price)}</p>
                </div>

                <div className="flex items-center gap-4 bg-ivory/50 p-2 rounded-full border border-wood/5">
                  <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-full transition-colors text-wood/60">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-bold text-wood text-sm">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-full transition-colors text-wood/60">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-right hidden sm:block min-w-[120px]">
                  <p className="text-lg font-bold text-wood">{formatPrice(item.price * item.quantity)}</p>
                </div>

                <button onClick={() => removeFromCart(item.id)} className="p-3 text-wood/20 hover:text-maroon transition-colors" title="Xóa">
                  <Trash2 className="w-5 h-5" />
                </button>
              </motion.div>
            ))}

            <div className="bg-blue-50/50 p-6 rounded-sm border border-blue-100 flex items-start gap-4">
              <Truck className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
              <p className="text-sm text-blue-800 leading-relaxed">
                <span className="font-bold">{t('shippingPolicyTitle')}</span> {t('shippingPolicyDesc')}
              </p>
            </div>
          </div>

          {/* CỘT PHẢI: TỔNG KẾT ĐƠN HÀNG */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-sm shadow-xl border border-wood/5 sticky top-32">
              <h3 className="text-xl font-bold text-wood mb-8 uppercase tracking-widest border-b border-wood/10 pb-4">{t('summaryTitle')}</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-wood/60 text-sm">
                  <span>{t('subtotal').replace('{count}', cart.length.toString())}</span>
                  <span className="font-medium text-wood">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-wood/60 text-sm">
                  <span>{t('shippingFee')}</span>
                  <span className="text-green-600 font-bold uppercase tracking-widest text-[10px]">{t('freeShipping')}</span>
                </div>
                <div className="pt-6 border-t border-wood/10 flex justify-between items-center mt-2">
                  <span className="font-bold text-wood uppercase tracking-widest text-sm">{t('total')}</span>
                  <span className="text-2xl font-bold text-maroon">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <Link href="/thanh-toan" className="w-full bg-maroon text-white py-4 rounded-sm font-bold uppercase tracking-widest text-[12px] hover:bg-wood transition-all shadow-xl shadow-maroon/20 flex items-center justify-center gap-3">
                {t('checkoutBtn')}
                <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="text-center text-[10px] text-wood/40 uppercase tracking-widest mt-6 leading-relaxed">
                {t('terms')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}