'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollToTopFix() {
  const pathname = usePathname();

  useEffect(() => {
    // Ép trình duyệt cuộn lên đầu ngay lập tức mỗi khi URL thay đổi
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null; // Component này chạy ngầm, không render ra UI
}