"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface CarouselItem {
  id: string | number;
  title: string;
  description?: string;
  imageSrc?: string;
  href?: string;
  tag?: string;
  meta?: string;
}

interface MobileCarouselProps {
  items: CarouselItem[];
  autoAdvanceMs?: number;
}

export default function MobileCarousel({ items, autoAdvanceMs = 3200 }: MobileCarouselProps) {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const len = items.length;

  function goTo(i: number) {
    const next = Math.max(0, Math.min(len - 1, i));
    setCurrent(next);
    if (trackRef.current && wrapRef.current) {
      const cardW = wrapRef.current.offsetWidth * 0.85 + 12;
      trackRef.current.style.transform = `translateX(-${next * cardW}px)`;
    }
  }

  function resetTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => {
        const next = (c + 1) % len;
        if (trackRef.current && wrapRef.current) {
          const cardW = wrapRef.current.offsetWidth * 0.85 + 12;
          trackRef.current.style.transform = `translateX(-${next * cardW}px)`;
        }
        return next;
      });
    }, autoAdvanceMs);
  }

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [len, autoAdvanceMs]);

  function onTouchStart(e: React.TouchEvent) {
    startXRef.current = e.touches[0].clientX;
    if (timerRef.current) clearInterval(timerRef.current);
  }

  function onTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - startXRef.current;
    if (dx < -40) goTo(current + 1);
    else if (dx > 40) goTo(current - 1);
    resetTimer();
  }

  return (
    <div>
      {/* Track */}
      <div
        ref={wrapRef}
        className="overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          ref={trackRef}
          className="flex gap-3"
          style={{ transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)" }}
        >
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href ?? "#"}
              className="relative flex-none rounded-xl overflow-hidden"
              style={{ width: "85%", aspectRatio: "16/10" }}
            >
              {item.imageSrc ? (
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="85vw"
                  draggable={false}
                />
              ) : (
                <div className="absolute inset-0 bg-gray-400" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {item.tag && (
                  <p className="text-[10px] tracking-widest uppercase text-white/65 mb-1">{item.tag}</p>
                )}
                <p className="text-sm font-semibold text-white leading-snug">{item.title}</p>
                {item.meta && (
                  <p className="text-[11px] text-white/55 mt-1">{item.meta}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => { goTo(i); resetTimer(); }}
            aria-label={`${i + 1}枚目へ`}
            className="transition-all duration-200"
            style={{
              width: i === current ? 18 : 6,
              height: 6,
              borderRadius: i === current ? 3 : "50%",
              background: i === current ? "var(--color-primary, #1a1a1a)" : "rgba(0,0,0,0.2)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
