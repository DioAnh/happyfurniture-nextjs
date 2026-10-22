'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageSquare, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/routing';
import { supabase } from '@/lib/supabase';

interface QuickLeadCTAProps {
  variant?: 'maroon' | 'ivory';
}

export const QuickLeadCTA: React.FC<QuickLeadCTAProps> = ({ variant = 'maroon' }) => {
  const t = useTranslations('QuickLead');
  const pathname = usePathname();

  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [focusedField, setFocusedField] = useState<'phone' | 'message' | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorText, setErrorText] = useState('');

  // Tính thời gian thực còn lại đến 00:00 đêm của ngày hôm nay (Reload không bị reset)
  const [timeLeft, setTimeLeft] = useState<{ hours: string; minutes: string; seconds: string } | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diffSeconds = Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 1000));

      const hrs = Math.floor(diffSeconds / 3600);
      const mins = Math.floor((diffSeconds % 3600) / 60);
      const secs = diffSeconds % 60;

      setTimeLeft({
        hours: hrs.toString().padStart(2, '0'),
        minutes: mins.toString().padStart(2, '0'),
        seconds: secs.toString().padStart(2, '0')
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const validatePhone = (rawPhone: string) => {
    const cleaned = rawPhone.replace(/[\s.-]/g, '');
    const regex = /^(0|\+?84)[35789][0-9]{8,9}$/;
    return {
      isValid: regex.test(cleaned) && cleaned.replace(/\D/g, '').length >= 10 && cleaned.replace(/\D/g, '').length <= 12,
      cleaned
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');

    const { isValid, cleaned } = validatePhone(phone);
    if (!isValid) {
      setStatus('error');
      setErrorText(t('errorInvalidPhone'));
      return;
    }

    setStatus('loading');

    try {
      const { error } = await supabase
        .from('consultation_leads')
        .insert([
          {
            phone: cleaned,
            message: message.trim() || null,
            source_page: pathname || '/'
          }
        ]);

      if (error) throw error;

      if (typeof window !== 'undefined' && (window as unknown as { dataLayer?: Record<string, unknown>[] }).dataLayer) {
        (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer.push({
          event: 'generate_lead',
          lead_source: pathname || '/',
          phone_number: cleaned
        });
      }

      setStatus('success');
      setPhone('');
      setMessage('');
    } catch (err) {
      console.error('Error saving consultation lead:', err);
      setStatus('error');
      setErrorText(t('errorSubmit'));
    }
  };

  const isMaroon = variant === 'maroon';

  return (
    <section className={`py-16 md:py-24 relative overflow-hidden ${isMaroon ? 'bg-maroon text-white' : 'bg-ivory text-wood border-t border-wood/10'}`}>
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Tiêu đề & Đồng hồ đếm ngược đến 0h đêm kiểu Editorial Minimalist */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h2 className={`text-[28px] sm:text-[36px] md:text-[44px] font-serif font-bold leading-tight text-balance ${isMaroon ? 'text-white' : 'text-wood'}`}>
            <span className="block md:whitespace-nowrap">{t('titleLine1')}</span>
            <span className={`block mt-1.5 font-normal italic md:whitespace-nowrap ${isMaroon ? 'text-white/90' : 'text-maroon'}`}>
              {t('titleLine2')}
            </span>
          </h2>

          {timeLeft && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <span className="h-px w-8 bg-current opacity-20" />
              <div className="flex items-center gap-2.5 text-xs uppercase tracking-[0.25em]">
                <span className="relative flex h-2 w-2 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span className="opacity-60 font-medium">{t('countdownLabel')}</span>
                <div className="flex items-baseline gap-1 font-mono text-base md:text-lg font-bold tracking-widest ml-1">
                  <span>{timeLeft.hours}</span>
                  <span className="opacity-40 animate-pulse">:</span>
                  <span>{timeLeft.minutes}</span>
                  <span className="opacity-40 animate-pulse">:</span>
                  <span>{timeLeft.seconds}</span>
                </div>
              </div>
              <span className="h-px w-8 bg-current opacity-20" />
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`max-w-xl mx-auto p-8 rounded-2xl text-center border ${
                isMaroon ? 'bg-white text-wood border-white shadow-2xl' : 'bg-white text-wood border-maroon/20 shadow-xl'
              }`}
            >
              <div className="w-14 h-14 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-wood mb-2">{t('successTitle')}</h3>
              <p className="text-wood/70 text-sm md:text-base mb-6">{t('successDesc')}</p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="text-xs font-bold uppercase tracking-widest text-maroon hover:text-wood underline underline-offset-4 transition-colors"
              >
                {t('sendAnother')}
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="max-w-4xl mx-auto"
            >
              <div className={`p-3 md:p-3.5 rounded-2xl shadow-2xl flex flex-col lg:flex-row gap-3 items-stretch transition-all duration-500 ${
                isMaroon ? 'bg-white' : 'bg-white border border-wood/10'
              }`}>
                {/* Input 1: Số điện thoại (Khi click vào sẽ zoom mượt mà và đẩy các ô bên phải sang phải) */}
                <div
                  className={`relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    focusedField === 'phone'
                      ? 'lg:flex-[1.65] lg:scale-[1.02] z-10'
                      : focusedField === 'message'
                      ? 'lg:flex-[0.85] opacity-90'
                      : 'lg:flex-[1]'
                  }`}
                >
                  <Phone
                    className={`w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 ${
                      focusedField === 'phone' ? 'text-maroon scale-110' : 'text-maroon/70'
                    }`}
                  />
                  <input
                    type="tel"
                    inputMode="numeric"
                    required
                    value={phone}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder={t('phonePlaceholder')}
                    className={`w-full h-full pl-11 pr-4 py-4 text-wood placeholder:text-wood/40 text-sm font-semibold rounded-xl border transition-all duration-300 focus:outline-none ${
                      focusedField === 'phone'
                        ? 'bg-white border-maroon shadow-lg shadow-maroon/10 ring-2 ring-maroon/10'
                        : 'bg-ivory/60 hover:bg-ivory border-wood/10'
                    }`}
                  />
                </div>

                {/* Input 2: Lời nhắn nhanh (Khi click vào cũng zoom to và giãn rộng mượt mà) */}
                <div
                  className={`relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    focusedField === 'message'
                      ? 'lg:flex-[2.2] lg:scale-[1.02] z-10'
                      : focusedField === 'phone'
                      ? 'lg:flex-[1.15] opacity-90'
                      : 'lg:flex-[1.4]'
                  }`}
                >
                  <MessageSquare
                    className={`w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 ${
                      focusedField === 'message' ? 'text-maroon scale-110' : 'text-wood/40'
                    }`}
                  />
                  <input
                    type="text"
                    value={message}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('messagePlaceholder')}
                    className={`w-full h-full pl-11 pr-4 py-4 text-wood placeholder:text-wood/40 text-sm rounded-xl border transition-all duration-300 focus:outline-none ${
                      focusedField === 'message'
                        ? 'bg-white border-maroon shadow-lg shadow-maroon/10 ring-2 ring-maroon/10'
                        : 'bg-ivory/60 hover:bg-ivory border-wood/10'
                    }`}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-maroon hover:bg-wood disabled:opacity-60 text-white px-7 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center gap-2.5 shrink-0 cursor-pointer shadow-lg shadow-maroon/20 active:scale-95"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t('submittingBtn')}</span>
                    </>
                  ) : (
                    <>
                      <span>{t('submitBtn')}</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              {status === 'error' && errorText && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-3 flex items-center justify-center gap-2 text-xs font-semibold ${
                    isMaroon ? 'text-amber-200' : 'text-red-600'
                  }`}
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorText}</span>
                </motion.div>
              )}

              {/* Dòng liên hệ nhanh phụ trợ */}
              <div className={`mt-5 flex items-center justify-center gap-3 text-xs ${
                isMaroon ? 'text-white/70' : 'text-wood/60'
              }`}>
                <span>{t('directContactLabel')}</span>
                <a href="tel:0909163593" className="font-bold underline underline-offset-4 hover:opacity-80">
                  0909.163.593
                </a>
                <span>/</span>
                <a href="https://zalo.me/0909163593" target="_blank" rel="noreferrer" className="font-bold underline underline-offset-4 hover:opacity-80">
                  Zalo OA
                </a>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};