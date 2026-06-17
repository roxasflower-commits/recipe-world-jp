import type { Metadata } from 'next';
import AboutContent from './about-content';

export const metadata: Metadata = {
  title: 'このサイトについて | MONDE RECIPE',
  description: '世界中の本場レシピを日本語で。MONDE RECIPEが生まれた経緯と、サイトへの想いをご紹介します。',
  alternates: {
    canonical: 'https://recipe-world-jp.vercel.app/about',
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
