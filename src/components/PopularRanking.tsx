'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface RankItem {
  slug: string;
  title: string;
  image: string;
  cuisine: string;
  difficultyLabel: string;
  prepTime: number;
  cookTime: number;
}

export default function PopularRanking({ limit = 6 }: { limit?: number }) {
  const [items, setItems] = useState<RankItem[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/views/ranking?limit=${limit}`)
      .then((res) => (res.ok ? res.json() : { items: [] }))
      .then((data) => {
        if (!cancelled) setItems(data.items ?? []);
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, [limit]);

  // 集計データが無い(まだ導入直後 等)場合はセクションごと表示しない
  if (!items || items.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1 h-6 bg-accent" />
        <h2 className="font-serif text-xl font-bold tracking-tight">アクセスランキング</h2>
      </div>
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <li key={item.slug}>
            <Link href={`/recipes/${item.slug}`} className="group flex gap-4 items-start">
              <span className="font-serif text-3xl font-bold text-accent/30 group-hover:text-accent transition-colors w-10 flex-shrink-0 text-center tabular-nums">
                {i + 1}
              </span>
              <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="80px"
                />
              </div>
              <div className="flex-1 min-w-0 py-1">
                <span className="text-xs tracking-widest uppercase text-accent">{item.cuisine}</span>
                <h3 className="font-serif text-sm font-semibold leading-snug mt-1 group-hover:text-accent transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <div className="text-xs text-muted mt-2">
                  {item.prepTime + item.cookTime}分 · {item.difficultyLabel}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
