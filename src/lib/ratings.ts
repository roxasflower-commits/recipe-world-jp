import { redis, redisConfigured } from './redis';

export interface RatingAggregate {
  average: number;
  count: number;
}

const EMPTY: RatingAggregate = { average: 0, count: 0 };

function ratingKey(slug: string): string {
  return `rating:${slug}`;
}

function voteKey(slug: string, voterId: string): string {
  return `rating:voted:${slug}:${voterId}`;
}

export async function getRatingAggregate(slug: string): Promise<RatingAggregate> {
  if (!redisConfigured || !redis) return EMPTY;
  try {
    const data = await redis.hgetall<{ sum: number; count: number }>(ratingKey(slug));
    const sum = Number(data?.sum ?? 0);
    const count = Number(data?.count ?? 0);
    if (count <= 0) return EMPTY;
    return { average: Math.round((sum / count) * 10) / 10, count };
  } catch (err) {
    console.error('getRatingAggregate failed', err);
    return EMPTY;
  }
}

export type SubmitRatingResult =
  | { ok: true; aggregate: RatingAggregate }
  | { ok: false; reason: 'already-voted' | 'unavailable'; aggregate: RatingAggregate };

export async function submitRating(
  slug: string,
  voterId: string,
  value: number
): Promise<SubmitRatingResult> {
  if (!redisConfigured || !redis) {
    return { ok: false, reason: 'unavailable', aggregate: EMPTY };
  }
  try {
    const firstVote = await redis.set(voteKey(slug, voterId), 1, { nx: true });
    if (!firstVote) {
      return { ok: false, reason: 'already-voted', aggregate: await getRatingAggregate(slug) };
    }
    await redis.hincrby(ratingKey(slug), 'sum', value);
    await redis.hincrby(ratingKey(slug), 'count', 1);
    return { ok: true, aggregate: await getRatingAggregate(slug) };
  } catch (err) {
    console.error('submitRating failed', err);
    return { ok: false, reason: 'unavailable', aggregate: EMPTY };
  }
}
