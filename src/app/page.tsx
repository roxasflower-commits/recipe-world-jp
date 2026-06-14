import Image from 'next/image';
import Link from 'next/link';
import { recipes, getFeaturedRecipes, getRecipeBySlug, cuisines, getRecipesByChef } from '@/data/recipes';
import RecipeCard from '@/components/RecipeCard';
import AdBanner from '@/components/AdBanner';
import { chefs } from '@/data/chefs';

export default function HomePage() {
  // ヒーロー枠：アクセス数をもとに手動で更新
  const heroSlugs = ['smorrebrod', 'roman-carbonara', 'beef-wellington'];
  const featured = heroSlugs.map((slug) => getRecipeBySlug(slug)!);
  const hero = featured[0];
  const subFeatured = featured.slice(1, 3);
  const latest = [...recipes].reverse().slice(0, 6);
  const rene = chefs.find((c) => c.slug === 'rene-redzepi')!;
  const reneRecipes = getRecipesByChef('rene-redzepi');

  return (
    <div className="min-h-screen">
      {/* Ad banner below header */}
      <div className="bg-white border-b border-warm-border py-3">
        <AdBanner format="horizontal" />
      </div>

      {/* Hero section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main hero */}
          <div className="lg:col-span-2">
            <Link href={`/recipes/${hero.slug}`} className="group block relative overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={hero.image}
                  alt={hero.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-hero-gradient" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs tracking-widest uppercase text-white bg-accent px-3 py-1">
                      {hero.cuisine}
                    </span>
                    <span className="text-xs tracking-widest uppercase text-white/70">
                      注目レシピ
                    </span>
                  </div>
                  <h1 className="font-serif text-3xl sm:text-4xl text-white leading-tight max-w-xl group-hover:text-white/90 transition-colors">
                    {hero.title}
                  </h1>
                  <p className="text-white/70 mt-3 max-w-lg text-sm leading-relaxed line-clamp-2">
                    {hero.description}
                  </p>
                  <div className="flex items-center gap-6 mt-4 text-white/60 text-xs">
                    <span>⏱ {hero.prepTime + hero.cookTime}分</span>
                    <span>👥 {hero.servings}人前</span>
                    <span>{hero.difficultyLabel}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Sub featured */}
          <div className="flex flex-col gap-4">
            {subFeatured.map((recipe) => (
              <Link key={recipe.id} href={`/recipes/${recipe.slug}`} className="group block relative overflow-hidden flex-1">
                <div className="relative aspect-[16/9] lg:aspect-auto lg:h-full overflow-hidden min-h-[180px]">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-hero-gradient" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-xs tracking-widest uppercase text-white bg-accent px-2 py-0.5">
                      {recipe.cuisine}
                    </span>
                    <h2 className="font-serif text-lg text-white leading-tight mt-2 group-hover:text-white/90 transition-colors line-clamp-2">
                      {recipe.title}
                    </h2>
                    <div className="text-white/60 text-xs mt-2">
                      ⏱ {recipe.prepTime + recipe.cookTime}分 · {recipe.difficultyLabel}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category quick links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-1 h-6 bg-accent" />
          <h2 className="font-serif text-xl font-bold tracking-tight">料理のジャンルで探す</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {cuisines.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="group flex flex-col items-center justify-center py-5 px-3 bg-white border border-warm-border hover:border-accent hover:bg-accent hover:text-white transition-all"
            >
              <span className="text-xs tracking-widest uppercase text-muted group-hover:text-white/70 transition-colors">
                {c.labelEn}
              </span>
              <span className="font-serif text-base font-semibold mt-1 group-hover:text-white transition-colors">
                {c.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Ad banner */}
      <div className="mt-12 py-4 border-y border-warm-border bg-white">
        <AdBanner format="horizontal" />
      </div>

      {/* Latest recipes grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-1 h-6 bg-accent" />
            <h2 className="font-serif text-xl font-bold tracking-tight">新着レシピ</h2>
          </div>
          <Link
            href="/recipes"
            className="text-xs tracking-widest uppercase text-accent hover:text-primary transition-colors flex items-center gap-1"
          >
            すべて見る
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latest.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* Top Chef section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-1 h-6 bg-accent" />
            <h2 className="font-serif text-xl font-bold tracking-tight">トップシェフ</h2>
          </div>
          <Link
            href="/chefs"
            className="text-xs tracking-widest uppercase text-accent hover:text-primary transition-colors flex items-center gap-1"
          >
            すべて見る
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <Link
          href={`/chefs/${rene.slug}`}
          className="group block bg-white border border-warm-border hover:border-primary transition-colors overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row">
            <div className="relative sm:w-72 h-52 sm:h-auto flex-shrink-0 overflow-hidden">
              <Image
                src={rene.image}
                alt={rene.nameJa}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 288px"
              />
              <div className="absolute inset-0 bg-primary/20" />
              <div className="absolute bottom-3 left-3 flex gap-1">
                {Array.from({ length: rene.michelinStars }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
            </div>
            <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
              <div>
                <span className="text-xs tracking-widest uppercase text-accent">{rene.nationality}</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1 group-hover:text-accent transition-colors">
                  {rene.nameJa}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {rene.name} — {rene.restaurant}、{rene.location}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mt-4 line-clamp-3">
                  {rene.bio}
                </p>
              </div>
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-warm-border">
                <span className="text-xs text-gray-400">掲載レシピ {reneRecipes.length}品</span>
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
      </section>

      {/* Level CTA section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              level: 'home',
              label: '家庭料理',
              desc: '週末のランチやディナーに。基本の食材で本場の味。',
              href: '/recipes?level=home',
              color: 'from-emerald-900 to-emerald-700',
            },
            {
              level: 'intermediate',
              label: '中級レシピ',
              desc: '少し手間をかけて、料理の腕をワンランク上げる。',
              href: '/recipes?level=intermediate',
              color: 'from-amber-900 to-amber-700',
            },
            {
              level: 'professional',
              label: 'プロ仕様',
              desc: 'レストランの技法を家庭で再現する挑戦的なレシピ。',
              href: '/recipes?level=professional',
              color: 'from-primary to-gray-700',
            },
          ].map((item) => (
            <Link
              key={item.level}
              href={item.href}
              className={`group relative overflow-hidden bg-gradient-to-br ${item.color} p-8 flex flex-col justify-between min-h-[180px]`}
            >
              <div>
                <span className="text-xs tracking-widest uppercase text-white/50">
                  LEVEL
                </span>
                <h3 className="font-serif text-2xl text-white font-bold mt-1">{item.label}</h3>
                <p className="text-white/60 text-sm mt-2 leading-relaxed">{item.desc}</p>
              </div>
              <div className="text-white/50 text-xs tracking-widest uppercase mt-4 flex items-center gap-2 group-hover:text-white transition-colors">
                レシピを見る
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom ad */}
      <div className="mt-16 py-4 border-y border-warm-border bg-white">
        <AdBanner format="horizontal" />
      </div>
    </div>
  );
}
