'use client';

import { useEffect } from 'react';

const AD_CLIENT = 'ca-pub-7568884988315625';
const AD_SLOT = '1094735608';

interface AdSenseProps {
  className?: string;
}

export default function AdSense({ className = '' }: AdSenseProps) {
  useEffect(() => {
    try {
      ((window as unknown as Record<string, unknown>).adsbygoogle as unknown[] | undefined)?.push?.({});
    } catch {}
  }, []);

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
