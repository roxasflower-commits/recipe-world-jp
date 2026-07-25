import { NextRequest, NextResponse } from 'next/server';
import { getRecipeBySlug } from '@/data/recipes';
import { getRatingAggregate, submitRating } from '@/lib/ratings';

export const dynamic = 'force-dynamic';

export async function GET(_request: NextRequest, { params }: { params: { slug: string } }) {
  const recipe = getRecipeBySlug(params.slug);
  if (!recipe) {
    return NextResponse.json({ error: 'not-found' }, { status: 404 });
  }
  const aggregate = await getRatingAggregate(params.slug);
  return NextResponse.json(aggregate);
}

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
  const recipe = getRecipeBySlug(params.slug);
  if (!recipe) {
    return NextResponse.json({ error: 'not-found' }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid-body' }, { status: 400 });
  }

  const { value, voterId } = (body ?? {}) as { value?: unknown; voterId?: unknown };

  if (typeof value !== 'number' || !Number.isInteger(value) || value < 1 || value > 5) {
    return NextResponse.json({ error: 'invalid-value' }, { status: 400 });
  }
  if (typeof voterId !== 'string' || voterId.length < 8 || voterId.length > 100) {
    return NextResponse.json({ error: 'invalid-voter' }, { status: 400 });
  }

  const result = await submitRating(params.slug, voterId, value);

  if (!result.ok) {
    const status = result.reason === 'already-voted' ? 409 : 503;
    return NextResponse.json({ error: result.reason, aggregate: result.aggregate }, { status });
  }

  return NextResponse.json({ aggregate: result.aggregate });
}
