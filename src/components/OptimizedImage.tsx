'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  priority?: boolean;
  tier?: 'thumbnail' | 'card' | 'detail' | 'original';
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  imgClassName = '',
  aspectRatio = 'auto',
  priority = false,
  tier = 'card'
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  // Nếu Vercel Image Optimization hết quota hoặc lỗi -> tự động fallback về ảnh gốc trực tiếp từ Supabase CDN
  const [fallbackToOriginal, setFallbackToOriginal] = useState(false);

  const aspectClass = 
    aspectRatio === 'square' ? 'aspect-square' : 
    aspectRatio === 'video' ? 'aspect-video' : 
    aspectRatio === 'portrait' ? 'aspect-[3/4]' : '';

  const quality = tier === 'thumbnail' ? 20 : (tier === 'card' ? 50 : (tier === 'detail' ? 80 : 100));
  const isUnoptimized = tier === 'original' || fallbackToOriginal;

  const sizes = tier === 'thumbnail' 
    ? '(max-width: 768px) 20vw, 10vw' 
    : (tier === 'card' ? '(max-width: 768px) 50vw, 33vw' : '(max-width: 768px) 100vw, 50vw');

  if (!src || src.startsWith('THAY_LINK')) {
    return (
      <div className={`w-full h-full bg-wood/5 flex items-center justify-center text-wood/30 text-xs ${aspectClass} ${className}`}>
        No Image
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden w-full h-full ${aspectClass} ${className}`} style={{ transform: 'translateZ(0)' }}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={quality}
        unoptimized={isUnoptimized}
        sizes={sizes}
        className={`
          object-cover transition-all duration-700 ease-in-out
          ${isLoading ? 'scale-110 blur-xl grayscale' : 'scale-100 blur-0 grayscale-0'}
          ${imgClassName}
        `}
        style={{ borderRadius: 'inherit' }}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          if (!fallbackToOriginal) {
            setFallbackToOriginal(true);
            setIsLoading(false);
          }
        }}
      />
    </div>
  );
};