'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cuisines } from '@/data/recipes';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const cuisineDetails: Record<string, { emoji: string; description: string }> = {
  french:   { emoji: '🇫🇷', description: 'ブフブルギニョン、ブイヤベース' },
  italian:  { emoji: '🇮🇹', description: 'カルボナーラ、リゾット' },
  american: { emoji: '🇺🇸', description: 'スマッシュバーガー、ガンボ' },
  thai:     { emoji: '🇹🇭', description: 'パッタイ、グリーンカレー' },
  british:  { emoji: '🇬🇧', description: 'ビーフウェリントン、スコーン' },
  spanish:  { emoji: '🇪🇸', description: 'パエリア、ガスパチョ' },
  nordic:   { emoji: '🇸🇪', description: 'スモーブロー、グラブラックス' },
  turkish:  { emoji: '🇹🇷', description: 'シシケバブ、ドルマ' },
  indian:   { emoji: '🇮🇳', description: 'バターチキン、ビリヤニ' },
  peruvian: { emoji: '🇵🇪', description: 'セビーチェ、ロモサルタード' },
  mexican:  { emoji: '🇲🇽', description: 'タコス、モレ、グアカモーレ' },
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
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
  const catBtnColor = isHome ? 'text-white/60 hover:text-white' : 'text-muted hover:text-primary';
  const dropdownBg = isHome ? 'bg-primary/90 border-white/10' : 'bg-white border-warm-border';
  const dropdownTitle = isHome ? 'text-white/40 border-white/10' : 'text-muted border-warm-border';
  const itemHover = isHome ? 'hover:bg-white/10' : 'hover:bg-cream';
  const itemLabel = isHome ? 'text-white' : 'text-primary';
  const itemDesc = isHome ? 'text-white/50' : 'text-muted';
  const iconBorder = isHome ? 'border-white/20' : 'border-warm-border';

  return (
    <header className={headerBase}>
      {/* Top bar */}
      <div className={`border-b ${border}`}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center text-xs tracking-widest uppercase ${textSub}`}>
          <span>海外名料理 日本語レシピ集</span>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:opacity-100 opacity-60 transition-opacity">About</Link>
            <span>MONDE RECIPE</span>
          </div>
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
          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: '/', label: 'ホーム' },
              { href: '/recipes', label: 'レシピ一覧' },
              { href: '/chefs', label: 'シェフ' },
              { href: '/about', label: 'About' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs tracking-widest uppercase transition-colors px-4 py-2 rounded-full ${navItem}`}
              >
                {item.label}
              </Link>
            ))}

            {/* Animated category dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCatOpen(true)}
              onMouseLeave={() => setCatOpen(false)}
            >
              <button className={`text-xs tracking-widest uppercase transition-colors flex items-center gap-1 px-4 py-2 rounded-full ${catBtnColor} ${catOpen ? (isHome ? 'bg-white/10' : 'bg-primary/8') : ''}`}>
                カテゴリー
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-300 ${catOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {catOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className={`absolute top-full right-0 mt-2 w-72 border rounded-2xl p-4 shadow-lg z-50 ${dropdownBg}`}
                  >
                    <p className={`text-[10px] tracking-widest uppercase mb-3 pb-3 border-b ${dropdownTitle}`}>
                      料理のジャンル
                    </p>
                    <div className="grid grid-cols-2 gap-1">
                      {cuisines.map((c) => {
                        const detail = cuisineDetails[c.slug];
                        return (
                          <Link
                            key={c.slug}
                            href={`/category/${c.slug}`}
                            onClick={() => setCatOpen(false)}
                            className={`flex items-center gap-2.5 px-2 py-2 rounded-xl transition-colors ${itemHover}`}
                          >
                            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center text-base flex-shrink-0 ${iconBorder}`}>
                              {detail?.emoji}
                            </div>
                            <div className="min-w-0">
                              <div className={`text-xs font-medium leading-tight ${itemLabel}`}>
                                {c.label.replace('料理', '')}
                              </div>
                              <div className={`text-[10px] leading-tight mt-0.5 truncate ${itemDesc}`}>
                                {detail?.description}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
            <Link href="/about" className="text-sm tracking-widest uppercase text-muted hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>About</Link>
            <div className="border-t border-warm-border pt-4">
              <p className="text-xs tracking-widest uppercase text-muted mb-3">カテゴリー</p>
              <div className="grid grid-cols-2 gap-2">
                {cuisines.map((c) => {
                  const detail = cuisineDetails[c.slug];
                  return (
                    <Link
                      key={c.slug}
                      href={`/category/${c.slug}`}
                      className="flex items-center gap-2 py-2"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="text-base">{detail?.emoji}</span>
                      <span className="text-sm text-muted hover:text-primary transition-colors">{c.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>
      )}

      {/* Category nav bar */}
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
