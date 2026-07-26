import { Metadata } from 'next';
import { recipes, cuisines } from '@/data/recipes';
import { Recipe } from '@/types/recipe';
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

const timeLabels: Record<string, string> = {
  '30': '30分以内',
  '60': '60分以内',
  over60: 'じっくり60分〜',
};

interface SceneDef {
  key: string;
  label: string;
  match: (r: Recipe) => boolean;
}

// 既存タグ・調理時間から実データに基づいて判定する「目的・シーン」区分。
// 手作業でのタグ付けを増やさず、今ある recipes.ts のデータだけで成立させている。
const sceneDefs: SceneDef[] = [
  {
    key: 'quick',
    label: '時短・簡単',
    match: (r) => r.tags.includes('簡単') || r.prepTime + r.cookTime <= 30,
  },
  {
    key: 'entertaining',
    label: 'おもてなし',
    match: (r) => r.tags.includes('おもてなし') || r.tags.includes('パーティー料理'),
  },
  {
    key: 'homestyle',
    label: '家庭料理',
    match: (r) => r.tags.includes('家庭料理'),
  },
  {
    key: 'healthy',
    label: 'ヘルシー',
    match: (r) => r.tags.includes('ヘルシー'),
  },
  {
    key: 'vegetarian',
    label: 'ベジタリアン・ヴィーガン',
    match: (r) => r.tags.includes('ベジタリアン') || r.tags.includes('ヴィーガン'),
  },
  {
    key: 'breakfast',
    label: '朝食',
    match: (r) => r.tags.includes('朝食'),
  },
  {
    key: 'appetizer',
    label: '前菜・おつまみ',
    match: (r) => r.tags.includes('前菜'),
  },
  {
    key: 'dessert',
    label: 'デザート・スイーツ',
    match: (r) => r.tags.includes('デザート') || r.tags.includes('スイーツ') || r.tags.includes('焼き菓子'),
  },
];

function matchesTime(r: Recipe, time?: string): boolean {
  if (!time) return true;
  const t = r.prepTime + r.cookTime;
  if (time === '30') return t <= 30;
  if (time === '60') return t <= 60;
  if (time === 'over60') return t > 60;
  return true;
}

export default function RecipesPage({
  searchParams,
}: {
  searchParams: { level?: string; cuisine?: string; q?: string; scene?: string; time?: string };
}) {
  const levelFilter = searchParams.level;
  const cuisineFilter = searchParams.cuisine;
  const timeFilter = searchParams.time;
  const query = searchParams.q?.trim() ?? '';
  const sceneFilter = (searchParams.scene?.split(',').filter(Boolean) ?? []);
  const activeScenes = sceneDefs.filter((s) => sceneFilter.includes(s.key));

  // 現在のクエリパラメータを引き継ぎつつ一部だけ上書き/削除したURLを組み立てる
  function hrefFor(overrides: Record<string, string | undefined>): string {
    const params = new URLSearchParams();
    const merged = {
      level: levelFilter,
      cuisine: cuisineFilter,
      q: query || undefined,
      scene: sceneFilter.length ? sceneFilter.join(',') : undefined,
      time: timeFilter,
      ...overrides,
    };
    Object.entries(merged).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    const qs = params.toString();
    return qs ? `/recipes?${qs}` : '/recipes';
  }

  function toggleSceneHref(key: string): string {
    const next = sceneFilter.includes(key)
      ? sceneFilter.filter((k) => k !== key)
      : [...sceneFilter, key];
    return hrefFor({ scene: next.length ? next.join(',') : undefined });
  }

  const filtered = recipes.filter((r) => {
    if (levelFilter && r.category !== levelFilter) return false;
    if (cuisineFilter && r.cuisineSlug !== cuisineFilter) return false;
    if (!matchesTime(r, timeFilter)) return false;
    if (activeScenes.length > 0 && !activeScenes.some((s) => s.match(r))) return false;
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
          {timeFilter && ` · ${timeLabels[timeFilter] ?? timeFilter}`}
          {activeScenes.length > 0 && ` · ${activeScenes.map((s) => s.label).join('・')}`}
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
      <div className="flex flex-col gap-4 mb-10">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs tracking-widest uppercase text-muted">難易度:</span>
          <Link
            href={hrefFor({ level: undefined })}
            className={`text-xs px-3 py-1.5 border transition-colors ${!levelFilter ? 'bg-primary text-white border-primary' : 'border-warm-border text-muted hover:border-primary hover:text-primary'}`}
          >
            すべて
          </Link>
          {Object.entries(levelLabels).map(([key, label]) => (
            <Link
              key={key}
              href={hrefFor({ level: key })}
              className={`text-xs px-3 py-1.5 border transition-colors ${levelFilter === key ? 'bg-primary text-white border-primary' : 'border-warm-border text-muted hover:border-primary hover:text-primary'}`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs tracking-widest uppercase text-muted">調理時間:</span>
          <Link
            href={hrefFor({ time: undefined })}
            className={`text-xs px-3 py-1.5 border transition-colors ${!timeFilter ? 'bg-primary text-white border-primary' : 'border-warm-border text-muted hover:border-primary hover:text-primary'}`}
          >
            すべて
          </Link>
          {Object.entries(timeLabels).map(([key, label]) => (
            <Link
              key={key}
              href={hrefFor({ time: timeFilter === key ? undefined : key })}
              className={`text-xs px-3 py-1.5 border transition-colors ${timeFilter === key ? 'bg-primary text-white border-primary' : 'border-warm-border text-muted hover:border-primary hover:text-primary'}`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs tracking-widest uppercase text-muted">シーンで探す:</span>
          {sceneDefs.map((scene) => {
            const active = sceneFilter.includes(scene.key);
            return (
              <Link
                key={scene.key}
                href={toggleSceneHref(scene.key)}
                className={`text-xs px-3 py-1.5 border transition-colors ${active ? 'bg-accent text-white border-accent' : 'border-warm-border text-muted hover:border-accent hover:text-accent'}`}
              >
                {scene.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs tracking-widest uppercase text-muted">ジャンル:</span>
          <Link
            href={hrefFor({ cuisine: undefined })}
            className={`text-xs px-3 py-1.5 border transition-colors ${!cuisineFilter ? 'bg-primary text-white border-primary' : 'border-warm-border text-muted hover:border-primary hover:text-primary'}`}
          >
            すべて
          </Link>
          {cuisines.map((c) => (
            <Link
              key={c.slug}
              href={hrefFor({ cuisine: c.slug })}
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
