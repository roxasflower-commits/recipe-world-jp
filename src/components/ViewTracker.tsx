'use client';

import { useEffect } from 'react';

/** レシピページの実訪問ごとに閲覧数をカウントする。静的生成されたページでもクライアント側の
 * マウント時に発火するため、SSGでもアクセス数ランキングが機能する。 */
export default function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    fetch(`/api/views/${slug}`, { method: 'POST', keepalive: true }).catch(() => {});
  }, [slug]);

  return null;
}
