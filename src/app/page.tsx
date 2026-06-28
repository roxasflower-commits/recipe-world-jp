import Image from 'next/image';
import Link from 'next/link';
import { recipes, getFeaturedRecipes, getRecipeBySlug, cuisines, getRecipesByChef } from '@/data/recipes';

const BASE_URL = 'https://recipe-world-jp.vercel.app';

function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MONDE RECIPE',
    url: BASE_URL,
    description: '世界の本格レシピを日本語で。フランス・イタリア・スペイン・韓国など170品以上のレシピを掲載。',
    inLanguage: 'ja',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/recipes?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
import RecipeCard from '@/components/RecipeCard';
import AdBanner from '@/components/AdBanner';
import { chefs } from '@/data/chefs';
import { CardStack } from '@/components/ui/card-stack';
import CuisineSelector from '@/components/ui/cuisine-selector';

const cuisineDetails: Record<string, { emoji: string; description: string }> = {
  french:   { emoji: '🇫🇷', description: 'ブフブルギニョン、ブイヤベース' },
  italian:  { emoji: '🇮🇹', description: 'カルボナーラ、リゾット' },
  american: { emoji: '🇺🇸', description: 'スマッシュバーガー、ガンボ' },
  thai:     { emoji: '🇹🇭', description: 'パッタイ、グリーンカレー' },
  british:  { emoji: '🇬🇧', description: 'ビーフウェリントン、スコーン' },
  spanish:  { emoji: '🇪🇸', description: 'パエリア、ガスパチョ' },
  nordic:   { emoji: '🇸🇪', description: 'スモーブロー、グラブラックス' },
  turkish:  { emoji: '🇹🇷', description: 'シシケバブ、ドルマ' },
  indian:   { emoji: '🇮🇳', description: 'バターチキン、ビリヤニ' },
  peruvian: { emoji: '🇵🇪', description: 'セビーチェ、ロモサルタード' },
  mexican:      { emoji: '🇲🇽', description: 'タコス、モレ、グアカモーレ' },
  korean:       { emoji: '🇰🇷', description: 'ビビンバ、サムギョプサル' },
  vietnamese:   { emoji: '🇻🇳', description: 'フォー、バインミー' },
  moroccan:     { emoji: '🇲🇦', description: 'タジン、クスクス' },
  taiwanese:    { emoji: '🇹🇼', description: '台湾カステラ、ルーロー飯' },
  'middle-eastern': { emoji: '🫙', description: 'シュクシュカ、フムス' },
  chinese:    { emoji: '🇨🇳', description: '小籠包、麻婆豆腐' },
  greek:      { emoji: '🇬🇷', description: 'ムサカ、スパナコピタ' },
  georgian:   { emoji: '🇬🇪', description: 'ハチャプリ、ヒンカリ' },
  portuguese: { emoji: '🇵🇹', description: 'パステル・デ・ナタ、バカリャウ' },
  hawaiian:   { emoji: '🌺', description: 'ポケボウル、ハウピア' },
};

