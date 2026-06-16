'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cuisines } from '@/data/recipes';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  const headerBase = isHome
    ? 'absolute top-0 left-0 right-0 z-50'
    : 'bg-cream border-b border-warm-border';
  const border = isHome ? 'border-white/10' : 'border-warm-border';
  const textSub = isHome ? 'text-white/40' : 'text-muted';
  const logo = isHome ? 'text-white' : 'text-primary';
  const navItem = isHome
    ? 'text-white/60 hover:text-white'
    : 'text-muted hover:text-primary';

  return (
    <header className={headerBase}>
      {/* Top bar */}
      <div className={`border-b ${border}`}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center text-xs tracking-widest uppercase ${textSub}`}>
          <span>海外名料理 日本語レシピ集</span>
          <span>MONDE RECIPE</span>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
        <div className="flex items-center justify-between">
          <Link href="/">
            <span className={`font-serif text-3xl sm:text-4xl font-bold tracking-tight leading-none transition-colors ${logo}`}>
              MONDE RECIPE
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: '/', label: 'ホーム' },
              { href: '/recipes', label: 'レシピ一覧' },
              { href: '/chefs', label: 'シェフ' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs tracking-widest uppercase transition-colors ${navItem}`}
              >
                {item.label}
              </Link>
            ))}

            {/* Category dropdown */}
            <div className="relative group">
              <button className={`text-xs tracking-widest uppercase transition-colors flex items-center gap-1 ${navItem}`}>
                カテゴリー
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-warm-border text-primary shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-50">
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
            className={`md:hidden transition-colors ${navItem}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニューを開く"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-warm-border bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4">
            <Link href="/" className="text-sm tracking-widest uppercase text-muted hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>ホーム</Link>
            <Link href="/recipes" className="text-sm tracking-widest uppercase text-muted hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>レシピ一覧</Link>
            <Link href="/chefs" className="text-sm tracking-widest uppercase text-muted hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>シェフ</Link>
            <div className="border-t border-warm-border pt-4">
              <p className="text-xs tracking-widest uppercase text-muted mb-3">カテゴリー</p>
              {cuisines.map((c) => (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}`}
                  className="block py-2 text-sm text-muted hover:text-primary transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}

      {/* Category nav bar — hidden on homepage to keep editorial hero clean */}
      {!isHome && (
        <div className={`border-t ${border}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-6 overflow-x-auto py-3 scrollbar-none">
              {cuisines.map((c) => (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}`}
                  className="whitespace-nowrap text-xs tracking-widest uppercase text-muted hover:text-primary transition-colors"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
