const AMAZON_TAG = 'recipeworld-22';
const RAKUTEN_AFF_ID = '54e65f86.b5ec5d5f.54e65f87.9c8603eb';

function rakutenUrl(query: string): string {
  const searchUrl = `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(query)}/`;
  return `https://hb.afl.rakuten.co.jp/ichiba/${RAKUTEN_AFF_ID}/?pc=${encodeURIComponent(searchUrl)}`;
}

interface Product {
  name: string;
  amazonQuery: string;
  rakutenQuery?: string;
}

const defaultsByCuisine: Record<string, Product[]> = {
  french: [
    { name: 'ル・クルーゼ 鋳鉄鍋（ダッチオーブン）', amazonQuery: 'ル・クルーゼ 鋳鉄鍋 ダッチオーブン', rakutenQuery: 'ル・クルーゼ 鋳鉄鍋' },
    { name: 'フランス産発酵バター', amazonQuery: 'フランス産 発酵バター 輸入', rakutenQuery: 'フランス産 発酵バター' },
    { name: '料理用赤ワイン', amazonQuery: '料理用 赤ワイン フランス', rakutenQuery: '料理用 赤ワイン フランス産' },
  ],
  italian: [
    { name: 'パルミジャーノ・レッジャーノ（塊）', amazonQuery: 'パルミジャーノ レッジャーノ チーズ 塊', rakutenQuery: 'パルミジャーノ レッジャーノ 輸入' },
    { name: 'ディ・チェコ パスタ', amazonQuery: 'ディチェコ パスタ 輸入', rakutenQuery: 'ディチェコ パスタ 輸入' },
    { name: 'チーズグレーター（おろし金）', amazonQuery: 'チーズグレーター おろし金 イタリア料理', rakutenQuery: 'チーズグレーター おろし金' },
  ],
  spanish: [
    { name: 'パエリアパン（パエリア鍋）', amazonQuery: 'パエリアパン パエリア鍋 スペイン', rakutenQuery: 'パエリアパン スペイン' },
    { name: 'スペイン産サフラン', amazonQuery: 'サフラン スペイン産 料理', rakutenQuery: 'サフラン スペイン産 輸入' },
    { name: 'スモークパプリカ（ピメントン）', amazonQuery: 'スモークパプリカ スペイン産', rakutenQuery: 'スモークパプリカ スペイン産 輸入' },
  ],
  thai: [
    { name: 'ナンプラー（タイ魚醤）', amazonQuery: 'ナンプラー 魚醤 タイ料理', rakutenQuery: 'ナンプラー タイ産 輸入' },
    { name: 'ココナッツミルク タイ産', amazonQuery: 'ココナッツミルク タイ産', rakutenQuery: 'ココナッツミルク タイ産 輸入' },
    { name: '中華鍋 ウォック（鉄製）', amazonQuery: 'ウォック 中華鍋 鉄 タイ料理', rakutenQuery: 'ウォック 中華鍋 鉄製' },
  ],
  indian: [
    { name: 'ガラムマサラ スパイスセット', amazonQuery: 'ガラムマサラ インド スパイスセット', rakutenQuery: 'ガラムマサラ スパイス 輸入' },
    { name: 'バスマティライス', amazonQuery: 'バスマティライス インド 長粒米', rakutenQuery: 'バスマティライス インド産' },
    { name: 'ギー（インド産澄ましバター）', amazonQuery: 'ギー インド産 バター', rakutenQuery: 'ギー バター インド産' },
  ],
  nordic: [
    { name: 'スモークサーモン ノルウェー産', amazonQuery: 'スモークサーモン ノルウェー', rakutenQuery: 'スモークサーモン ノルウェー 輸入' },
    { name: 'ライ麦粉（全粒粉）', amazonQuery: 'ライ麦粉 全粒粉 北欧', rakutenQuery: 'ライ麦粉 全粒粉 北欧' },
    { name: '家庭用スモーカー（燻製器）', amazonQuery: 'スモーカー 家庭用 燻製器', rakutenQuery: 'スモーカー 家庭用 燻製' },
  ],
  american: [
    { name: 'キャストアイアン スキレット', amazonQuery: 'キャストアイアン スキレット 鉄', rakutenQuery: 'スキレット 鉄製 キャストアイアン' },
    { name: 'バーベキューソース 輸入', amazonQuery: 'バーベキューソース アメリカ 輸入', rakutenQuery: 'バーベキューソース アメリカ 輸入' },
    { name: 'デジタル肉用温度計', amazonQuery: '肉用温度計 デジタル 即読み', rakutenQuery: '肉用温度計 デジタル' },
  ],
  british: [
    { name: 'パイ皿・グラタン皿（耐熱）', amazonQuery: 'パイ皿 グラタン皿 耐熱 オーブン対応', rakutenQuery: 'パイ皿 耐熱 オーブン' },
    { name: 'ウスターソース 輸入', amazonQuery: 'ウスターソース 輸入 イギリス', rakutenQuery: 'リーペリン ウスターソース 輸入' },
    { name: 'キャセロール鍋（オーブン対応）', amazonQuery: 'キャセロール 鍋 耐熱 オーブン', rakutenQuery: 'キャセロール鍋 オーブン対応' },
  ],
  turkish: [
    { name: '耐熱土鍋（ギュヴェチ）', amazonQuery: '耐熱 土鍋 グラタン皿 スープ', rakutenQuery: '耐熱 土鍋 スープ皿' },
    { name: 'ザクロモラセス（ざくろシロップ）', amazonQuery: 'ザクロ シロップ 輸入', rakutenQuery: 'ザクロ シロップ 輸入' },
    { name: 'チェズベ（トルコ式コーヒーポット）', amazonQuery: 'チェズベ コーヒーポット トルコ', rakutenQuery: 'チェズベ コーヒーポット' },
  ],
  peruvian: [
    { name: '石臼・すり鉢（モルカヘテ）', amazonQuery: '石臼 すり鉢 モルタル スパイス', rakutenQuery: '石臼 すり鉢 スパイス' },
    { name: 'アヒアマリージョペースト', amazonQuery: 'アヒアマリージョ ペースト 輸入', rakutenQuery: 'アヒアマリージョ ペースト 輸入' },
    { name: '電気圧力鍋', amazonQuery: '圧力鍋 電気 自動 レシピ付き', rakutenQuery: '電気圧力鍋 自動調理' },
  ],
};

