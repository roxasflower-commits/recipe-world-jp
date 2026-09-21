# 新規シェフ追加候補（2026-09-21リサーチ）

`CHEF_RECIPE_QUEUE.md`（既存シェフ25名分の未掲載レシピ）が全55件消化完了したため、新しいシェフをサイトに追加する候補をリサーチした。既存25名でカバーできていないジャンルを中心に7名を選定。全14件のレシピ候補URLをHTTP 200＋実際の材料・分量・手順ありまで確認済み。

**注意：このファイルは`CHEF_RECIPE_QUEUE.md`と違い、まだ`src/data/chefs.ts`に存在しないシェフばかり。** 自動追加タスクをこのファイルに向ける前に、以下をユーザーが確認・決定する必要がある：
1. どのシェフを実際に追加するか（全7名か、一部か）
2. ノブ・松久を追加する場合、「日本料理」カテゴリーを`src/data/recipes.ts`の`cuisines`配列に新設する必要あり（[[project_pending_nobu]]で保留になっていた論点）
3. 各シェフのプロフィール写真（`public/images/chefs/chef-{slug}.jpg`）は他の新規シェフ追加時と同様、一旦Unsplash等のフリー素材で仮設置し、後日ユーザー提供の写真に差し替える運用（[[project_chefs_michelin]]と同じ流れ）
4. `chefSlug`は追加時に`src/data/chefs.ts`へ新規エントリを作成してから使う

決定後は、承認された分だけ下記からチェックリスト形式で`CHEF_RECIPE_QUEUE.md`と統合するか、このファイルをそのまま自動追加タスクの対象にする。

---

## 1. ノブ・松久（Nobu Matsuhisa）— 新設予定cuisineSlug: `japanese`

- **本名/国籍:** Nobuyuki（Nobu）Matsuhisa／日本
- **代表店:** Nobu（ロバート・デ・ニーロ共同経営の世界的高級寿司ブランド、50店舗以上）、Matsuhisa（ビバリーヒルズ、原点の店）
- **フック:** 日本人シェフとして世界初のグローバル高級和食ブランドを築き、ペルー仕込みの"Nobuスタイル"（南米×和食融合）で世界の富裕層を魅了した和食界のレジェンド。

| # | 料理名 | URL | HTTP | 備考 |
|---|--------|-----|------|------|
| 1 | Miso-Marinated Black Cod（銀ダラの西京味噌焼き） | https://hikarimiso.com/recipes/miso-marinated-black-cod-recipe-by-chef-nobu-matsuhisa/ | 200 | Nobu最大の代表作。[[project_pending_nobu]]で確認済み。 |
| 2 | Yellowtail Sashimi with Jalapeño（ハマチのカルパッチョ ハラペーニョ風味） | https://www.mindfood.com/recipe/recipe-yellow-tail-sashimi-jalapeno-nobu/ | 200 | 実分量あり（ハマチ70g・ガーリックピューレ3g・柚子汁60ml＋醤油30ml）。「ニュースタイル刺身」というジャンルを生んだ看板前菜。 |

---

## 2. ヨタム・オトレンギ（Yotam Ottolenghi）— cuisineSlug: `middle-eastern`（既存）

- **本名/国籍:** Yotam Ottolenghi／イスラエル系イギリス人
- **代表店:** Ottolenghi（ロンドンの惣菜店チェーン）、NOPI、ROVI
- **フック:** 中東・地中海の野菜料理を世界的ブームに押し上げた「野菜革命」の仕掛け人。ガーディアン紙の看板コラムニストとしても著名。

| # | 料理名 | URL | HTTP | 備考 |
|---|--------|-----|------|------|
| 1 | Shakshuka（シャクシューカ） | https://ottolenghi.co.uk/pages/recipes/shakshuka | 200 | 本人公式サイト。完熟トマト800g等の実分量、2〜4人前。 |
| 2 | Roasted Aubergine with Curried Yoghurt（焼き茄子のカレーヨーグルトソース） | https://ottolenghi.co.uk/pages/recipes/roasted-aubergine-curried-yoghurt | 200 | 本人公式サイト。茄子1.1kg・ギリシャヨーグルト200g等の実分量、5ステップ。野菜中心の作風を象徴する一品。 |

---

## 3. ホセ・アンドレス（José Andrés）— cuisineSlug: `spanish`（既存）

- **本名/国籍:** José Ramón Andrés Puerta／スペイン系アメリカ人
- **代表店:** Jaleo、minibar by José Andrés（ワシントンDC）
- **フック:** スペインの"タパス文化"を米国に広めた立役者。世界最大級の被災地炊き出し団体World Central Kitchenの創設者としても日本で報道されている人道支援シェフ。

| # | 料理名 | URL | HTTP | 備考 |
|---|--------|-----|------|------|
| 1 | Patatas Bravas（パタタス・ブラバス） | https://www.realfoodtraveler.com/how-to-make-patatas-bravas-by-chef-jose-andres/ | 200 | 「By Chef José Andrés」明記。アイダホポテト1lb・スペイン産EVOO2カップ等の実分量、二度揚げ製法。 |
| 2 | Tichi's Gazpacho（ティチのガスパチョ） | https://www.today.com/recipes/jose-andres-gazpacho-recipe-t275081 | 200 | 妻の実家伝来レシピで、本人が「自分の最も有名なレシピ」と語る一品。実分量あり（本人Substack版は途中から有料のためTODAY.com版を使用）。 |

---

## 4. デイヴィッド・チャン（David Chang）— cuisineSlug: `korean`（既存）

- **本名/国籍:** David Chang／韓国系アメリカ人
- **代表店:** Momofuku Noodle Bar / Ssäm Bar / Ko（ニューヨーク）
- **フック:** ラーメン専門店ブームを米国で巻き起こし、Netflix「Ugly Delicious」出演でも有名。韓国系移民2世としてアジア料理を高級店の舞台に押し上げた。

