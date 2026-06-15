import type { Metadata } from 'next';
import { Playfair_Display, Noto_Serif_JP, Noto_Sans_JP } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const notoSerif = Noto_Serif_JP({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-noto-serif',
  display: 'swap',
});

const notoSans = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-noto-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://recipe-world-jp.vercel.app'),
  title: {
    template: '%s | MONDE RECIPE',
    default: 'MONDE RECIPE — 世界の名料理を、あなたの台所へ',
  },
  description:
    '海外の名料理レシピを日本語で丁寧に解説。フランス料理・イタリア料理・スペイン料理・インド料理・トルコ料理など、世界各国の作り方を家庭料理からプロ仕様まで幅広く紹介。',
  keywords: ['レシピ', '料理', 'フランス料理 レシピ', 'イタリア料理 レシピ', '海外料理 作り方', '世界料理 レシピ', 'スペイン料理', 'インド料理'],
  openGraph: {
    siteName: 'MONDE RECIPE',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: 'https://recipe-world-jp.vercel.app',
  },
  verification: {
    google: 'e_Sxs6ej-k2RQZZ_UtY1QzuHMTsMeLARCKuF5Xnahm8',
    other: {
      'p:domain_verify': '0350f60983f7d2c7918c046d311f4e1d',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${playfair.variable} ${notoSerif.variable} ${notoSans.variable}`}>
      <body className="bg-cream font-sans">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3MD273BE6S"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3MD273BE6S');
          `}
        </Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7568884988315625"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
