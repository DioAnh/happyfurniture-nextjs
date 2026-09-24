import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';

export default createMiddleware(routing);

export const config = {
  // Chặn middleware chạy ở các file tĩnh, ảnh, api để tối ưu tốc độ
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};