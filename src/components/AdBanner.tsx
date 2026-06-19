'use client';

const AMAZON_TAG = 'recipeworld-22';
const RAKUTEN_AFF_ID = '54e65f86.b5ec5d5f.54e65f87.9c8603eb';

function amazonUrl(query: string) {
  return `https://www.amazon.co.jp/s?k=${encodeURIComponent(query)}&tag=${AMAZON_TAG}`;
}
function rakutenUrl(query: string) {
  const searchUrl = `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(query)}/`;
  return `https://hb.afl.rakuten.co.jp/ichiba/${RAKUTEN_AFF_ID}/?pc=${encodeURIComponent(searchUrl)}`;
}

interface AdBannerProps {
  slot?: string;
  format?: 'horizontal' | 'rectangle' | 'vertical';
  className?: string;
}

export default function AdBanner({ format = 'horizontal', className = '' }: AdBannerProps) {
  if (format === 'rectangle') {
    return (
      <div className={`w-[300px] ${className}`}>
        <div className="border border-warm-border bg-white overflow-hidden">
          <div className="bg-warm-bg px-4 py-3 border-b border-warm-border">
            <p className="text-xs font-serif font-bold text-primary tracking-wide">世界の料理を作るなら</p>
          </div>
          <div className="px-4 py-4 flex flex-col gap-3">
            <a
              href={amazonUrl('世界料理 調理器具')}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex items-center gap-3 p-3 bg-[#ff9900]/10 hover:bg-[#ff9900]/20 border border-[#ff9900]/30 transition-colors group"
            >
              <svg className="w-5 h-5 text-[#ff9900] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <div>
                <p className="text-xs font-bold text-gray-800">Amazonで調理器具</p>
                <p className="text-[10px] text-gray-500">料理道具をさがす →</p>
              </div>
            </a>
            <a
              href={rakutenUrl('輸入食材 世界料理')}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex items-center gap-3 p-3 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors group"
            >
              <svg className="w-5 h-5 text-red-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <div>
                <p className="text-xs font-bold text-gray-800">楽天で輸入食材</p>
                <p className="text-[10px] text-gray-500">本格食材をさがす →</p>
              </div>
            </a>
          </div>
          <p className="px-4 pb-3 text-[9px] text-gray-400">※ アフィリエイトリンクを含みます</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="border border-warm-border bg-white overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-4 px-5 py-4">
          <div className="flex-shrink-0 text-center sm:text-left">
            <p className="text-xs text-muted uppercase tracking-widest mb-0.5">世界の料理をもっと楽しく</p>
            <p className="font-serif font-bold text-primary text-sm">調理器具・食材をさがす</p>
          </div>
          <div className="flex-1 flex flex-col sm:flex-row items-center gap-3 sm:justify-end">
            <a
              href={amazonUrl('世界料理 調理器具 キッチン')}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff9900] hover:bg-[#e68900] text-white text-xs font-bold transition-colors whitespace-nowrap"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Amazonで調理器具を見る
            </a>
            <a
              href={rakutenUrl('輸入食材 世界料理 スパイス')}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors whitespace-nowrap"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              楽天で輸入食材を見る
            </a>
          </div>
        </div>
        <p className="px-5 pb-2 text-[9px] text-gray-400">※ 当サイトはAmazonアソシエイト・楽天アフィリエイトプログラムに参加しており、適格販売で紹介料を受け取る場合があります。</p>
      </div>
    </div>
  );
}
