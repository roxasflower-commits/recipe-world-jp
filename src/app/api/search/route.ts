import { NextRequest, NextResponse } from 'next/server';
import { recipes } from '@/data/recipes';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim().toLowerCase() ?? '';

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const results = recipes
    .filter((r) => {
      return (
        r.title.toLowerCase().includes(q) ||
        r.originalTitle?.toLowerCase().includes(q) ||
        r.cuisineSlug?.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q)
      );
    })
    .slice(0, 8)
    .map((r) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      originalTitle: r.originalTitle,
      image: r.image,
    }));

  return NextResponse.json({ results });
}
