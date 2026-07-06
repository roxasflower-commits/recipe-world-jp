import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { guides } from '@/data/guides';

export const metadata: Metadata = {
  title: '料理カルチャーガイド',
  description: '世界の料理の背景にある文化・歴史をまとめて解説。系統立てて知ることで、レシピ選びがもっと楽しくなります。',
  keywords: ['料理 文化', '料理 歴史', 'ローマ 四大パスタ', 'カルチャーガイド'],
  alternates: {
    canonical: 'https://monde-recipe.com/guides',
  },
};

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-warm-bg">
      {/* Hero */}
      <section className="bg-primary text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs tracking-widest uppercase text-white/40">Culture Guides</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-4 leading-tight">
            料理カルチャーガイド
          </h1>
          <p className="text-white/60 mt-6 text-base leading-relaxed max-w-2xl mx-auto">
            一皿一皿の背景には、その土地の歴史や文化があります。
            レシピ同士のつながりを知れば、世界の料理がもっと奥深く楽しめます。
          </p>
        </div>
      </section>

      {/* Guides */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group block bg-white border border-warm-border hover:border-primary transition-colors overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="relative sm:w-64 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
                <Image
                  src={guide.image}
                  alt={guide.shortTitle}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-xs tracking-widest uppercase text-accent">{guide.categoryLabel}</span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1 group-hover:text-accent transition-colors">
                    {guide.shortTitle}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mt-3">
                    {guide.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-warm-border">
                  <span className="text-xs text-gray-400">
                    紹介レシピ {guide.dishes.length}品
                  </span>
                  <span className="text-xs tracking-widest uppercase text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                    詳しく見る
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
