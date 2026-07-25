import { NextRequest, NextResponse } from 'next/server';
import { getRecipeBySlug } from '@/data/recipes';
import { recordView } from '@/lib/views';

export const dynamic = 'force-dynamic';

export async function POST(_request: NextRequest, { params }: { params: { slug: string } }) {
  const recipe = getRecipeBySlug(params.slug);
  if (!recipe) {
    return NextResponse.json({ error: 'not-found' }, { status: 404 });
  }
  await recordView(params.slug);
  return NextResponse.json({ ok: true });
}
