import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ingredients } from '@/data/ingredients';

export const metadata: Metadata = {
  title: '食材辞典',
  description: '海外レシピに登場する食材を日本語で解説。選び方・代用品・購入先まで、輸入食材の疑問にお答えします。',
  keywords: ['食材辞典', '輸入食材', '選び方', '代用品', 'パルミジャーノ', 'オリーブオイル'],
  alternates: {
    canonical: 'https://monde-recipe.com/ingredients',
  },
};

export default function IngredientsPage() {
  return (
    <div className="min-h-screen bg-warm-bg">
      {/* Hero */}
      <section className="bg-primary text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs tracking-widest uppercase text-white/40">Ingredient Glossary</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-4 leading-tight">
            食材辞典
          </h1>
          <p className="text-white/60 mt-6 text-base leading-relaxed max-w-2xl mx-auto">
            レシピに登場する食材について、もっと知りたいと思ったことはありませんか。
            選び方・代用品・購入先まで、輸入食材の疑問にお答えします。
          </p>
        </div>
      </section>

      {/* Ingredients */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
        {ingredients.map((ing) => (
          <Link
            key={ing.slug}
            href={`/ingredients/${ing.slug}`}
            className="group block bg-white border border-warm-border hover:border-primary transition-colors overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="relative sm:w-64 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
                <Image
                  src={ing.image}
                  alt={ing.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-xs tracking-widest uppercase text-accent">{ing.categoryLabel}</span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1 group-hover:text-accent transition-colors">
                    {ing.name}
                  </h2>
                  {ing.originalName && (
                    <p className="text-sm text-muted italic mt-1">{ing.originalName}</p>
                  )}
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mt-3">
                    {ing.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-warm-border">
                  <span className="text-xs text-gray-400">
                    使用レシピ {ing.relatedRecipeSlugs.length}品
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
