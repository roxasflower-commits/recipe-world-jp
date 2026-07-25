import { Redis } from '@upstash/redis';

// Vercel の「Vercel KV」は廃止され、現在は Marketplace 経由の Upstash Redis 連携に一本化されている。
// 連携時に注入される環境変数の名前は KV_REST_API_URL/TOKEN のことも UPSTASH_REDIS_REST_URL/TOKEN の
// こともあるため両方を受け付ける。どちらも無ければ未設定として扱い、呼び出し側は安全にフォールバックする。
const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

export const redisConfigured = Boolean(url && token);

export const redis = redisConfigured ? new Redis({ url: url!, token: token! }) : null;
