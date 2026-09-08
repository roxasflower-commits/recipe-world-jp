const AFF_ID = '54e65f86.b5ec5d5f.54e65f87.9c8603eb';

function rakutenUrl(query: string): string {
  const searchUrl = `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(query)}/`;
  return `https://hb.afl.rakuten.co.jp/ichiba/${AFF_ID}/?pc=${encodeURIComponent(searchUrl)}`;
}

const itemsByCuisine: Record<string, { name: string; query: string }[]> = {
  french: [
    { name: 'フランス産発酵バター', query: 'フランス産 発酵バター 輸入' },
    { name: 'ディジョンマスタード', query: 'ディジョン マスタード 輸入' },
    { name: 'フランスワインビネガー', query: 'ワインビネガー フランス産' },
  ],
  italian: [
    { name: 'ディ・チェコ パスタ', query: 'ディチェコ パスタ 輸入' },
    { name: 'EXVオリーブオイル イタリア産', query: 'エキストラバージン オリーブオイル イタリア産' },
    { name: 'パルミジャーノ・レッジャーノ', query: 'パルミジャーノ レッジャーノ 輸入' },
  ],
  american: [
    { name: 'スモークチップ BBQ用', query: 'スモークチップ BBQ 桜' },
    { name: 'アメリカンマスタード', query: 'イエローマスタード 輸入' },
    { name: 'バーベキューソース 輸入', query: 'バーベキューソース アメリカ 輸入' },
  ],
  british: [
    { name: 'ウスターソース 輸入', query: 'リーペリン ウスターソース 輸入' },
    { name: 'HPソース', query: 'HPソース イギリス 輸入' },
    { name: 'イングリッシュマスタード', query: 'コールマン マスタード 輸入' },
  ],
  indian: [
    { name: 'バスマティライス', query: 'バスマティライス インド産' },
    { name: 'ガラムマサラ 輸入', query: 'ガラムマサラ スパイス 輸入' },
    { name: 'ギー インド産', query: 'ギー バター インド産' },
  ],
  nordic: [
    { name: 'スモークサーモン ノルウェー産', query: 'スモークサーモン ノルウェー 輸入' },
    { name: 'ライ麦粉', query: 'ライ麦粉 全粒粉 北欧' },
    { name: 'ディルシード', query: 'ディル シード スパイス' },
  ],
  peruvian: [
    { name: 'アヒアマリージョペースト', query: 'アヒアマリージョ ペースト 輸入' },
    { name: 'クミン パウダー', query: 'クミン パウダー スパイス' },
    { name: 'ライムジュース 輸入', query: 'ライム果汁 100% 輸入' },
  ],
  spanish: [
    { name: 'スペイン産サフラン', query: 'サフラン スペイン産 輸入' },
    { name: 'スモークパプリカ', query: 'スモークパプリカ スペイン産' },
    { name: 'スペイン産オリーブオイル', query: 'オリーブオイル スペイン産 輸入' },
  ],
  thai: [
    { name: 'タイ産ナンプラー', query: 'ナンプラー タイ産 輸入' },
    { name: 'ココナッツミルク タイ産', query: 'ココナッツミルク タイ産 輸入' },
    { name: 'タイカレーペースト', query: 'タイカレーペースト 輸入' },
  ],
  turkish: [
    { name: 'ザクロ モラセス', query: 'ザクロ シロップ 輸入' },
    { name: 'トルコ産スパイスミックス', query: 'トルコ スパイス ミックス 輸入' },
    { name: 'ピスタチオ トルコ産', query: 'ピスタチオ トルコ産 無塩' },
  ],
  mexican: [
    { name: 'コーントルティーヤ 輸入', query: 'コーントルティーヤ 輸入' },
    { name: 'チポトレペッパー 缶詰', query: 'チポトレペッパー 缶詰 輸入' },
    { name: 'ライム果汁 100%', query: 'ライム 果汁 100% 輸入' },
  ],
  korean: [
    { name: 'コチュジャン 韓国産', query: 'コチュジャン 韓国産 輸入' },
    { name: 'ごま油 韓国産', query: 'ごま油 韓国産 輸入' },
    { name: 'コチュカル 韓国唐辛子粉', query: 'コチュカル 韓国 唐辛子粉' },
  ],
  vietnamese: [
    { name: 'ナンプラー ベトナム産', query: 'ナンプラー ベトナム産 輸入' },
    { name: 'ライスペーパー 生春巻き用', query: 'ライスペーパー 生春巻き 輸入' },
    { name: 'ベトナムコーヒー 粉', query: 'ベトナムコーヒー 粉 輸入' },
  ],
  moroccan: [
    { name: 'ラス・エル・ハヌート', query: 'ラスエルハヌート モロッコ スパイス' },
    { name: 'クスクス 輸入', query: 'クスクス 輸入 中粒' },
    { name: 'アルガンオイル 食用', query: 'アルガンオイル 食用 モロッコ産' },
  ],
  taiwanese: [
    { name: '台湾産 烏龍茶', query: '台湾 烏龍茶 輸入' },
    { name: '台湾 黒醤油', query: '台湾 醤油 黒醤油 輸入' },
    { name: '五香粉 中華スパイス', query: '五香粉 台湾 中華 スパイス' },
  ],
  'middle-eastern': [
    { name: 'タヒニ ごまペースト', query: 'タヒニ ごまペースト 輸入' },
    { name: 'スマック 中東スパイス', query: 'スマック スパイス 中東 輸入' },
    { name: 'ザアタル ハーブミックス', query: 'ザアタル スパイス 中東 輸入' },
  ],
  greek: [
    { name: 'ギリシャ産 EXVオリーブオイル', query: 'オリーブオイル ギリシャ産 エキストラバージン' },
    { name: 'フェタチーズ ギリシャ産', query: 'フェタチーズ ギリシャ産 輸入' },
    { name: 'カラマタオリーブ', query: 'カラマタオリーブ 輸入' },
  ],
  georgian: [
    { name: 'アジカペースト ジョージア産', query: 'アジカ ペースト ジョージア 輸入' },
    { name: 'ジョージアワイン', query: 'ジョージア ワイン 輸入' },
    { name: 'フェヌグリーク パウダー', query: 'フェヌグリーク パウダー スパイス' },
  ],
  portuguese: [
    { name: 'ポルトガル産オリーブオイル', query: 'オリーブオイル ポルトガル産 輸入' },
    { name: 'ポートワイン', query: 'ポートワイン 輸入' },
    { name: '塩タラ バカリャウ', query: '塩タラ バカリャウ 輸入' },
  ],
  hawaiian: [
    { name: 'マカデミアナッツ ハワイ産', query: 'マカデミアナッツ ハワイ産 輸入' },
    { name: '照り焼きソース 輸入', query: '照り焼きソース 輸入' },
    { name: 'ハワイアンシーソルト', query: 'ハワイアン シーソルト 岩塩' },
  ],
  chinese: [
    { name: '紹興酒 輸入', query: '紹興酒 輸入 中国' },
    { name: '豆板醤 中国製', query: '豆板醤 中国製 輸入' },
    { name: '花椒 ホアジャオ', query: '花椒 ホアジャオ スパイス 輸入' },
  ],
};

