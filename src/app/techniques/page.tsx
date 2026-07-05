import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { techniques } from '@/data/techniques';

export const metadata: Metadata = {
  title: '料理のコツ・基本テクニック集',
  description: 'プロの料理人が使う基本テクニックを日本語で解説。パスタの乳化、卵白の泡立て方など、レシピが美味しくなる「なぜ」を丁寧に紹介します。',
  keywords: ['料理 コツ', '料理 テクニック', 'パスタ 乳化', '卵白 泡立て方', '基本技術'],
  alternates: {
    canonical: 'https://monde-recipe.com/techniques',
  },
};

export default function TechniquesPage() {
  return (
    <div className="min-h-screen bg-warm-bg">
      {/* Hero */}
      <section className="bg-primary text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs tracking-widest uppercase text-white/40">Techniques</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-4 leading-tight">
            料理の基本テクニック
          </h1>
          <p className="text-white/60 mt-6 text-base leading-relaxed max-w-2xl mx-auto">
            レシピが美味しくなるかどうかは、ちょっとしたコツの積み重ねで決まります。
            プロも使う基本テクニックを、失敗しやすいポイントとあわせて解説します。
          </p>
        </div>
      </section>

      {/* Techniques */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
        {techniques.map((tech) => (
          <Link
            key={tech.slug}
            href={`/techniques/${tech.slug}`}
            className="group block bg-white border border-warm-border hover:border-primary transition-colors overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="relative sm:w-64 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
                <Image
                  src={tech.image}
                  alt={tech.shortTitle}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-xs tracking-widest uppercase text-accent">{tech.categoryLabel}</span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1 group-hover:text-accent transition-colors">
                    {tech.shortTitle}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mt-3">
                    {tech.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-warm-border">
                  <span className="text-xs text-gray-400">
                    関連レシピ {tech.relatedRecipeSlugs.length}品
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
