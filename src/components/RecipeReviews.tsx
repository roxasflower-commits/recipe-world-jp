'use client';

import { useEffect, useState } from 'react';

interface Review {
  id: number;
  rating: number;
  authorName: string | null;
  comment: string | null;
  createdAt: string;
}

interface Aggregate {
  average: number;
  count: number;
}

interface Props {
  recipeSlug: string;
  initialReviews: Review[];
  initialAggregate: Aggregate | null;
}

export function Stars({ value, size = 'md' }: { value: number; size?: 'sm' | 'md' | 'lg' }) {
  const dims = size === 'lg' ? 'w-6 h-6' : size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  return (
    <div className="flex items-center gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`${dims} ${i <= Math.round(value) ? 'text-gold fill-gold' : 'text-warm-border fill-warm-border'}`}
        >
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.9l-5.21 2.74 1-5.8-4.21-4.1 5.82-.85L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          aria-label={`${i}つ星`}
          className="p-0.5"
        >
          <svg
            viewBox="0 0 20 20"
            className={`w-7 h-7 transition-colors ${
              i <= (hover || value) ? 'text-gold fill-gold' : 'text-warm-border fill-warm-border'
            }`}
          >
            <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.9l-5.21 2.74 1-5.8-4.21-4.1 5.82-.85L10 1.5z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

export default function RecipeReviews({ recipeSlug, initialReviews, initialAggregate }: Props) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [aggregate, setAggregate] = useState<Aggregate | null>(initialAggregate);
  const [rating, setRating] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [comment, setComment] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/reviews?slug=${encodeURIComponent(recipeSlug)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        const fetched: Review[] = data.reviews ?? [];
        setReviews(fetched);
        if (fetched.length > 0) {
          const avg = fetched.reduce((sum, r) => sum + r.rating, 0) / fetched.length;
          setAggregate({ average: Math.round(avg * 10) / 10, count: fetched.length });
        } else {
          setAggregate(null);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [recipeSlug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating < 1) {
      setStatus('error');
      setErrorMessage('評価（星）を選択してください。');
      return;
    }
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeSlug, rating, authorName, comment, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('error');
        setErrorMessage(data.error ?? '投稿に失敗しました。');
        return;
      }
      const newReview: Review = {
        id: Date.now(),
        rating,
        authorName: authorName.trim() || null,
        comment: comment.trim() || null,
        createdAt: new Date().toISOString(),
      };
      const nextReviews = [newReview, ...reviews];
      setReviews(nextReviews);
      const avg = nextReviews.reduce((sum, r) => sum + r.rating, 0) / nextReviews.length;
      setAggregate({ average: Math.round(avg * 10) / 10, count: nextReviews.length });
      setRating(0);
      setAuthorName('');
      setComment('');
      setStatus('idle');
      setSubmitted(true);
    } catch {
      setStatus('error');
      setErrorMessage('投稿に失敗しました。通信環境をご確認のうえ再度お試しください。');
    }
  }

  return (
    <section id="reviews" className="mb-8 no-print scroll-mt-20">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-6 bg-accent flex-shrink-0" />
        <h2 className="font-serif text-2xl font-bold">レビュー・評価</h2>
      </div>

      {aggregate ? (
        <div className="flex items-center gap-4 mb-6 p-5 bg-white border border-warm-border">
          <div className="font-serif text-4xl font-bold text-accent">{aggregate.average.toFixed(1)}</div>
          <div>
            <Stars value={aggregate.average} size="lg" />
            <p className="text-xs text-muted mt-1">{aggregate.count}件のレビュー</p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted mb-6">まだレビューがありません。最初のレビューを投稿してみませんか？</p>
      )}

      {reviews.length > 0 && (
        <ul className="space-y-4 mb-8">
          {reviews.map((r) => (
            <li key={r.id} className="p-4 bg-white border border-warm-border">
              <div className="flex items-center justify-between gap-3 mb-1">
                <Stars value={r.rating} size="sm" />
                <span className="text-[11px] text-muted">{formatDate(r.createdAt)}</span>
              </div>
              <p className="text-xs font-semibold text-primary mb-1">{r.authorName || '匿名'}</p>
              {r.comment && <p className="text-sm leading-relaxed">{r.comment}</p>}
            </li>
          ))}
        </ul>
      )}

      <div className="p-5 bg-warm-bg border border-warm-border">
        <h3 className="font-serif text-base font-bold mb-4">レビューを投稿する</h3>
        {submitted && status === 'idle' ? (
          <p className="text-sm text-emerald-700">レビューを投稿しました。ありがとうございます！</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-muted mb-2">評価</label>
              <StarPicker value={rating} onChange={setRating} />
            </div>
            <div>
              <label htmlFor="review-name" className="block text-xs text-muted mb-1">
                お名前（任意）
              </label>
              <input
                id="review-name"
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                maxLength={50}
                className="w-full px-3 py-2 text-sm border border-warm-border bg-white focus:outline-none focus:border-accent"
                placeholder="匿名"
              />
            </div>
            <div>
              <label htmlFor="review-comment" className="block text-xs text-muted mb-1">
                コメント（任意）
              </label>
              <textarea
                id="review-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={1000}
                rows={3}
                className="w-full px-3 py-2 text-sm border border-warm-border bg-white focus:outline-none focus:border-accent resize-none"
                placeholder="作ってみた感想を教えてください"
              />
            </div>
            {/* honeypot field, hidden from real users */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="review-website">Website</label>
              <input
                id="review-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            {status === 'error' && <p className="text-xs text-red-600">{errorMessage}</p>}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="text-xs tracking-widest uppercase text-white bg-accent px-5 py-2.5 hover:bg-primary transition-colors disabled:opacity-50"
            >
              {status === 'submitting' ? '送信中…' : 'レビューを投稿'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
