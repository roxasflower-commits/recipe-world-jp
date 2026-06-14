const TAG = 'recipeworld-22';

const toolsByCuisine: Record<string, { name: string; query: string }[]> = {
  french: [
    { name: 'ル・クルーゼ ココット鍋', query: 'ル・クルーゼ ココット鍋' },
    { name: 'タルト型・キッシュ型', query: 'タルト型 キッシュ型' },
    { name: 'フレンチ料理 鍋セット', query: 'フランス料理 鍋 調理器具' },
  ],
  italian: [
    { name: 'パスタポット 大型', query: 'パスタポット 大型' },
    { name: 'チーズグレーター', query: 'チーズグレーター おろし器' },
    { name: 'パスタマシン', query: 'パスタマシン 手打ち' },
  ],
  american: [
    { name: 'キャストアイアン スキレット', query: 'キャストアイアン スキレット' },
    { name: 'バーガープレス', query: 'ハンバーガープレス' },
    { name: 'グリルパン', query: 'グリルパン 鉄製' },
  ],
  british: [
    { name: 'パイ皿・グラタン皿', query: 'パイ皿 グラタン皿 耐熱' },
    { name: 'キャセロール鍋', query: 'キャセロール 鍋 耐熱' },
    { name: 'グリルパン リブ付き', query: 'グリルパン リブ付き' },
  ],
  indian: [
    { name: 'スパイスボックス', query: 'スパイスボックス マサラダン' },
    { name: 'インド料理鍋 カダイ', query: 'インド料理 鍋 カダイ' },
    { name: 'タンドール風 鉄板', query: 'タンドール 家庭用 鉄板' },
  ],
  nordic: [
    { name: 'ステンレス鍋 北欧デザイン', query: 'ステンレス鍋 北欧' },
    { name: '木製まな板 大型', query: '木製まな板 大型' },
    { name: '家庭用スモーカー', query: 'スモーカー 家庭用' },
  ],
  peruvian: [
    { name: '石臼・すり鉢', query: '石臼 モルタル すり鉢' },
    { name: '電気圧力鍋', query: '圧力鍋 電気' },
    { name: 'シトラスジューサー', query: 'レモン絞り器 シトラスジューサー' },
  ],
  spanish: [
    { name: 'パエリアパン', query: 'パエリアパン パエリア鍋' },
    { name: '耐熱土鍋 スペイン料理', query: '耐熱 土鍋 スペイン料理' },
    { name: 'オリーブオイルディスペンサー', query: 'オリーブオイル ディスペンサー' },
  ],
  thai: [
    { name: '中華鍋 ウォック', query: 'ウォック 中華鍋 鉄' },
    { name: '石臼 クロック（タイ料理）', query: '石臼 クロック タイ料理' },
    { name: 'バンブースチーマー', query: 'バンブースチーマー 竹製' },
  ],
  turkish: [
    { name: '耐熱土鍋 ギュヴェチ', query: '耐熱 土鍋 トルコ料理' },
    { name: 'リブ付きグリルパン', query: 'グリルパン リブ 鉄製' },
    { name: 'チェズベ（トルココーヒーポット）', query: 'チェズベ コーヒーポット' },
  ],
};

const defaultTools = [
  { name: 'シェフナイフ・三徳包丁', query: 'シェフナイフ 三徳包丁' },
  { name: 'フライパン', query: 'フライパン テフロン' },
  { name: 'ダッチオーブン 鋳鉄鍋', query: '鋳鉄鍋 ダッチオーブン' },
];

export default function AmazonTools({ cuisineSlug }: { cuisineSlug: string }) {
  const tools = toolsByCuisine[cuisineSlug] ?? defaultTools;

  return (
    <div className="border border-warm-border bg-white">
      <div className="px-5 py-4 border-b border-warm-border flex items-center gap-2">
        <div className="w-1 h-5 bg-gold flex-shrink-0" />
        <h3 className="font-serif text-base font-bold">おすすめ調理器具</h3>
      </div>
      <ul>
        {tools.map((tool) => (
          <li key={tool.query} className="border-b border-warm-border last:border-0">
            <a
              href={`https://www.amazon.co.jp/s?k=${encodeURIComponent(tool.query)}&tag=${TAG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3.5 text-sm hover:bg-warm-bg transition-colors group"
            >
              <svg
                className="w-4 h-4 text-accent flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="flex-1 text-gray-700 group-hover:text-primary transition-colors">
                {tool.name}
              </span>
              <svg
                className="w-3 h-3 text-accent opacity-0 group-hover:opacity-100 transition-opacity"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </li>
        ))}
      </ul>
      <p className="px-5 py-3 text-[10px] text-gray-400 leading-relaxed">
        ※ 当サイトはAmazonアソシエイトプログラムに参加しており、適格販売で紹介料を受け取る場合があります。
      </p>
    </div>
  );
}