| # | 料理名 | URL | HTTP | 備考 |
|---|--------|-----|------|------|
| 1 | Momofuku Bo Ssam（ボッサム） | https://cooking.nytimes.com/recipes/12197-momofukus-bo-ssam | 200 | NYT Cooking 2012年掲載のオリジナルレシピ。本人の最も有名な料理。 |
| 2 | Momofuku Ramen（自家製ラーメン） | https://foodnouveau.com/how-to-make-david-changs-momofuku-ramen-at-home/ | 200 | Momofukuクックブックからの再現レシピ（第三者サイトによる翻案。完全オリジナル店舗レシピではない点に留意）。スープ・タレ・チャーシューまでフル分量あり。 |

**留意点:** ②は「翻案」レシピ。より公式に近いものが良ければ、Momofuku公式サイトの新作ボッサム（https://shop.momofuku.com/blogs/recipes/savory-bo-ssam-with-chili-crunch-honey-glaze 、HTTP 200）もあるが①と料理名が被るため、多様性を優先しラーメンを提案。

---

## 5. ガガン・アナンド（Gaggan Anand）— cuisineSlug: `indian`（既存）

- **本名/国籍:** Gaggan Anand／インド（バンコク・福岡拠点）
- **代表店:** Gaggan（バンコク）、Gaggan Anand（福岡）
- **フック:** アジア最優秀レストラン4度受賞。インド料理を分子ガストロノミーで再構築した革新派シェフ。手で食べる独創的なコース"Lick it Up"は世界のフーディーの憧れ。

| # | 料理名 | URL | HTTP | 備考 |
|---|--------|-----|------|------|
| 1 | "Lick it Up"（マンゴー・柚子ジェルの一皿） | https://www.theworlds50best.com/stories/News/50-best-masterclass-try-making-gaggan-anands-lick-it-up-at-home.html | 200 | 4パーツ全ての実分量（グラム単位）とステップあり。本人最大の代表作でSNSでも著名。 |
| 2 | Soul Food（渡り蟹のコンフォートカレー） | https://www.finedininglovers.com/explore/recipes/soul-food | 200 | 蟹肉1kg・赤玉ねぎ500g・ココナッツミルク3L等の実分量、8ステップ。 |

---

## 6. クリスティーナ・トシ（Christina Tosi）— cuisineSlug: `american`（既存）

- **本名/国籍:** Christina Tosi／アメリカ
- **代表店/ブランド:** Milk Bar（Momofukuグループ発のベーカリーチェーン）
- **フック:** 「MasterChef」審査員としても日本で知られる。コンポストクッキーやクラックパイなど"お菓子の常識を壊す"独創系ペストリーシェフ。

| # | 料理名 | URL | HTTP | 備考 |
|---|--------|-----|------|------|
| 1 | Compost Cookie（コンポストクッキー） | https://leitesculinaria.com/96642/recipes-compost-cookies.html | 200 | 約18項目の実分量（バター2本・砂糖1カップ等）、一晩冷蔵必須・焼成温度/時間まで明記。本人最大の代表作。 |
| 2 | Cereal Milk Panna Cotta（シリアルミルクのパンナコッタ） | https://www.gourmettraveller.com.au/recipe/dessert/cereal-milk-panna-cotta-11198/ | 200 | コーンフレーク75g・牛乳675ml・板ゼラチン等の実分量。本人発案の「シリアルミルク」を活かした一品。 |

---

## 7. スーサー・リー（Susur Lee）— cuisineSlug: `chinese`（既存、現在担当シェフ0名）

- **本名/国籍:** Susur Lee／中国系カナダ人（香港生まれ）
- **代表店:** Lee、Luckee（トロント）
- **フック:** 香港出身、トロントを拠点に"アジア融合料理(Asian fusion)"を確立したカナダ随一の有名華人シェフ。米「Top Chef Masters」出演でも知られる。

| # | 料理名 | URL | HTTP | 備考 |
|---|--------|-----|------|------|
| 1 | Asian-Style Ontario Milk Braised Beef（オンタリオ牛のアジア風ミルク煮込み） | https://vitamagazine.com/2024/10/08/a-thanksgiving-recipe-from-chef-susur-lee/ | 200 | 本人明記。じゃがいも2lb・ショートリブ6oz等の実分量、3パート（マッシュポテト・牛肉・ホースラディッシュクリーム）構成。 |
| 2 | Singapore-style Slaw with Ume Dressing（シンガポール風梅ドレッシングサラダ） | https://houseandhome.com/recipe/susur-lees-singapore-style-slaw-with-ume-dressing/ | 200（301→200リダイレクト） | 本人最大の代表作（19品目のサラダ）。カナダの老舗雑誌House & Home掲載。ピクルス赤玉ねぎ・梅ドレッシング・スロー本体まで全28品目の実分量とステップを確認済み。 |

---

## 候補外（除外した理由）

- **José Andrés Substack版ガスパチョ:** 記事途中から有料のため不採用（TODAY.com版で代替）。
- **David Chang Saveur/The Kitchn/Food Network系:** curlで403（bot block）となり自動検証不可のため回避（ブラウザなら開ける可能性はあるが、より確実なNYT Cooking・foodnouveau.comを採用）。
- **Susur Lee Food Network Canada/Streets of Toronto/Chatelaine版Singapore Slaw:** いずれもcurlで403/接続不可のため回避。House & Homeで代替（ブラウザ再検証でも全文取得を確認済み）。
- **Gaggan Anand「BAA...Boy」（低温調理の子豚料理）:** 温度・時間の具体的記載がなく不採用。
