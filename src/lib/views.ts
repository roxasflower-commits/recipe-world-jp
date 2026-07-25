import { redis, redisConfigured } from './redis';

const RANKING_KEY = 'views:ranking';

export async function recordView(slug: string): Promise<void> {
  if (!redisConfigured || !redis) return;
  try {
    await redis.zincrby(RANKING_KEY, 1, slug);
  } catch (err) {
    console.error('recordView failed', err);
  }
}

export interface ViewRankEntry {
  slug: string;
  views: number;
}

export async function getTopViewedSlugs(limit: number): Promise<ViewRankEntry[]> {
  if (!redisConfigured || !redis) return [];
  try {
    const result = await redis.zrange<(string | number)[]>(RANKING_KEY, 0, limit - 1, {
      rev: true,
      withScores: true,
    });
    const entries: ViewRankEntry[] = [];
    for (let i = 0; i < result.length; i += 2) {
      entries.push({ slug: String(result[i]), views: Number(result[i + 1]) });
    }
    return entries;
  } catch (err) {
    console.error('getTopViewedSlugs failed', err);
    return [];
  }
}
