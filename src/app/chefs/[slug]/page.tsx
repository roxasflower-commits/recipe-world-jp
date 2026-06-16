import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { chefs, getChefBySlug } from '@/data/chefs';
import { getRecipesByChef } from '@/data/recipes';

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return chefs.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const chef = getChefBySlug(params.slug);
  if (!chef) return {};
  return {
    title: `${chef.nameJa}のレシピ・料理哲学`,
    description: `${chef.nameJa}（${chef.name}）の本格レシピを日本語で解説。${chef.restaurant}（${chef.location}）のミシュラン${chef.michelinStars}つ星シェフ。${chef.bio.slice(0, 60)}`,
    keywords: [chef.nameJa, chef.name, `${chef.nameJa} レシピ`, chef.restaurant, 'ミシュラン', '本格レシピ'],
    alternates: {
      canonical: `/chefs/${chef.slug}`,
    },
  };
}

export default function ChefPage({ params }: Props) {
  const chef = getChefBySlug(params.slug);
  if (!chef) notFound();

  const recipes = getRecipesByChef(chef.slug);

  return (
    <div className="min-h-screen bg-warm-bg">
      {/* Hero */}
      <section className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            href="/chefs"
            className="inline-flex items-center gap-2 text-white/40 text-xs tracking-widest uppercase hover:text-white transition-colors mb-8"
          >
            <svg className="w-3 h-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            トップシェフ一覧
          </Link>

          <div className="flex flex-col sm:flex-row gap-8 items-start">
            {/* Photo */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex-shrink-0 overflow-hidden">
              <Image
                src={chef.image}
                alt={chef.nameJa}
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <span className="text-xs tracking-widest uppercase text-white/40">{chef.nationality}</span>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-2 leading-tight">
                {chef.nameJa}
              </h1>
              <p className="text-white/50 text-base mt-1">{chef.name}</p>

              <div className="flex flex-wrap gap-4 mt-4 text-sm text-white/60">
                <span className="flex items-center gap-1">
                  <span className="text-yellow-400">{'★'.repeat(chef.michelinStars)}</span>
                  <span>ミシュラン{chef.michelinStars}つ星</span>
                </span>
                <span>{chef.restaurant}</span>
                <span>{chef.location}</span>
                <span>生年：{chef.born}</span>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {chef.awards.map((award) => (
                  <span key={award} className="text-xs bg-white/10 text-white/70 px-3 py-1">
                    {award}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Bio */}
        <section className="bg-white border border-warm-border p-8 sm:p-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-6 bg-accent" />
            <h2 className="font-serif text-2xl font-bold">プロフィール</h2>
          </div>
          <p className="text-sm sm:text-base leading-loose text-gray-700">{chef.bio}</p>
        </section>

        {/* Philosophy */}
        <section className="bg-primary text-white p-8 sm:p-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-6 bg-accent" />
            <h2 className="font-serif text-2xl font-bold">料理哲学</h2>
          </div>
          <p className="text-white/70 text-sm sm:text-base leading-loose">{chef.philosophy}</p>
        </section>

        {/* Recipes */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-6 bg-accent" />
            <h2 className="font-serif text-2xl font-bold">掲載レシピ</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {recipes.map((recipe) => (
              <Link
                key={recipe.slug}
                href={`/recipes/${recipe.slug}`}
                className="group bg-white border border-warm-border hover:border-primary transition-colors overflow-hidden"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-white text-xs tracking-widest uppercase px-2 py-1">
                      {recipe.difficultyLabel}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-xs tracking-widest uppercase text-accent">{recipe.cuisine}</span>
                  <h3 className="font-serif text-lg font-bold mt-1 leading-snug group-hover:text-accent transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{recipe.originalTitle}</p>
                  <p className="text-sm text-gray-600 leading-relaxed mt-3 line-clamp-2">
                    {recipe.description}
                  </p>
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-warm-border text-xs text-gray-400">
                    <span>準備 {recipe.prepTime}分</span>
                    {recipe.cookTime > 0 && <span>調理 {recipe.cookTime >= 60 ? `${Math.floor(recipe.cookTime / 60)}時間${recipe.cookTime % 60 > 0 ? recipe.cookTime % 60 + '分' : ''}` : recipe.cookTime + '分'}</span>}
                    <span>{recipe.servings}人前</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
