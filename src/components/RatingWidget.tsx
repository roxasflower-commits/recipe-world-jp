'use client';

import { useCallback, useEffect, useState } from 'react';

interface Aggregate {
  average: number;
  count: number;
}

const VOTER_KEY = 'monde-voter-id';

function getVoterId(): string {
  let id = localStorage.getItem(VOTER_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VOTER_KEY, id);
  }
  return id;
}

function votedKey(slug: string): string {
  return `monde-rated-${slug}`;
}

interface Props {
  slug: string;
  initialAverage: number;
  initialCount: number;
}

export default function RatingWidget({ slug, initialAverage, initialCount }: Props) {
  const [aggregate, setAggregate] = useState<Aggregate>({ average: initialAverage, count: initialCount });
  const [votedValue, setVotedValue] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(votedKey(slug));
    if (saved) setVotedValue(Number(saved));

    fetch(`/api/ratings/${slug}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setAggregate({ average: data.average, count: data.count });
      })
      .catch(() => {});
  }, [slug]);

  const submit = useCallback(
    async (value: number) => {
      if (votedValue !== null || status === 'submitting') return;
      setStatus('submitting');
      try {
        const voterId = getVoterId();
        const res = await fetch(`/api/ratings/${slug}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ value, voterId }),
        });
        const data = await res.json();
        if (res.ok || res.status === 409) {
          if (data.aggregate) setAggregate(data.aggregate);
          setVotedValue(value);
          localStorage.setItem(votedKey(slug), String(value));
          setStatus('idle');
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      }
    },
    [slug, votedValue, status]
  );

  const displayValue = votedValue ?? hover ?? 0;

  return (
    <div className="flex items-center gap-3 flex-wrap no-print">
      <div className="flex items-center gap-0.5" onMouseLeave={() => setHover(null)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            disabled={votedValue !== null || status === 'submitting'}
            onMouseEnter={() => votedValue === null && setHover(n)}
            onFocus={() => votedValue === null && setHover(n)}
            onClick={() => submit(n)}
            aria-label={`${n}つ星で評価する`}
            className="text-xl leading-none disabled:cursor-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent transition-colors"
          >
            <span className={displayValue >= n ? 'text-gold' : 'text-gray-300'}>★</span>
          </button>
        ))}
      </div>
      <span className="text-xs text-muted">
        {aggregate.count > 0
          ? `平均 ${aggregate.average.toFixed(1)}（${aggregate.count}件の評価）`
          : votedValue !== null
            ? 'ご評価ありがとうございます'
            : 'まだ評価がありません。最初の評価をどうぞ'}
      </span>
      {status === 'error' && (
        <span className="text-xs text-red-500">評価を送信できませんでした。時間をおいてお試しください。</span>
      )}
    </div>
  );
}