const defaultItems = [
  { name: '岩塩 ヒマラヤ産', query: 'ヒマラヤ岩塩 輸入' },
  { name: 'EXVオリーブオイル', query: 'エキストラバージン オリーブオイル 輸入' },
  { name: '輸入スパイスセット', query: 'スパイス セット 輸入 料理' },
];

export default function RakutenTools({ cuisineSlug }: { cuisineSlug: string }) {
  const items = itemsByCuisine[cuisineSlug] ?? defaultItems;

  return (
    <div className="border border-warm-border bg-white">
      <div className="px-5 py-4 border-b border-warm-border flex items-center gap-2">
        <div className="w-1 h-5 bg-red-600 flex-shrink-0" />
        <h3 className="font-serif text-base font-bold">おすすめ食材・輸入品</h3>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.query} className="border-b border-warm-border last:border-0">
            <a
              href={rakutenUrl(item.query)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3.5 text-sm hover:bg-warm-bg transition-colors group"
            >
              <svg
                className="w-4 h-4 text-red-500 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="flex-1 text-gray-700 group-hover:text-primary transition-colors">
                {item.name}
              </span>
              <svg
                className="w-3 h-3 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
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
        ※ 楽天アフィリエイトプログラムを利用しています。
      </p>
    </div>
  );
}
