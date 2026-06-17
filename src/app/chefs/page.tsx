import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { chefs } from '@/data/chefs';
import { getRecipesByChef } from '@/data/recipes';

export const metadata: Metadata = {
  title: '世界のトップシェフ・ミシュランシェフのレシピ',
  description: 'ミシュラン星付きシェフが公開した本物のレシピを日本語で。レネ・レゼピ、マッシモ・ボットゥラ、アラン・パッサールのシグネチャー料理を家庭で再現。',
  keywords: ['トップシェフ', 'ミシュランシェフ', 'レネ・レゼピ', 'マッシモ・ボットゥラ', 'アラン・パッサール', '本格レシピ', 'シェフレシピ'],
  alternates: {
    canonical: 'https://recipe-world-jp.vercel.app/chefs',
  },
};

export default function ChefsPage() {
  return (
    <div className="min-h-screen bg-warm-bg">
      {/* Hero */}
      <section className="bg-primary text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs tracking-widest uppercase text-white/40">Top Chefs</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-4 leading-tight">
            世界のトップシェフ
          </h1>
          <p className="text-white/60 mt-6 text-base leading-relaxed max-w-2xl mx-auto">
            ミシュランの星を持つ世界的シェフたちが公開した、本物のレシピ。
            彼らの哲学と技術を、日本の台所で再現する。
          </p>
        </div>
      </section>

      {/* Chefs */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
        {chefs.map((chef) => {
          const chefRecipes = getRecipesByChef(chef.slug);
          return (
            <Link
              key={chef.slug}
              href={`/chefs/${chef.slug}`}
              className="group block bg-white border border-warm-border hover:border-primary transition-colors overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Image */}
                <div className="relative sm:w-64 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
                  <Image
                    src={chef.image}
                    alt={chef.nameJa}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-primary/20" />
                  <div className="absolute bottom-3 left-3 flex gap-1">
                    {Array.from({ length: chef.michelinStars }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">★</span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <span className="text-xs tracking-widest uppercase text-accent">{chef.nationality}</span>
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1 group-hover:text-accent transition-colors">
                          {chef.nameJa}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          {chef.name} — {chef.restaurant}、{chef.location}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                      {chef.bio}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-warm-border">
                    <span className="text-xs text-gray-400">
                      掲載レシピ {chefRecipes.length}品
                    </span>
                    <span className="text-xs tracking-widest uppercase text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                      レシピを見る
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
