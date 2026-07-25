import { NextRequest, NextResponse } from 'next/server';
import { recipes } from '@/data/recipes';

export async function GET(req: NextRequest) {
  const idsParam = req.nextUrl.searchParams.get('ids') ?? '';
  const ids = idsParam.split(',').filter(Boolean);

  if (ids.length === 0) {
    return NextResponse.json({ results: [] });
  }

  const idSet = new Set(ids);
  const results = recipes
    .filter((r) => idSet.has(r.id))
    .map((r) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      image: r.image,
      cuisine: r.cuisine,
      categoryLabel: r.categoryLabel,
      difficultyLabel: r.difficultyLabel,
      prepTime: r.prepTime,
      cookTime: r.cookTime,
      description: r.description,
    }));

  return NextResponse.json({ results });
}
