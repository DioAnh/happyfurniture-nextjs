import type { Metadata } from 'next';
import HomeClient from './HomeClient';
import { getTranslations } from 'next-intl/server';

// Hàm generateMetadata sẽ chạy trên Server để render SEO động
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>; // Vẫn chuẩn Promise cho Next.js 15+
}): Promise<Metadata> {
  // Giải mã locale từ URL
  const { locale } = await params;
  
  // Gọi hàm dịch thuật trên Server (Server-side translation)
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      // Đảm bảo thẻ Canonical trỏ đúng link SEO cho từng ngôn ngữ
      canonical: locale === 'vi' ? '/' : `/${locale}`,
    },
  };
}

export default function HomePage() {
  return <HomeClient />;
}