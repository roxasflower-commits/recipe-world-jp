import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { recipes, getRecipeBySlug } from '@/data/recipes';
import RecipeCard from '@/components/RecipeCard';
import AdBanner from '@/components/AdBanner';
import RecipeSchema from '@/components/RecipeSchema';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import AmazonTools from '@/components/AmazonTools';
import RakutenTools from '@/components/RakutenTools';
import ShareButtons from '@/components/ShareButtons';
import FaqSchema, { buildFaqs } from '@/components/FaqSchema';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';

const BASE_URL = 'https://recipe-world-jp.vercel.app';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const recipe = getRecipeBySlug(params.slug);
  if (!recipe) return {};

  const totalTime = recipe.prepTime + recipe.cookTime;
  const difficultyHook = recipe.difficulty === 'easy' ? '失敗しない' : recipe.difficulty === 'medium' ? 'プロ直伝' : '本格派向け';
  const seoTitle = `${recipe.title}の本格レシピ・作り方｜${recipe.cuisine}`;
  const seoDescription = `${difficultyHook}${recipe.title}の本格レシピ。${recipe.originalTitle}を日本語で丁寧に解説。調理時間${totalTime}分・${recipe.servings}人前・材料${recipe.ingredients.length}品目。コツと手順を写真付きで紹介。`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      recipe.title,
      `${recipe.title} レシピ`,
      `${recipe.title} 作り方`,
      `${recipe.title} 本格`,
      `${recipe.title} 簡単`,
      recipe.originalTitle,
      recipe.cuisine,
      `${recipe.cuisineEn} recipe`,
      '本格レシピ',
      '作り方',
      ...recipe.tags,
    ],
    alternates: {
      canonical: `/recipes/${recipe.slug}`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: 'article',
      publishedTime: recipe.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [recipe.image],
    },
  };
}

const difficultyColor: Record<string, string> = {
  easy: 'bg-emerald-100 text-emerald-800',
  medium: 'bg-amber-100 text-amber-800',
  hard: 'bg-orange-100 text-orange-800',
  professional: 'bg-red-100 text-red-800',
};

