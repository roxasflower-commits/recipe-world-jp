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
  mexican: [
    { name: 'モルカヘテ（石臼・すり鉢）', query: 'モルカヘテ 石臼 すり鉢 メキシコ料理' },
    { name: 'コムアル（トルティーヤ用鉄板）', query: 'コムアル トルティーヤ 鉄板' },
    { name: 'フードプロセッサー（サルサ・モレ用）', query: 'フードプロセッサー サルサ 調理' },
  ],
  chinese: [
    { name: '中華鍋（ウォック、鉄製）', query: 'ウォック 中華鍋 鉄製' },
    { name: '中華せいろ（点心・餃子用）', query: '中華せいろ 蒸し器 点心' },
    { name: '中華包丁', query: '中華包丁 菜切り' },
  ],
  korean: [
    { name: '石鍋（トゥッペギ）', query: '石鍋 トゥッペギ 韓国料理' },
    { name: '韓国式焼肉グリルプレート', query: '韓国 焼肉 グリルプレート 無煙' },
    { name: 'キムチ保存容器', query: 'キムチ 保存容器 密閉' },
  ],
  vietnamese: [
    { name: '寸胴鍋（フォースープ用大型鍋）', query: '寸胴鍋 大型 スープ用' },
    { name: 'すり鉢・乳鉢（ヌクチャム用）', query: 'すり鉢 乳鉢 タレ作り' },
    { name: '竹製蒸し器（生春巻き・バインクオン用）', query: '竹製蒸し器 中華 蒸し料理' },
  ],
  moroccan: [
    { name: 'タジン鍋', query: 'タジン鍋 モロッコ料理' },
    { name: 'クスクス蒸し器（クスクシエ）', query: 'クスクス 蒸し器 クスクシエ' },
    { name: 'スパイスミル（ラスエルハヌート用）', query: 'スパイスミル 電動 香辛料' },
  ],
  'middle-eastern': [
    { name: 'フードプロセッサー（フムス用）', query: 'フードプロセッサー フムス 調理' },
    { name: '耐熱グラタン皿（マンサフ・ムサッカ用）', query: '耐熱 グラタン皿 大型 オーブン' },
    { name: 'スパイスミル（ザアタル・スーマック用）', query: 'スパイスミル 電動 香辛料' },
  ],
  greek: [
    { name: '金属串セット（スブラキ用）', query: '金属 串 焼き鳥 スブラキ' },
    { name: '耐熱グラタン皿（ムサカ用）', query: '耐熱 グラタン皿 ムサカ オーブン' },
    { name: 'ヨーグルトの水切り器（ツァジキ用）', query: 'ヨーグルト 水切り器 ギリシャヨーグルト' },
  ],
  georgian: [
    { name: '鋳鉄フライパン（ハチャプリ・シュクメルリ用）', query: '鋳鉄 フライパン スキレット' },
    { name: '土鍋（チャホホビリ・煮込み用）', query: '土鍋 煮込み鍋 グルジア料理' },
    { name: '打ち粉付きめん棒（キンカリ用）', query: 'めん棒 生地 手打ち' },
  ],
  portuguese: [
    { name: 'エッグタルト型（パステル・デ・ナタ用）', query: 'エッグタルト型 マフィン型' },
    { name: '耐熱グラタン皿（バカリャウ料理用）', query: '耐熱 グラタン皿 オーブン' },
    { name: '鋳鉄鍋（カルド・ヴェルデ用）', query: '鋳鉄鍋 ダッチオーブン スープ' },
  ],
  hawaiian: [
    { name: 'おにぎり型（スパムむすび用）', query: 'おにぎり型 スパムむすび' },
    { name: '揚げ物用鍋・オイルポット（マラサダ用）', query: '揚げ物鍋 オイルポット 温度計付き' },
    { name: 'グリルパン（フリフリチキン用）', query: 'グリルパン 鉄製 チキン' },
  ],
  taiwanese: [
    { name: '中華せいろ（小籠包・点心用）', query: '中華せいろ 蒸し器 小籠包' },
    { name: '大型寸胴鍋（牛肉麺スープ用）', query: '寸胴鍋 大型 スープ用' },
    { name: '中華鍋 ウォック（鉄製）', query: 'ウォック 中華鍋 鉄製' },
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
