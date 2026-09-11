'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  aspectRatio?: 'square' | 'video' | 'auto';
  priority?: boolean;
}

const DEFAULT_PLACEHOLDER = 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=800&auto=format&fit=crop';

export const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = DEFAULT_PLACEHOLDER,
  aspectRatio = 'auto',
  priority = false,
}) => {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);

  useEffect(() => {
    setImgSrc(src || fallbackSrc);
  }, [src, fallbackSrc]);

  const aspectClass = aspectRatio === 'square' ? 'aspect-square' : 
                      aspectRatio === 'video' ? 'aspect-video' : '';

  // Kiểm tra xem ảnh có phải từ Supabase không
  const isSupabaseImage = imgSrc.includes('supabase.co');

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      priority={priority}
      // BƯỚC ĐỘT PHÁ: Nếu là ảnh Supabase (đã là WebP), không cần Next.js nén lại nữa!
      unoptimized={isSupabaseImage}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={`object-cover ${aspectClass} ${className}`.trim()}
      onError={() => {
        if (imgSrc !== fallbackSrc) setImgSrc(fallbackSrc);
      }}
    />
  );
};