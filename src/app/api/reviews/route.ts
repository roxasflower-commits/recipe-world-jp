import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { getReviewsForRecipe } from '@/lib/reviews';
import { recipes } from '@/data/recipes';

export const dynamic = 'force-dynamic';

function hashIp(ip: string): string {
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    hash = (hash << 5) - hash + ip.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(36);
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug');
  if (!slug) {
    return NextResponse.json({ error: 'slug is required' }, { status: 400 });
  }
  const reviews = await getReviewsForRecipe(slug);
  return NextResponse.json({ reviews });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 });
  }

  const { recipeSlug, rating, authorName, comment, website } = body as Record<string, unknown>;

  // Honeypot field: real visitors never fill a hidden input. Pretend success to bots.
  if (typeof website === 'string' && website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (typeof recipeSlug !== 'string' || !recipes.some((r) => r.slug === recipeSlug)) {
    return NextResponse.json({ error: '不正なレシピです。' }, { status: 400 });
  }

  const ratingNum = Number(rating);
  if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    return NextResponse.json({ error: '評価は1〜5の整数で指定してください。' }, { status: 400 });
  }

  const trimmedComment = typeof comment === 'string' ? comment.trim().slice(0, 1000) : null;
  const trimmedName = typeof authorName === 'string' && authorName.trim() ? authorName.trim().slice(0, 50) : null;

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const ipHash = hashIp(ip);

  const supabase = getSupabaseAdmin();

  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const { data: recent, error: recentError } = await supabase
    .from('reviews')
    .select('id')
    .eq('recipe_slug', recipeSlug)
    .eq('ip_hash', ipHash)
    .gte('created_at', tenMinutesAgo)
    .limit(1);

  if (recentError) {
    console.error('Failed to check rate limit', recentError);
  } else if (recent && recent.length > 0) {
    return NextResponse.json(
      { error: '少し時間をおいてから再度お試しください。' },
      { status: 429 }
    );
  }

  const { error } = await supabase.from('reviews').insert({
    recipe_slug: recipeSlug,
    rating: ratingNum,
    author_name: trimmedName,
    comment: trimmedComment,
    ip_hash: ipHash,
  });

  if (error) {
    console.error('Failed to insert review', error);
    return NextResponse.json({ error: '投稿に失敗しました。時間をおいて再度お試しください。' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