const globalDefaults: Product[] = [
  { name: 'シェフナイフ・三徳包丁', amazonQuery: 'シェフナイフ 三徳包丁 料理', rakutenQuery: '三徳包丁 料理 シェフ' },
  { name: 'フライパン（テフロン加工）', amazonQuery: 'フライパン テフロン 26cm', rakutenQuery: 'フライパン テフロン 26cm' },
  { name: 'ダッチオーブン 鋳鉄鍋', amazonQuery: '鋳鉄鍋 ダッチオーブン', rakutenQuery: '鋳鉄鍋 ダッチオーブン' },
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
          <li key={p.amazonQuery} className="flex items-center gap-2 px-4 py-3 border-b border-warm-border last:border-0">
            <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="flex-1 text-sm text-gray-700">{p.name}</span>
            <a
              href={`https://www.amazon.co.jp/s?k=${encodeURIComponent(p.amazonQuery)}&tag=${AMAZON_TAG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-medium px-2 py-1 rounded bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors whitespace-nowrap"
            >
              Amazon
            </a>
            {p.rakutenQuery && (
              <a
                href={rakutenUrl(p.rakutenQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-medium px-2 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100 transition-colors whitespace-nowrap"
              >
                楽天
              </a>
            )}
          </li>
        ))}
      </ul>
      <p className="px-5 py-3 text-[10px] text-gray-400 leading-relaxed">
        ※ Amazon・楽天アフィリエイトリンクです。購入されると紹介料を受け取る場合があります。
      </p>
    </div>
  );
}
