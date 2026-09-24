import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Giải mã locale từ URL
  let locale = await requestLocale;

  // Nếu locale bị sai hoặc không tồn tại, tự động fallback về tiếng Việt
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    // Import đúng file từ điển trong thư mục messages
    messages: (await import(`./messages/${locale}.json`)).default
  };
});