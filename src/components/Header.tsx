'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cuisines } from '@/data/recipes';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-primary text-white">
      {/* Top bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center text-xs text-white/50 tracking-widest uppercase">
          <span>海外名料理 日本語レシピ集</span>
          <span>MONDE RECIPE</span>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="group">
            <div className="flex flex-col">
              <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight leading-none">
                MONDE RECIPE
              </span>
              <span className="text-xs tracking-[0.25em] text-white/50 mt-1 uppercase">
                世界の名料理を、あなたの台所へ
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase">
            <Link
              href="/"
              className="text-white/70 hover:text-white transition-colors"
            >
              ホーム
            </Link>
            <Link
              href="/recipes"
              className="text-white/70 hover:text-white transition-colors"
            >
              レシピ一覧
            </Link>
            <Link
              href="/chefs"
              className="text-white/70 hover:text-white transition-colors"
            >
              トップシェフ
            </Link>
            <div className="relative group">
              <button className="text-white/70 hover:text-white transition-colors flex items-center gap-1">
                カテゴリー
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-white text-primary shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-50">
                {cuisines.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/category/${c.slug}`}
                    className="block px-4 py-3 text-sm hover:bg-cream transition-colors border-b border-warm-border last:border-0 font-sans normal-case tracking-normal"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white/70 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニューを開く"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="/"
              className="text-white/70 hover:text-white text-sm tracking-widest uppercase"
              onClick={() => setMenuOpen(false)}
            >
              ホーム
            </Link>
            <Link
              href="/recipes"
              className="text-white/70 hover:text-white text-sm tracking-widest uppercase"
              onClick={() => setMenuOpen(false)}
            >
              レシピ一覧
            </Link>
            <Link
              href="/chefs"
              className="text-white/70 hover:text-white text-sm tracking-widest uppercase"
              onClick={() => setMenuOpen(false)}
            >
              トップシェフ
            </Link>
            <div className="border-t border-white/10 pt-4">
              <p className="text-white/30 text-xs tracking-widest uppercase mb-3">カテゴリー</p>
              {cuisines.map((c) => (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}`}
                  className="block py-2 text-white/70 hover:text-white text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}

      {/* Category nav bar */}
      <div className="border-t border-white/10 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 overflow-x-auto py-3 scrollbar-none">
            {cuisines.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="whitespace-nowrap text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
