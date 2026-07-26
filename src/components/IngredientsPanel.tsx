'use client';

import { useState } from 'react';
import { Ingredient } from '@/types/recipe';
import { scaleAmount } from '@/lib/scaleIngredient';

const MIN_SERVINGS = 1;
const MAX_SERVINGS = 20;

interface Props {
  ingredients: Ingredient[];
  baseServings: number;
}

export default function IngredientsPanel({ ingredients, baseServings }: Props) {
  const [servings, setServings] = useState(baseServings);
  const ratio = servings / baseServings;

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-accent flex-shrink-0" />
          <h2 className="font-serif text-2xl font-bold">材料</h2>
          <span className="text-sm text-muted">（{servings}人前）</span>
        </div>

        <div className="flex items-center gap-3 no-print">
          <div className="flex items-center border border-warm-border">
            <button
              type="button"
              onClick={() => setServings((s) => Math.max(MIN_SERVINGS, s - 1))}
              disabled={servings <= MIN_SERVINGS}
              aria-label="人数を減らす"
              className="w-8 h-8 flex items-center justify-center text-muted hover:text-accent disabled:opacity-30 disabled:hover:text-muted transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              −
            </button>
            <span className="w-16 text-center text-sm font-semibold tabular-nums select-none">
              {servings}人前
            </span>
            <button
              type="button"
              onClick={() => setServings((s) => Math.min(MAX_SERVINGS, s + 1))}
              disabled={servings >= MAX_SERVINGS}
              aria-label="人数を増やす"
              className="w-8 h-8 flex items-center justify-center text-muted hover:text-accent disabled:opacity-30 disabled:hover:text-muted transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              ＋
            </button>
          </div>
          {servings !== baseServings && (
            <button
              type="button"
              onClick={() => setServings(baseServings)}
              className="text-xs text-accent underline underline-offset-2 hover:text-primary transition-colors"
            >
              元に戻す
            </button>
          )}
        </div>
      </div>

      <div className="bg-white border border-warm-border">
        {ingredients.map((ing, i) => (
          <div
            key={i}
            className="flex items-start gap-3 px-5 py-3 border-b border-warm-border last:border-0"
          >
            <span className="font-semibold text-sm min-w-[56px] sm:min-w-[80px] text-right text-primary tabular-nums">
              {scaleAmount(ing.amount, ratio)}
              {ing.unit}
            </span>
            <span className="text-sm flex-1">
              {ing.name}
              {ing.note && (
                <span className="text-muted text-xs ml-2">（{ing.note}）</span>
              )}
            </span>
          </div>
        ))}
      </div>

      {ratio !== 1 && (
        <p className="text-xs text-muted mt-2 no-print">
          ※分量は{baseServings}人前を基準に自動計算した目安です。調味料など一部の分量は味を見て調整してください。
        </p>
      )}
    </section>
  );
}
