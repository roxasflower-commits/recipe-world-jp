import { NextRequest, NextResponse } from 'next/server';

// /recipes への異常な連打アクセス（ボット・スクレイパー想定）を軽く抑制する。
// 正規の利用（フィルター切り替え等）はこの閾値を超えないため影響しない。
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 30;

const hits = new Map<string, { count: number; windowStart: number }>();

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-real-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  );
}

export function middleware(request: NextRequest) {
  const ip = getClientIp(request);
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(ip, { count: 1, windowStart: now });
    return NextResponse.next();
  }

  entry.count += 1;
  if (entry.count > MAX_REQUESTS_PER_WINDOW) {
    return new NextResponse('Too Many Requests', { status: 429 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/recipes',
};
