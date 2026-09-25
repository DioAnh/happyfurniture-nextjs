'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';
import { ChevronLeft, CreditCard, Landmark, CheckCircle2, ShieldCheck, PackageCheck, Loader2 } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';
import { useTranslations } from 'next-intl';

export default function CheckoutClient() {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const t = useTranslations('Checkout');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    district: '',
    city: 'Bình Dương',
    note: '',
    paymentMethod: 'transfer'
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone) {
      alert(t('alertPhone'));
      return;
    }
    setIsSubmitting(true);

    try {
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([{
          customer_name: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          note: formData.note,
          payment_method: formData.paymentMethod,
          total: totalPrice,
          deposit: totalPrice * 0.2,
          status: 'pending'
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // Event Tracking cho Marketing (Nếu bạn có gắn Google Analytics)
      const dataLayer = (window as any).dataLayer = (window as any).dataLayer || [];
      dataLayer.push({ ecommerce: null });
      dataLayer.push({
        event: "purchase",
        ecommerce: {
          transaction_id: orderData.id || `ORD-${Date.now()}`,
          value: totalPrice,
          currency: "VND",
          items: cart.map((item: any) => ({
            item_id: item.id || item.sku,
            item_name: item.name,
            item_category: item.material || item.category,
            price: item.price,
            quantity: item.quantity
          }))
        }
      });

      setIsSuccess(true);
      clearCart();
    } catch (error) {
      console.error('Checkout error:', error);
      alert(t('alertError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 bg-ivory">
        <h2 className="text-2xl font-serif font-bold text-wood mb-8">{t('emptyCart')}</h2>
        <Link href="/san-pham" className="bg-maroon text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] shadow-lg">
          {t('backToShop')}
        </Link>
      </div>
    );
  }

  // MÀN HÌNH THÀNH CÔNG
  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6 bg-ivory">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-10 rounded-sm shadow-xl border border-wood/5 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-wood mb-4">{t('successTitle')}</h2>
          <p className="text-wood/60 text-sm mb-8 leading-relaxed">
            {t('successDesc')}
          </p>
          <button onClick={() => router.push('/')} className="w-full bg-wood text-white py-4 rounded-sm font-bold uppercase tracking-widest text-[11px] hover:bg-maroon transition-colors">
            {t('continueShopping')}
          </button>
        </motion.div>
      </div>
    );
  }

  // GIAO DIỆN FORM THANH TOÁN
  return (
    <div className="bg-ivory min-h-screen py-12 md:py-20 border-t border-wood/5">
      <div className="max-w-7xl mx-auto px-6">
        <Link href="/gio-hang" className="inline-flex items-center gap-2 text-wood/50 hover:text-maroon font-bold text-xs uppercase tracking-widest transition-colors mb-8">
          <ChevronLeft className="w-4 h-4" /> {t('backToCart')}
        </Link>
        
        <h1 className="text-[32px] md:text-[42px] font-serif font-bold text-wood mb-12">{t('title')}</h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* CỘT TRÁI: FORM ĐIỀN THÔNG TIN */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-8 rounded-sm shadow-sm border border-wood/5">
              <h2 className="text-lg font-bold text-wood mb-6 uppercase tracking-widest border-b border-wood/10 pb-4 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-maroon text-white flex items-center justify-center text-xs">1</span> 
                {t('contactInfo')}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-wood/50">{t('fullName')} *</label>
                  <input required type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full bg-ivory/50 border border-wood/10 px-4 py-3 rounded-[2px] focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon text-wood transition-colors" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-wood/50">{t('phone')} *</label>
                  <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-ivory/50 border border-wood/10 px-4 py-3 rounded-[2px] focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon text-wood transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-wood/50">{t('city')} *</label>
                  <input required type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full bg-ivory/50 border border-wood/10 px-4 py-3 rounded-[2px] focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon text-wood transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-wood/50">{t('district')} *</label>
                  <input required type="text" value={formData.district} onChange={(e) => setFormData({...formData, district: e.target.value})} className="w-full bg-ivory/50 border border-wood/10 px-4 py-3 rounded-[2px] focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon text-wood transition-colors" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-wood/50">{t('address')} *</label>
                  <input required type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full bg-ivory/50 border border-wood/10 px-4 py-3 rounded-[2px] focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon text-wood transition-colors" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-wood/50">{t('note')}</label>
                  <textarea rows={3} value={formData.note} onChange={(e) => setFormData({...formData, note: e.target.value})} className="w-full bg-ivory/50 border border-wood/10 px-4 py-3 rounded-[2px] focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon text-wood transition-colors resize-none" />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-sm shadow-sm border border-wood/5">
              <h2 className="text-lg font-bold text-wood mb-6 uppercase tracking-widest border-b border-wood/10 pb-4 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-maroon text-white flex items-center justify-center text-xs">2</span> 
                {t('paymentMethod')}
              </h2>
              
              <div className="space-y-4">
                <label className={`flex items-center gap-4 p-4 border rounded-[2px] cursor-pointer transition-all ${formData.paymentMethod === 'transfer' ? 'border-maroon bg-maroon/5 shadow-sm' : 'border-wood/10 hover:border-wood/30'}`}>
                  <input type="radio" name="payment" value="transfer" checked={formData.paymentMethod === 'transfer'} onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})} className="w-4 h-4 accent-maroon" />
                  <Landmark className={`w-6 h-6 ${formData.paymentMethod === 'transfer' ? 'text-maroon' : 'text-wood/50'}`} />
                  <span className="font-bold text-sm text-wood">{t('transfer')}</span>
                </label>

                <label className={`flex items-center gap-4 p-4 border rounded-[2px] cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-maroon bg-maroon/5 shadow-sm' : 'border-wood/10 hover:border-wood/30'}`}>
                  <input type="radio" name="payment" value="cod" checked={formData.paymentMethod === 'cod'} onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})} className="w-4 h-4 accent-maroon" />
                  <CreditCard className={`w-6 h-6 ${formData.paymentMethod === 'cod' ? 'text-maroon' : 'text-wood/50'}`} />
                  <span className="font-bold text-sm text-wood">{t('cod')}</span>
                </label>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: HÓA ĐƠN */}
          <div className="lg:col-span-5">
            <div className="bg-wood p-8 rounded-sm shadow-2xl border border-wood/10 sticky top-32 text-ivory">
              <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4 flex items-center gap-3">
                <PackageCheck className="w-5 h-5 text-maroon" />
                {t('summaryTitle')}
              </h3>
              
              <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-[2px] overflow-hidden shrink-0 border border-white/10 bg-white">
                      <OptimizedImage src={item.image} alt={item.name} tier="thumbnail" aspectRatio="square" className="w-full h-full" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white line-clamp-1">{item.name}</h4>
                      <p className="text-[10px] text-white/50 uppercase tracking-widest mt-1">MÀU: {item.material}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-white/60">SL: {item.quantity}</span>
                        <span className="text-sm font-bold text-white">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-white/10">
                <div className="flex justify-between text-white/70 text-sm">
                  <span>Tạm tính</span>
                  <span className="font-medium text-white">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-white/70 text-sm">
                  <span>Phí vận chuyển</span>
                  <span className="text-green-400 font-bold uppercase tracking-widest text-[10px]">Miễn phí</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-center mt-2">
                  <span className="font-bold text-white uppercase tracking-widest text-sm">Tổng thanh toán</span>
                  <span className="text-2xl font-bold text-maroon bg-white px-3 py-1 rounded-sm">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <div className="mt-8 bg-black/20 p-4 rounded-sm border border-white/5 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-yellow-500 shrink-0" />
                <p className="text-[11px] text-white/70 leading-relaxed">
                  {t('depositNote')}
                </p>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full mt-8 bg-maroon text-white py-5 rounded-sm font-bold uppercase tracking-widest text-[13px] hover:bg-white hover:text-maroon transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> {t('processing')}</>
                ) : (
                  <>{t('placeOrder')}</>
                )}
              </button>
            </div>
          </div>
          
        </form>
      </div>
    </div>
  );
}