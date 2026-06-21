import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cuisines, getRecipesByCuisine } from '@/data/recipes';
import RecipeCard from '@/components/RecipeCard';
import AdBanner from '@/components/AdBanner';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import Link from 'next/link';

interface Props {
  params: { category: string };
}

export async function generateStaticParams() {
  return cuisines.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cuisine = cuisines.find((c) => c.slug === params.category);
  if (!cuisine) return {};

  return {
    title: `${cuisine.label}のレシピ一覧・作り方`,
    description: cuisine.intro
      ? cuisine.intro.slice(0, 140) + '…'
      : `本場の${cuisine.label}レシピを日本語で詳しく解説。家庭料理からプロ仕様まで、${cuisine.label}の作り方・レシピ集。`,
    keywords: [cuisine.label, `${cuisine.label} レシピ`, `${cuisine.label} 作り方`, cuisine.labelEn, '海外料理 レシピ'],
    alternates: {
      canonical: `/category/${cuisine.slug}`,
    },
  };
}

export default function CategoryPage({ params }: Props) {
  const cuisine = cuisines.find((c) => c.slug === params.category);
  if (!cuisine) notFound();

  const categoryRecipes = getRecipesByCuisine(params.category);

  return (
    <>
    <BreadcrumbSchema items={[
      { name: 'レシピ一覧', path: '/recipes' },
      { name: cuisine.label, path: `/category/${cuisine.slug}` },
    ]} />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-muted mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-primary transition-colors">ホーム</Link>
        <span>/</span>
        <Link href="/recipes" className="hover:text-primary transition-colors">レシピ一覧</Link>
        <span>/</span>
        <span className="text-primary">{cuisine.label}</span>
      </nav>

      {/* Page header */}
      <div className="border-b border-warm-border pb-8 mb-8">
        <p className="text-xs tracking-widest uppercase text-accent mb-2">{cuisine.labelEn}</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold">{cuisine.label}</h1>
        <p className="text-muted mt-2">{categoryRecipes.length}件のレシピ</p>
        {cuisine.intro && (
          <p className="text-sm text-gray-600 leading-relaxed mt-5 max-w-3xl">
            {cuisine.intro}
          </p>
        )}
      </div>

      <AdBanner format="horizontal" className="mb-10" />

      {categoryRecipes.length === 0 ? (
        <div className="text-center py-20 text-muted">
          <p className="font-serif text-2xl mb-3">現在レシピを準備中です</p>
          <p className="text-sm mb-6">近日公開予定のレシピをお楽しみに！</p>
          <Link href="/recipes" className="text-accent text-sm underline">
            すべてのレシピを見る
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}

      {/* Other categories */}
      <section className="mt-16 pt-10 border-t border-warm-border">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-1 h-6 bg-accent" />
          <h2 className="font-serif text-xl font-bold">他のジャンルも探す</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {cuisines
            .filter((c) => c.slug !== params.category)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="px-5 py-3 border border-warm-border hover:border-accent hover:text-accent transition-colors text-sm font-sans"
              >
                {c.label}
              </Link>
            ))}
        </div>
      </section>
    </div>
    </>
  );
}
