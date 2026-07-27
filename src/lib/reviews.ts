import { getSupabaseAdmin } from './supabase';

export interface Review {
  id: number;
  recipeSlug: string;
  rating: number;
  authorName: string | null;
  comment: string | null;
  createdAt: string;
}

export interface ReviewAggregate {
  average: number;
  count: number;
}

export async function getReviewsForRecipe(slug: string): Promise<Review[]> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('reviews')
      .select('id, recipe_slug, rating, author_name, comment, created_at')
      .eq('recipe_slug', slug)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Failed to fetch reviews', error);
      return [];
    }

    return (data ?? []).map((r) => ({
      id: r.id,
      recipeSlug: r.recipe_slug,
      rating: r.rating,
      authorName: r.author_name,
      comment: r.comment,
      createdAt: r.created_at,
    }));
  } catch (err) {
    console.error('Supabase not configured', err);
    return [];
  }
}

export function computeAggregate(reviews: Review[]): ReviewAggregate | null {
  if (reviews.length === 0) return null;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return {
    average: Math.round((sum / reviews.length) * 10) / 10,
    count: reviews.length,
  };
}
