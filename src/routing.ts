import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['vi', 'en'],
  defaultLocale: 'vi',
  localePrefix: 'as-needed',
  // Tắt tự động đọc Accept-Language của trình duyệt để 100% khách ở VN luôn vào bản Tiếng Việt
  localeDetection: false
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);