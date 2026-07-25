import { NextRequest, NextResponse } from 'next/server';
import { getRecipeBySlug } from '@/data/recipes';
import { getTopViewedSlugs } from '@/lib/views';

export const dynamic = 'force-dynamic';

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 20;

export async function GET(request: NextRequest) {
  const limitParam = Number(request.nextUrl.searchParams.get('limit'));
  const limit = Number.isFinite(limitParam) && limitParam > 0
    ? Math.min(limitParam, MAX_LIMIT)
    : DEFAULT_LIMIT;

  // 削除・スラッグ変更されたレシピが混じっている可能性を考慮し、余分に取得してから実在するものだけ返す
  const raw = await getTopViewedSlugs(limit * 2);

  const items = raw
    .map(({ slug, views }) => {
      const recipe = getRecipeBySlug(slug);
      if (!recipe) return null;
      return {
        slug: recipe.slug,
        title: recipe.title,
        image: recipe.image,
        cuisine: recipe.cuisine,
        cuisineSlug: recipe.cuisineSlug,
        difficultyLabel: recipe.difficultyLabel,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        views,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .slice(0, limit);

  return NextResponse.json({ items });
}
