import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { ScrollToTopFix } from "@/components/ScrollToTopFix";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.happyfurniture.net"),
  title: {
    default: "Happy Furniture - Xưởng Nội thất tại Bình Dương | Sản xuất, Thiết kế & Thi công",
    template: "%s | Happy Furniture", // Tự động thêm hậu tố cho các trang con
  },
  description: "Xưởng Nội thất Happy Furniture chuyên sản xuất, thiết kế và thi công lắp đặt nội thất gỗ công nghiệp MDF lõi xanh chống ẩm phủ Melamine chất lượng cao.",
  keywords: ["xưởng nội thất", "sản xuất nội thất", "thi công nội thất", "thiết kế nội thất", "nội thất gỗ công nghiệp", "nội thất hiện đại", "MDF lõi xanh chống ẩm", "nội thất bình dương", "nội thất thuận an"],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    siteName: "Happy Furniture",
    images: [
      {
        url: "https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/ogimage.png",
        width: 1200,
        height: 630,
        alt: "Happy Furniture Og Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/favicon.png",
    apple: "https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/favicon.png",
  }
};

// Khai báo Schema cho Trang chủ ngay tại Layout gốc
const HOME_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "name": "Happy Furniture",
      "url": "https://www.happyfurniture.net"
    },
    {
      "@type": "FurnitureStore",
      "name": "Happy Furniture",
      "alternateName": "Xưởng Nội thất Happy Furniture",
      "url": "https://www.happyfurniture.net",
      "telephone": "+84909163593",
      "priceRange": "$$",
      "openingHours": "Mo-Sa 09:00-18:00",
      "description": "Xưởng Nội thất, chuyên gỗ công nghiệp MDF lõi xanh chống ẩm phủ Melamine, nhận Thiết kế, Sản xuất và Thi công lắp đặt tại Bình Dương & TP.HCM",
      "image": "https://hkrgketabjgrmtjwntta.supabase.co/storage/v1/object/public/website-images/ogimage.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Thuận Giao",
        "addressLocality": "Thuận An",
        "addressRegion": "Bình Dương",
        "addressCountry": "VN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 10.9562375,
        "longitude": 106.7234531
      },
      "hasMap": "https://maps.app.goo.gl/wPNMErQWShXnE1iz5",
      "sameAs": [
        "https://www.facebook.com/profile.php?id=61585294213927",
        "https://zalo.me/0909163593",
        "https://www.instagram.com/happyfurniturevietnam/",
        "http://www.youtube.com/@HappyFurnitureAcademy"
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <meta name="geo.region" content="VN-61" />
        <meta name="geo.placename" content="Thuận An, Bình Dương" />
        <meta name="geo.position" content="10.9562375;106.7234531" />
        <meta name="ICBM" content="10.9562375, 106.7234531" />
        {/* Nhúng mã GTM */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TLLV7X7H');
            `,
          }}
        />
        {/* Thêm JSON-LD cho toàn trang */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_SCHEMA) }}
        />
      </head>
      <body className="antialiased min-h-screen bg-ivory text-wood flex flex-col font-sans">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TLLV7X7H"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        
        <CartProvider>
          <ScrollToTopFix />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
        
        <SpeedInsights />
      </body>
    </html>
  );
}