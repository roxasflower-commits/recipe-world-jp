import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { recipes, getRecipeBySlug } from '@/data/recipes';
import RecipeCard from '@/components/RecipeCard';
import AdBanner from '@/components/AdBanner';
import RecipeSchema from '@/components/RecipeSchema';
import Link from 'next/link';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const recipe = getRecipeBySlug(params.slug);
  if (!recipe) return {};

  return {
    title: recipe.title,
    description: recipe.description,
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      images: [{ url: recipe.image, width: 1200, height: 630, alt: recipe.title }],
      type: 'article',
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

  const related = recipes
    .filter((r) => r.slug !== recipe.slug && r.cuisineSlug === recipe.cuisineSlug)
    .slice(0, 3);
  const alsoLike = recipes
    .filter((r) => r.slug !== recipe.slug && !related.includes(r))
    .slice(0, 3);

  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <>
      <RecipeSchema recipe={recipe} />

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
            <div className="relative aspect-[16/9] overflow-hidden mb-8">
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>

            {/* Title and meta */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
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
              <div className="grid grid-cols-4 gap-4 mt-6 p-5 bg-white border border-warm-border">
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

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {recipe.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 bg-warm-border/50 text-muted border border-warm-border"
                  >
                    {tag}
                  </span>
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
                    <span className="font-semibold text-sm min-w-[80px] text-right text-primary">
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

            {/* Source */}
            <p className="text-xs text-muted border-t border-warm-border pt-4">
              出典・参考: {recipe.source}
            </p>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Sidebar ad */}
            <div className="sticky top-4">
              <AdBanner format="rectangle" />
            </div>

            {/* Related same cuisine */}
            {related.length > 0 && (
              <div>
                <h3 className="font-serif text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-accent inline-block" />
                  同じジャンルのレシピ
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
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-6 bg-accent" />
            <h2 className="font-serif text-xl font-bold">他のレシピも見る</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.filter((r) => r.slug !== recipe.slug).slice(0, 3).map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