export default function HomePage() {
  // ヒーロー枠：アクセス数をもとに手動で更新
  const heroSlugs = ['risotto-al-radicchio', 'roman-carbonara', 'beef-wellington'];
  const featured = heroSlugs.map((slug) => getRecipeBySlug(slug)!);
  const hero = featured[0];
  const subFeatured = featured.slice(1, 3);
  const latest = [...recipes].reverse().slice(0, 6);
  const rene = chefs.find((c) => c.slug === 'rene-redzepi')!;
  const reneRecipes = getRecipesByChef('rene-redzepi');
  const cuisineHeroSlug: Record<string, string> = {
    french:   'bouillabaisse',
    italian:  'tagliatelle-ragu-bolognese',
    american: 'braised-beef-short-ribs',
    thai:     'tom-yum-goong',
    british:  'beef-wellington',
    spanish:  'paella-valenciana',
    nordic:   'smorrebrod',
    turkish:  'sis-kebabi',
    indian:   'butter-chicken',
    peruvian: 'nikkei-tuna-tartare',
    mexican:        'tacos-al-pastor',
    vietnamese:     'pho-bo',
    moroccan:       'moroccan-chicken-tagine',
    taiwanese:      'taiwanese-castella-cake',
    'middle-eastern': 'shakshuka',
    chinese:    'xiaolongbao',
    greek:      'moussaka',
    georgian:   'khachapuri',
    portuguese: 'pastel-de-nata',
    hawaiian:   'poke-bowl',
  };
  const cuisineImages = Object.fromEntries(
    cuisines.map((c) => {
      const heroSlug = cuisineHeroSlug[c.slug];
      const rep = heroSlug
        ? recipes.find((r) => r.slug === heroSlug)
        : recipes.find((r) => r.cuisineSlug === c.slug);
      return [c.slug, rep?.image ?? ''];
    })
  );

  const selectorItems = cuisines.map((c) => ({
    slug: c.slug,
    label: c.label,
    labelEn: c.labelEn,
    description: cuisineDetails[c.slug]?.description ?? '',
    emoji: cuisineDetails[c.slug]?.emoji ?? '',
    image: cuisineImages[c.slug],
  }));

  return (
    <div className="min-h-screen">
      <WebSiteSchema />
      {/* Editorial homepage hero — full viewport with site name overlay */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <Image
          src={hero.image}
          alt={hero.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/75" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16 sm:pb-24">
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-3">
            海外名料理 日本語レシピ集
          </p>
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-none">
            MONDE<br />RECIPE
          </h1>
          <p className="text-white/50 text-sm leading-relaxed mt-5 max-w-xs">
            世界中の本格レシピを、家庭の台所へ。
          </p>
          <Link
            href="/recipes"
            className="inline-flex items-center gap-3 mt-8 text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors group"
          >
            <span className="w-8 h-px bg-white/30 group-hover:w-12 group-hover:bg-white/60 transition-all duration-300" />
            レシピをすべて見る
          </Link>
        </div>
      </section>

      {/* Ad banner */}
      <div className="bg-white border-b border-warm-border py-3">
        <AdBanner format="horizontal" />
      </div>

      {/* Card Stack — Pick Up */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-1 h-6 bg-gold" />
          <h2 className="font-serif text-xl font-bold tracking-tight">今週のピックアップ</h2>
        </div>
        <p className="text-xs text-muted tracking-wide mb-8 ml-5">スワイプまたはクリックで切り替え</p>
        <CardStack
          items={[...recipes].reverse().slice(0, 6).map((r) => ({
            id: r.id,
            title: r.title,
            description: r.description,
            imageSrc: r.image,
            href: `/recipes/${r.slug}`,
            tag: r.cuisine,
          }))}
          cardWidth={440}
          cardHeight={300}
          autoAdvance
          intervalMs={3200}
          pauseOnHover
          showDots
          overlap={0.52}
          spreadDeg={44}
        />
      </section>

      {/* Featured recipes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1 h-6 bg-accent" />
          <h2 className="font-serif text-xl font-bold tracking-tight">注目レシピ</h2>
        </div>
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
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl text-white leading-tight max-w-xl group-hover:text-white/90 transition-colors">
                    {hero.title}
                  </h2>
                  <p className="text-white/70 mt-3 max-w-lg text-sm leading-relaxed line-clamp-2">
                    {hero.description}
                  </p>
                  <div className="flex items-center gap-6 mt-4 text-white/60 text-xs">
                    <span>{hero.prepTime + hero.cookTime}分</span>
                    <span>{hero.servings}人前</span>
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
                      {recipe.prepTime + recipe.cookTime}分 · {recipe.difficultyLabel}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category quick links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1 h-6 bg-accent" />
          <h2 className="font-serif text-xl font-bold tracking-tight">料理のジャンルで探す</h2>
        </div>
        <CuisineSelector items={selectorItems} />
      </section>

      {/* Ad banner */}
      <div className="mt-12 py-4 border-y border-warm-border bg-white">
        <AdBanner format="horizontal" />
      </div>

      {/* Latest recipes grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
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
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1 h-6 bg-accent" />
          <h2 className="font-serif text-xl font-bold tracking-tight">難易度から選ぶ</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              level: 'home',
              num: '01',
              label: '家庭料理',
              labelEn: 'Home Cooking',
              desc: '基本の食材で本場の味。週末のランチやディナーに。',
              href: '/recipes?level=home',
            },
            {
              level: 'intermediate',
              num: '02',
              label: '中級レシピ',
              labelEn: 'Intermediate',
              desc: '少し手間をかけて、料理の腕をワンランク上げる。',
              href: '/recipes?level=intermediate',
            },
            {
              level: 'professional',
              num: '03',
              label: 'プロ仕様',
              labelEn: 'Professional',
              desc: 'レストランの技法を家庭で再現する挑戦的なレシピ。',
              href: '/recipes?level=professional',
            },
          ].map((item) => (
            <Link
              key={item.level}
              href={item.href}
              className="group relative bg-white border border-warm-border hover:border-accent transition-colors duration-300 p-8 flex flex-col justify-between min-h-[200px] overflow-hidden"
            >
              <span className="absolute top-4 right-5 font-serif text-8xl font-bold leading-none select-none text-primary opacity-[0.05] group-hover:opacity-[0.09] transition-opacity duration-300">
                {item.num}
              </span>
              <div>
                <span className="text-[10px] tracking-widest uppercase text-muted">
                  {item.labelEn}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-primary mt-2 leading-tight">
                  {item.label}
                </h3>
                <p className="text-sm text-muted mt-3 leading-relaxed">{item.desc}</p>
              </div>
              <div className="flex items-center gap-2 mt-6 text-xs tracking-widest uppercase text-accent group-hover:gap-3 transition-all duration-200">
                レシピを見る
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
