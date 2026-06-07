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
  title: {
    template: '%s | MONDE RECIPE',
    default: 'MONDE RECIPE — 世界の名料理を、あなたの台所へ',
  },
  description:
    '海外の名料理レシピを日本語で丁寧に解説。フランス料理、イタリア料理、アメリカ料理など、家庭料理からプロ仕様まで幅広く紹介します。',
  keywords: ['レシピ', '料理', 'フランス料理', 'イタリア料理', '海外料理', '和訳レシピ'],
  openGraph: {
    siteName: 'MONDE RECIPE',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${playfair.variable} ${notoSerif.variable} ${notoSans.variable}`}>
      <body className="bg-cream font-sans">
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
