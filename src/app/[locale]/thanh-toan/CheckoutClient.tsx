'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';
import { 
  ChevronLeft, CreditCard, Landmark, PhoneCall, 
  CheckCircle2, ShieldCheck, PackageCheck
} from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';

export default function CheckoutClient() {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();
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
      alert('Vui lòng điền số điện thoại để chúng tôi có thể liên hệ xác nhận!');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. LƯU ĐƠN HÀNG VÀO SUPABASE (Thay thế cho OrderService cũ)
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

      // 2. GA4: Track sự kiện mua hàng thành công
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
      alert('Có lỗi xảy ra khi lưu đơn hàng, vui lòng thử lại!');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 bg-ivory">
        <h2 className="text-2xl font-serif font-bold text-wood mb-8">Giỏ hàng của bạn đang trống</h2>
        <Link href="/san-pham" className="bg-maroon text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-[11px]">
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  // COPY TỪ DÒNG <div className="bg-ivory min-h-screen py-12 md:py-20"> TRỞ XUỐNG CỦA BẠN
  // LƯU Ý QUAN TRỌNG: 
  // 1. Thay <Link to="..."> thành <Link href="...">
  // 2. Trong Modal thành công, thay navigate('/') thành router.push('/')
  return (
    <div className="bg-ivory min-h-screen py-12 md:py-20">
      {/* COPY TOÀN BỘ GIAO DIỆN CỦA BẠN VÀO ĐÂY */}
      {/* Nhớ sửa thẻ <Link> và hàm navigate */}
    </div>
  );
}