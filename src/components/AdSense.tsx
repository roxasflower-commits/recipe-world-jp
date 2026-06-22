'use client';

import { useEffect } from 'react';

const AD_CLIENT = 'ca-pub-7568884988315625';

export function MultiplexAd() {
  useEffect(() => {
    try {
      ((window as unknown as Record<string, unknown>).adsbygoogle as unknown[] | undefined)?.push?.({});
    } catch {}
  }, []);

  return (
    <div className="mt-12">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format="autorelaxed"
        data-ad-client={AD_CLIENT}
        data-ad-slot="2201145163"
      />
    </div>
  );
}
