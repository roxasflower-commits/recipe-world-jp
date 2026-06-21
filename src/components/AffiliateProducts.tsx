const TAG = 'recipeworld-22';

interface Product {
  name: string;
  amazonQuery: string;
}

const defaultsByCuisine: Record<string, Product[]> = {
  french: [
    { name: 'ル・クルーゼ 鋳鉄鍋（ダッチオーブン）', amazonQuery: 'ル・クルーゼ 鋳鉄鍋 ダッチオーブン' },
    { name: '料理用赤ワイン', amazonQuery: '料理用 赤ワイン フランス' },
    { name: 'フレンチ料理 調理器具セット', amazonQuery: 'フランス料理 調理器具 鍋' },
  ],
  italian: [
    { name: 'パルミジャーノ・レッジャーノ（塊）', amazonQuery: 'パルミジャーノ レッジャーノ チーズ 塊' },
    { name: 'パスタポット 大型', amazonQuery: 'パスタポット 大型 鍋' },
    { name: 'チーズグレーター（おろし金）', amazonQuery: 'チーズグレーター おろし金 イタリア料理' },
  ],
  spanish: [
    { name: 'パエリアパン（パエリア鍋）', amazonQuery: 'パエリアパン パエリア鍋 スペイン' },
    { name: 'スペイン産サフラン', amazonQuery: 'サフラン スペイン産 料理' },
    { name: 'オリーブオイル エクストラバージン', amazonQuery: 'オリーブオイル エクストラバージン スペイン産' },
  ],
  thai: [
    { name: 'ナンプラー（タイ魚醤）', amazonQuery: 'ナンプラー 魚醤 タイ料理' },
    { name: '中華鍋 ウォック（鉄製）', amazonQuery: 'ウォック 中華鍋 鉄 タイ料理' },
    { name: 'タイ料理 スパイスセット', amazonQuery: 'タイ料理 スパイス セット' },
  ],
  indian: [
    { name: 'ガラムマサラ スパイスセット', amazonQuery: 'ガラムマサラ インド スパイスセット' },
    { name: 'バスマティライス', amazonQuery: 'バスマティライス インド 長粒米' },
    { name: 'カスリメティ（乾燥フェヌグリーク）', amazonQuery: 'カスリメティ フェヌグリーク インド料理' },
  ],
  nordic: [
    { name: '北欧デザイン 鍋セット', amazonQuery: 'ステンレス鍋 北欧デザイン' },
    { name: '木製まな板 大型', amazonQuery: '木製まな板 大型 北欧' },
    { name: '家庭用スモーカー（燻製器）', amazonQuery: 'スモーカー 家庭用 燻製器' },
  ],
  american: [
    { name: 'キャストアイアン スキレット', amazonQuery: 'キャストアイアン スキレット 鉄' },
    { name: 'バーベキューグリル', amazonQuery: 'バーベキューグリル コンパクト 家庭用' },
    { name: 'デジタル肉用温度計', amazonQuery: '肉用温度計 デジタル 即読み' },
  ],
  british: [
    { name: 'パイ皿・グラタン皿（耐熱）', amazonQuery: 'パイ皿 グラタン皿 耐熱 オーブン対応' },
    { name: 'キャセロール鍋（オーブン対応）', amazonQuery: 'キャセロール 鍋 耐熱 オーブン' },
    { name: 'グリルパン リブ付き（鉄製）', amazonQuery: 'グリルパン リブ 鉄製' },
  ],
  turkish: [
    { name: '耐熱土鍋（ギュヴェチ）', amazonQuery: '耐熱 土鍋 グラタン皿 スープ' },
    { name: 'スパイスミル（グラインダー）', amazonQuery: 'スパイスミル グラインダー 電動' },
    { name: 'チェズベ（トルコ式コーヒーポット）', amazonQuery: 'チェズベ コーヒーポット トルコ' },
  ],
  peruvian: [
    { name: '石臼・すり鉢（モルカヘテ）', amazonQuery: '石臼 すり鉢 モルタル スパイス' },
    { name: '電気圧力鍋', amazonQuery: '圧力鍋 電気 自動 レシピ付き' },
    { name: 'シトラスジューサー（レモン絞り）', amazonQuery: 'シトラスジューサー レモン絞り器 手動' },
  ],
};

const globalDefaults: Product[] = [
  { name: 'シェフナイフ・三徳包丁', amazonQuery: 'シェフナイフ 三徳包丁 料理' },
  { name: 'フライパン（テフロン加工）', amazonQuery: 'フライパン テフロン 26cm' },
  { name: 'ダッチオーブン 鋳鉄鍋', amazonQuery: '鋳鉄鍋 ダッチオーブン' },
];

interface Props {
  products?: Product[];
  cuisineSlug?: string;
}

export default function AffiliateProducts({ products, cuisineSlug }: Props) {
  const items = products && products.length > 0
    ? products
    : (cuisineSlug ? defaultsByCuisine[cuisineSlug] : undefined) ?? globalDefaults;

  return (
    <div className="border border-warm-border bg-white mb-8">
      <div className="px-5 py-4 border-b border-warm-border flex items-center gap-2">
        <div className="w-1 h-5 bg-gold flex-shrink-0" />
        <h3 className="font-serif text-base font-bold">このレシピに使う食材・道具</h3>
      </div>
      <ul>
        {items.map((p) => (
          <li key={p.amazonQuery} className="border-b border-warm-border last:border-0">
            <a
              href={`https://www.amazon.co.jp/s?k=${encodeURIComponent(p.amazonQuery)}&tag=${TAG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3.5 text-sm hover:bg-warm-bg transition-colors group"
            >
              <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="flex-1 text-gray-700 group-hover:text-primary transition-colors">{p.name}</span>
              <span className="text-[10px] text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded">Amazon</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="px-5 py-3 text-[10px] text-gray-400 leading-relaxed">
        ※ Amazonアソシエイトリンクです。購入されると紹介料を受け取る場合があります。
      </p>
    </div>
  );
}
