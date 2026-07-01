import { Metadata } from 'next';
import { recipes, cuisines } from '@/data/recipes';
import RecipeCard from '@/components/RecipeCard';
import AdBanner from '@/components/AdBanner';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'レシピ一覧・世界の料理の作り方',
  description: '世界の名料理レシピを日本語で詳しく解説。フランス料理、イタリア料理、スペイン料理、インド料理など各国の作り方・レシピ集。家庭料理からプロ仕様まで。',
  keywords: ['レシピ一覧', '世界料理', '海外レシピ', '作り方', 'フランス料理 レシピ', 'イタリア料理 レシピ', 'スペイン料理 レシピ', '韓国料理 レシピ', 'タイ料理 レシピ', '北欧料理 レシピ', 'インド料理 レシピ', 'トルコ料理 レシピ', 'メキシコ料理 レシピ', '本格レシピ'],
  alternates: {
    canonical: 'https://monde-recipe.com/recipes',
  },
};

const levelLabels: Record<string, string> = {
  home: '家庭料理',
  intermediate: '中級',
  professional: 'プロ仕様',
};

export default function RecipesPage({
  searchParams,
}: {
  searchParams: { level?: string; cuisine?: string; q?: string };
}) {
  const levelFilter = searchParams.level;
  const cuisineFilter = searchParams.cuisine;
  const query = searchParams.q?.trim() ?? '';

  const filtered = recipes.filter((r) => {
    if (levelFilter && r.category !== levelFilter) return false;
    if (cuisineFilter && r.cuisineSlug !== cuisineFilter) return false;
    if (query) {
      const q = query.toLowerCase();
      const hit =
        r.title.toLowerCase().includes(q) ||
        r.originalTitle.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q));
      if (!hit) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="border-b border-warm-border pb-8 mb-8">
        <p className="text-xs tracking-widest uppercase text-accent mb-2">ALL RECIPES</p>
        <h1 className="font-serif text-4xl font-bold">レシピ一覧</h1>
        <p className="text-muted mt-2">
          {filtered.length}件のレシピ
          {query && ` · 「${query}」の検索結果`}
          {levelFilter && ` · ${levelLabels[levelFilter] ?? levelFilter}`}
          {cuisineFilter && ` · ${cuisines.find((c) => c.slug === cuisineFilter)?.label ?? cuisineFilter}`}
        </p>
      </div>

      {/* Search bar */}
      <form action="/recipes" method="get" className="mb-8">
        <div className="relative max-w-md">
          <Input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="レシピを検索..."
            className="ps-9 pe-4 h-10 text-sm"
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-muted/70">
            <Search size={15} strokeWidth={2} aria-hidden="true" />
          </div>
        </div>
      </form>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-10">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs tracking-widest uppercase text-muted">難易度:</span>
          <Link
            href="/recipes"
            className={`text-xs px-3 py-1.5 border transition-colors ${!levelFilter ? 'bg-primary text-white border-primary' : 'border-warm-border text-muted hover:border-primary hover:text-primary'}`}
          >
            すべて
          </Link>
          {Object.entries(levelLabels).map(([key, label]) => (
            <Link
              key={key}
              href={`/recipes?level=${key}${cuisineFilter ? `&cuisine=${cuisineFilter}` : ''}`}
              className={`text-xs px-3 py-1.5 border transition-colors ${levelFilter === key ? 'bg-primary text-white border-primary' : 'border-warm-border text-muted hover:border-primary hover:text-primary'}`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs tracking-widest uppercase text-muted">ジャンル:</span>
          <Link
            href="/recipes"
            className={`text-xs px-3 py-1.5 border transition-colors ${!cuisineFilter ? 'bg-primary text-white border-primary' : 'border-warm-border text-muted hover:border-primary hover:text-primary'}`}
          >
            すべて
          </Link>
          {cuisines.map((c) => (
            <Link
              key={c.slug}
              href={`/recipes?cuisine=${c.slug}${levelFilter ? `&level=${levelFilter}` : ''}`}
              className={`text-xs px-3 py-1.5 border transition-colors ${cuisineFilter === c.slug ? 'bg-primary text-white border-primary' : 'border-warm-border text-muted hover:border-primary hover:text-primary'}`}
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>

      <AdBanner format="horizontal" className="mb-10" />

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted">
          <p className="font-serif text-2xl mb-3">レシピが見つかりませんでした</p>
          <Link href="/recipes" className="text-accent text-sm underline">
            すべてのレシピを見る
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((recipe, i) => (
            <>
              <RecipeCard key={recipe.id} recipe={recipe} />
              {/* Insert ad after every 6 cards */}
              {(i + 1) % 6 === 0 && i !== filtered.length - 1 && (
                <div key={`ad-${i}`} className="sm:col-span-2 lg:col-span-3">
                  <AdBanner format="horizontal" className="py-4" />
                </div>
              )}
            </>
          ))}
        </div>
      )}
    </div>
  );
}
