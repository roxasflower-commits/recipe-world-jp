'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export interface CuisineSelectorItem {
  slug: string;
  label: string;
  labelEn: string;
  description: string;
  emoji: string;
  image: string;
  region: string;
}

interface Props {
  items: CuisineSelectorItem[];
}

const REGIONS = [
  { key: 'europe',             label: 'ヨーロッパ',     emoji: '🌍' },
  { key: 'nordic',             label: '北欧',            emoji: '🧊' },
  { key: 'asia',               label: 'アジア',          emoji: '🌏' },
  { key: 'north-america',      label: '北アメリカ',      emoji: '🌎' },
  { key: 'south-america',      label: '南アメリカ',      emoji: '🌎' },
  { key: 'middle-east-africa', label: '中東・アフリカ',  emoji: '🌍' },
];

export default function CuisineSelector({ items }: Props) {
  const [activeRegion, setActiveRegion] = useState(REGIONS[0].key);
  const [activeIdx, setActiveIdx] = useState(0);
  const [visible, setVisible] = useState<number[]>([]);

  const regionItems = items.filter((c) => c.region === activeRegion);

  useEffect(() => {
    setActiveIdx(0);
    setVisible([]);
    const timers: ReturnType<typeof setTimeout>[] = [];
    regionItems.forEach((_, i) => {
      timers.push(setTimeout(() => setVisible((prev) => [...prev, i]), 60 * i));
    });
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRegion]);

  return (
    <>
      {/* Region tabs */}
      <div className="flex gap-2 flex-wrap mb-5">
        {REGIONS.map((r) => (
          <button
            key={r.key}
            onClick={() => setActiveRegion(r.key)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-xs transition-colors ${
              activeRegion === r.key
                ? 'bg-primary text-white border-primary'
                : 'bg-white border-warm-border text-muted hover:border-primary/40 hover:text-primary'
            }`}
          >
            <span>{r.emoji}</span>
            <span>{r.label}</span>
          </button>
        ))}
      </div>

      {/* Desktop: horizontal accordion panels */}
      <div
        className="hidden md:flex w-full h-[320px] gap-[3px] overflow-hidden rounded-xl"
        role="list"
      >
        {regionItems.map((item, i) => {
          const isActive = i === activeIdx;
          const isVisible = visible.includes(i);
          return (
            <div
              key={item.slug}
              role="listitem"
              onClick={() => setActiveIdx(i)}
              style={{
                flex: isActive ? '7 1 0%' : '1 1 0%',
                backgroundImage: item.image ? `url('${item.image}')` : undefined,
                backgroundColor: item.image ? undefined : '#6b7280',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                transition:
                  'flex 0.6s cubic-bezier(0.65,0,0.35,1), opacity 0.4s ease, transform 0.4s ease',
                minWidth: '40px',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '6px',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.12) 55%, transparent 100%)',
                }}
              />
              <Link
                href={`/category/${item.slug}`}
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'absolute',
                  bottom: '14px',
                  left: '10px',
                  right: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  textDecoration: 'none',
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(15,15,15,0.75)',
                    border: '1.5px solid rgba(255,255,255,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '17px',
                    flexShrink: 0,
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {item.emoji}
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <div
                    style={{
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateX(0)' : 'translateX(18px)',
                      transition: 'opacity 0.4s 0.1s, transform 0.4s 0.1s',
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      color: 'rgba(255,255,255,0.6)',
                      fontSize: '11px',
                      whiteSpace: 'nowrap',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateX(0)' : 'translateX(18px)',
                      transition: 'opacity 0.4s 0.18s, transform 0.4s 0.18s',
                    }}
                  >
                    {item.description}
                  </div>
                  <div
                    style={{
                      color: 'rgba(255,255,255,0.4)',
                      fontSize: '10px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginTop: '5px',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateX(0)' : 'translateX(18px)',
                      transition: 'opacity 0.4s 0.24s, transform 0.4s 0.24s',
                    }}
                  >
                    レシピを見る →
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Mobile: 2-column grid */}
      <div className="grid grid-cols-2 gap-2 md:hidden">
        {regionItems.map((item) => (
          <Link
            key={item.slug}
            href={`/category/${item.slug}`}
            className="group relative block overflow-hidden aspect-square rounded-lg"
          >
            <div
              style={{
                backgroundImage: item.image ? `url('${item.image}')` : undefined,
                backgroundColor: item.image ? undefined : '#6b7280',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'absolute',
                inset: 0,
                transition: 'transform 0.7s ease',
              }}
              className="group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <span className="text-base">{item.emoji}</span>
              <p className="font-serif text-sm font-semibold text-white leading-tight mt-1">
                {item.label}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
