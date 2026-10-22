import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Nếu user chủ động bấm vào URL /en (hoặc /en/...) thì giữ nguyên theo URL
  const isExplicitEnglishUrl = pathname === '/en' || pathname.startsWith('/en/');

  if (!isExplicitEnglishUrl) {
    // Kiểm tra quốc gia thực tế từ IP của Vercel (Trên local dev sẽ là null -> mặc định coi là VN)
    const country = req.headers.get('x-vercel-ip-country') || 'VN';
    const savedLocale = req.cookies.get('NEXT_LOCALE')?.value;

    // Chỉ tự động chuyển sang /en nếu chắc chắn IP ở nước ngoài (khác VN) và user chưa từng chọn ngôn ngữ
    if (country !== 'VN' && !savedLocale && pathname === '/') {
      const url = req.nextUrl.clone();
      url.pathname = '/en';
      return NextResponse.redirect(url);
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};