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
}

interface Props {
  items: CuisineSelectorItem[];
}

export default function CuisineSelector({ items }: Props) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState<number[]>([]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    items.forEach((_, i) => {
      timers.push(setTimeout(() => setVisible((prev) => [...prev, i]), 80 * i));
    });
    return () => timers.forEach(clearTimeout);
  }, [items]);

  return (
    <>
      {/* Desktop: horizontal expanding panels */}
      <div
        className="hidden md:flex w-full h-[360px] gap-[3px] overflow-hidden rounded-xl"
        role="list"
      >
        {items.map((item, i) => {
          const isActive = i === active;
          const isVisible = visible.includes(i);
          return (
            <div
              key={item.slug}
              role="listitem"
              onClick={() => setActive(i)}
              style={{
                flex: isActive ? '7 1 0%' : '1 1 0%',
                backgroundImage: `url('${item.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-40px)',
                transition:
                  'flex 0.65s cubic-bezier(0.65,0,0.35,1), opacity 0.5s ease, transform 0.5s ease',
                minWidth: '44px',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '6px',
              }}
            >
              {/* Gradient overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)',
                  transition: 'opacity 0.4s',
                }}
              />

              {/* Label */}
              <Link
                href={`/category/${item.slug}`}
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '12px',
                  right: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  textDecoration: 'none',
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                {/* Flag icon */}
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(15,15,15,0.75)',
                    border: '1.5px solid rgba(255,255,255,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    flexShrink: 0,
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {item.emoji}
                </div>

                {/* Text */}
                <div style={{ overflow: 'hidden' }}>
                  <div
                    style={{
                      color: '#fff',
                      fontSize: '15px',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateX(0)' : 'translateX(20px)',
                      transition: 'opacity 0.45s 0.1s, transform 0.45s 0.1s',
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      color: 'rgba(255,255,255,0.6)',
                      fontSize: '12px',
                      whiteSpace: 'nowrap',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateX(0)' : 'translateX(20px)',
                      transition: 'opacity 0.45s 0.18s, transform 0.45s 0.18s',
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
                      marginTop: '6px',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateX(0)' : 'translateX(20px)',
                      transition: 'opacity 0.45s 0.24s, transform 0.45s 0.24s',
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
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/category/${item.slug}`}
            className="group relative block overflow-hidden aspect-square rounded-lg"
          >
            <div
              style={{
                backgroundImage: `url('${item.image}')`,
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
