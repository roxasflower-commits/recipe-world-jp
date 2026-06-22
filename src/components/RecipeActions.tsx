'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'monde-favorites';

function getFavorites(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

interface Props {
  slug: string;
  title: string;
  ogpImageUrl: string;
}

export default function RecipeActions({ slug, title, ogpImageUrl }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsFavorite(getFavorites().includes(slug));
  }, [slug]);

  function toggleFavorite() {
    const favs = getFavorites();
    const next = favs.includes(slug)
      ? favs.filter((s) => s !== slug)
      : [...favs, slug];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setIsFavorite(next.includes(slug));
  }

  function handlePrint() {
    window.print();
  }

  function handleCard() {
    window.open(ogpImageUrl, '_blank');
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* お気に入り */}
      <button
        onClick={toggleFavorite}
        aria-label={isFavorite ? 'お気に入りから削除' : 'お気に入りに追加'}
        className={`flex items-center gap-1.5 text-xs px-3 py-2 border transition-colors ${
          isFavorite
            ? 'border-red-300 bg-red-50 text-red-600'
            : 'border-warm-border bg-white text-muted hover:border-red-300 hover:text-red-500'
        }`}
      >
        <svg className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
        {isFavorite ? '保存済み' : 'お気に入り'}
      </button>

      {/* 印刷 */}
      <button
        onClick={handlePrint}
        className="flex items-center gap-1.5 text-xs px-3 py-2 border border-warm-border bg-white text-muted hover:border-primary hover:text-primary transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
        </svg>
        印刷
      </button>

      {/* レシピカード */}
      <button
        onClick={handleCard}
        className="flex items-center gap-1.5 text-xs px-3 py-2 border border-warm-border bg-white text-muted hover:border-primary hover:text-primary transition-colors"
        title={`${title}のレシピカードを開く`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
        シェア用カード
      </button>
    </div>
  );
}
