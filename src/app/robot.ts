import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/gio-hang', '/thanh-toan', '/404'],
    },
    sitemap: 'https://www.happyfurniture.net/sitemap.xml',
  };
}