export default function RecipePage({ params }: Props) {
  const recipe = getRecipeBySlug(params.slug);
  if (!recipe) notFound();

  const tagSet = new Set(recipe.tags);

  const scored = recipes
    .filter((r) => r.slug !== recipe.slug)
    .map((r) => ({
      recipe: r,
      score:
        r.tags.filter((t) => tagSet.has(t)).length * 3 +
        (r.cuisineSlug === recipe.cuisineSlug ? 2 : 0) +
        (r.difficulty === recipe.difficulty ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score);

  const sameCuisine = scored.filter((s) => s.recipe.cuisineSlug === recipe.cuisineSlug).map((s) => s.recipe);
  const related = scored.slice(0, 3).map((s) => s.recipe);
  const alsoLike = scored.slice(3, 6).map((s) => s.recipe);
  const bottomRelated = scored.slice(0, 6).map((s) => s.recipe);

  const totalTime = recipe.prepTime + recipe.cookTime;
  const pageUrl = `${BASE_URL}/recipes/${recipe.slug}`;
  const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(pageUrl)}&media=${encodeURIComponent(recipe.image)}&description=${encodeURIComponent(recipe.title + ' | MONDE RECIPE')}`;

  const faqs = buildFaqs(recipe);

  return (
    <>
      <RecipeSchema recipe={recipe} />
      <FaqSchema recipe={recipe} />
      <BreadcrumbSchema items={[
        { name: 'レシピ一覧', path: '/recipes' },
        { name: recipe.cuisine, path: `/category/${recipe.cuisineSlug}` },
        { name: recipe.title, path: `/recipes/${recipe.slug}` },
      ]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-muted mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-primary transition-colors">ホーム</Link>
          <span>/</span>
          <Link href="/recipes" className="hover:text-primary transition-colors">レシピ一覧</Link>
          <span>/</span>
          <Link href={`/category/${recipe.cuisineSlug}`} className="hover:text-primary transition-colors">{recipe.cuisine}</Link>
          <span>/</span>
          <span className="text-primary line-clamp-1">{recipe.title}</span>
        </nav>

        {/* Ad banner */}
        <AdBanner format="horizontal" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Hero image */}
            <div className="relative aspect-[16/9] overflow-hidden mb-8 group">
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <a
                href={pinterestUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-[#E60023] text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                aria-label="Pinterestに保存"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
                保存
              </a>
            </div>

            {/* Title and meta */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Link
                  href={`/category/${recipe.cuisineSlug}`}
                  className="text-xs tracking-widest uppercase text-white bg-accent px-3 py-1 hover:bg-primary transition-colors"
                >
                  {recipe.cuisine}
                </Link>
                <span className={`text-xs px-2 py-1 rounded ${difficultyColor[recipe.difficulty]}`}>
                  {recipe.difficultyLabel}
                </span>
                <span className="text-xs text-muted">{recipe.categoryLabel}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                {recipe.title}
              </h1>
              <p className="text-sm text-muted italic mt-1">{recipe.originalTitle}</p>

              <p className="text-base text-muted mt-4 leading-relaxed">{recipe.description}</p>

              {/* Quick stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 p-5 bg-white border border-warm-border">
                {[
                  { label: '準備時間', value: `${recipe.prepTime}分` },
                  { label: '調理時間', value: `${recipe.cookTime}分` },
                  { label: 'トータル', value: `${totalTime}分` },
                  { label: '人数', value: `${recipe.servings}人前` },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-serif text-xl font-bold text-accent">{stat.value}</div>
                    <div className="text-xs text-muted mt-1 tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Share buttons */}
              <div className="mt-5 pt-5 border-t border-warm-border">
                <ShareButtons
                  pageUrl={pageUrl}
                  imageUrl={recipe.image}
                  title={recipe.title}
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {recipe.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/recipes?q=${encodeURIComponent(tag)}`}
                    className="text-xs px-3 py-1 bg-warm-border/50 text-muted border border-warm-border hover:border-accent hover:text-accent transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Ingredients */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-6 bg-accent flex-shrink-0" />
                <h2 className="font-serif text-2xl font-bold">材料</h2>
                <span className="text-sm text-muted">（{recipe.servings}人前）</span>
              </div>
              <div className="bg-white border border-warm-border">
                {recipe.ingredients.map((ing, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 px-5 py-3 border-b border-warm-border last:border-0"
                  >
                    <span className="font-semibold text-sm min-w-[56px] sm:min-w-[80px] text-right text-primary">
                      {ing.amount}
                      {ing.unit}
                    </span>
                    <span className="text-sm flex-1">
                      {ing.name}
                      {ing.note && (
                        <span className="text-muted text-xs ml-2">（{ing.note}）</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Ad between ingredients and instructions */}
            <AdBanner format="horizontal" className="my-8" />

            {/* Instructions */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-6 bg-accent flex-shrink-0" />
                <h2 className="font-serif text-2xl font-bold">作り方</h2>
              </div>
              <div className="space-y-6">
                {recipe.instructions.map((inst) => (
                  <div key={inst.step} className="flex gap-5">
                    <div className="flex-shrink-0 w-8 h-8 bg-accent text-white flex items-center justify-center font-serif font-bold text-sm">
                      {inst.step}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-sm leading-relaxed">{inst.text}</p>
                      {inst.tip && (
                        <div className="mt-3 flex gap-2 p-3 bg-amber-50 border-l-2 border-gold">
                          <span className="text-gold text-sm flex-shrink-0">💡</span>
                          <p className="text-xs text-amber-900 leading-relaxed">{inst.tip}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Tips */}
            {recipe.tips.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-6 bg-gold flex-shrink-0" />
                  <h2 className="font-serif text-2xl font-bold">コツとヒント</h2>
                </div>
                <div className="bg-amber-50 border border-amber-200 p-6">
                  <ul className="space-y-3">
                    {recipe.tips.map((tip, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-amber-900">
                        <span className="text-gold flex-shrink-0">▶</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* FAQ */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-6 bg-accent flex-shrink-0" />
                <h2 className="font-serif text-2xl font-bold">よくある質問</h2>
              </div>
              <Accordion type="single" collapsible className="w-full bg-white border border-warm-border">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="border-b border-warm-border last:border-b-0"
                  >
                    <AccordionTrigger className="px-5 py-4 text-sm font-semibold text-left hover:no-underline hover:text-accent transition-colors [&[data-state=open]]:text-accent">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-5 text-sm text-muted leading-relaxed border-t border-warm-border">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Source */}
            <div className="border-t border-warm-border pt-6 mt-8">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 bg-gold flex-shrink-0" />
                <h3 className="font-serif text-base font-bold">参考・出典</h3>
              </div>
              <p className="text-xs text-muted leading-relaxed mb-3">{recipe.source}</p>
              {recipe.sourceUrl && recipe.sourceSiteName && (
                <a
                  href={recipe.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-warm-border hover:border-accent hover:text-accent transition-colors text-sm group"
                >
                  <span className="text-xs tracking-wide">原文レシピを見る</span>
                  <span className="font-semibold text-xs">— {recipe.sourceSiteName}</span>
                  <svg className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Sidebar ad */}
            <div className="lg:sticky lg:top-4">
              <AdBanner format="rectangle" />
            </div>

            {/* Amazon affiliate tools */}
            <AmazonTools cuisineSlug={recipe.cuisineSlug} />

            {/* Rakuten affiliate tools */}
            <RakutenTools cuisineSlug={recipe.cuisineSlug} />

            {/* Related recipes */}
            {related.length > 0 && (
              <div>
                <h3 className="font-serif text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-accent inline-block" />
                  関連レシピ
                </h3>
                <div className="space-y-5">
                  {related.map((r) => (
                    <RecipeCard key={r.id} recipe={r} variant="horizontal" />
                  ))}
                </div>
              </div>
            )}

            {/* Also like */}
            {alsoLike.length > 0 && (
              <div>
                <h3 className="font-serif text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-gold inline-block" />
                  こちらもおすすめ
                </h3>
                <div className="space-y-5">
                  {alsoLike.map((r) => (
                    <RecipeCard key={r.id} recipe={r} variant="horizontal" />
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Bottom related recipes */}
        <section className="mt-16 pt-10 border-t border-warm-border">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-1 h-6 bg-accent" />
              <h2 className="font-serif text-xl font-bold">あなたにおすすめのレシピ</h2>
            </div>
            <Link
              href={`/category/${recipe.cuisineSlug}`}
              className="text-xs tracking-widest uppercase text-accent hover:text-primary transition-colors flex items-center gap-1"
            >
              一覧を見る
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bottomRelated.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
