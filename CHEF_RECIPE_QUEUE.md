# シェフ追加レシピ キュー

2026-07-20のリサーチで見つかった、掲載中シェフ25名の未掲載公開レシピ一覧。毎日3品ずつ自動で追加していくための進捗管理ファイル。

## 運用ルール（自動追加タスク用）

1. 下のリストから、上から順に未完了（`[ ]`）の項目を3件選ぶ。
2. `.claude/skills/add-recipe`（[レシピ追加ルール](feedback_add_recipe_rules.md)相当）の3点チェックを実施：
   - 掲載元URLをHTTP 200で確認（403ならブラウザで開けるか確認）
   - 材料・手順を掲載元から日本語に翻訳し、`sourceUrl`と一致させる
   - 写真はUnsplash等の著作権フリー画像をHTTP 200確認の上で使用（後日ユーザー提供の写真に差し替え予定）
3. `chefSlug`は該当シェフの既存スラッグをそのまま使う（`src/data/chefs.ts`参照、新規シェフ追加は不要）。
4. `src/data/recipes.ts`に追加、`public/sitemap-static.xml`にも追加。
5. `npx tsc --noEmit`と`npm run build`で確認。
6. 新しいブランチを切ってコミット・プッシュ・`gh pr create`・`gh pr merge --merge`まで実行（完全自動運用で合意済み）。
7. マージ後、このファイルの該当項目を `[x]` に変更し、追加した`recipes.ts`上のslugを追記してコミット・プッシュする。
8. 1回の実行で3件を超えて進めない（ユーザーとの合意ペース）。

候補が枯渇したら（全項目`[x]`になったら）、その旨をユーザーに伝えて自動追加を停止する。

---

## キュー

### René Redzepi（レネ・レゼピ）— chefSlug: `rene-redzepi`
- [ ] Pork Skin Sandwich（豚皮のサンドイッチ） — https://git.macropus.org/bbc-food/www.bbc.co.uk/food/recipes/pork_skin_sandwich_20650.html
- [ ] Bone Marrow Fudge（骨髄のファッジ） — https://dujour.com/life/rene-redzeppi-noma-cookbook-work-in-progress/

### Massimo Bottura（マッシモ・ボットゥーラ）— chefSlug: `massimo-bottura`
- [ ] Camouflage（カモフラージュ） — https://reportergourmet.com/en/recipes/180-camouflage-massimo-bottura
- [ ] Modenese Tortellini in Brodo — https://mastermindparis.com/features/massimo-botturas-recipe-for-modenese-tortellini/
- [ ] Paciugo（マスカルポーネとアマレッティの冷菓） — https://www.lacucinaitaliana.com/trends/restaurants-and-chefs/chef-massimo-bottura-kitchen-quarantine-dessert-recipes

### Alain Passard（アラン・パッサール）— chefSlug: `alain-passard`
- [ ] Vinaigrette Aigre-Douce（甘酸っぱいヴィネグレット） — https://lefooding.com/recettes/toquera-035-vinaigrette-aigre-douce-par-alain-passard-l-arpege-paris

### Dominique Crenn（ドミニク・クレン）— chefSlug: `dominique-crenn`
- [ ] Tomato & Basil 3.0 — https://www.cbsnews.com/news/recipe-dominique-crenns-tomato-basil-3-0/
- [ ] Vegan Parmentier of Vegetables — https://womenoftoday.com/dominique-parmentier/
- [ ] Tomato Salad with Crème Fraîche（要URL再確認・403歴あり） — https://guide.michelin.com/en/article/dining-in/sustainable-gastronomy-day-recipe-dominique-crenn

### Grant Achatz（グラント・アカッツ）— chefSlug: `grant-achatz`
- [ ] Roast Mushrooms with Caramelised Fennel, Onions, Eggs and Dates — https://www.gourmettraveller.com.au/recipe/chefs-recipes/grant-achatzs-roast-mushrooms-with-caramelised-fennel-onions-eggs-and-dates-8594/
- [ ] Fennel with Orzo and Olives（要URL再確認） — https://www.chicagomag.com/dining-drinking/september-2017/grant-achatz-dinner-party-recipes/

### Virgilio Martínez（ヴィルヒリオ・マルティネス）— chefSlug: `virgilio-martinez`
- [ ] Baked Empanadas（サルテーニャ） — https://reportergourmet.com/en/news/4491-the-world-s-best-baked-empanadas-virgilio-martinez-s-recipe
- [ ] Pachamanca Broth with Tubers in Huatia — https://www.theworlds50best.com/stories/News/cook-virgilio-martinez-and-pia-leon-dishes-from-central.html

### Carlo Cracco（カルロ・クラッコ）— chefSlug: `carlo-cracco`
- [ ] Orange-Scented Spaghetti with Tomato and Marjoram — https://www.lacucinaitaliana.com/trends/restaurants-and-chefs/chef-carlo-cracco-spaghetti-tomato-sauce
- [ ] Marinated Egg Yolk Tagliolini with White Truffle — https://www.finedininglovers.com/explore/recipes/marinated-egg-yolk-tagliolini-white-truffle-carlo-cracco
- [ ] Ossobuco alla Milanese — https://www.italymagazine.com/featured-story/ossobuco-alla-milanese-chef-cracco

### Quique Dacosta（キケ・ダコスタ）— chefSlug: `quique-dacosta`
- [ ] Arroz con Pimientos（Pebreres Farcides） — https://www.hola.com/cocina/recetas/20220623212416/arroz-con-pimientos-pebreres-farcides-quique-dacosta/
- [ ] Arroz a Banda Socarrat（参考レベル・TV出演デモ） — https://blog.daviddejorge.com/2011/08/29/robinfood-arroz-a-banda-socarrat/

### Alain Ducasse（アラン・デュカス）— chefSlug: `alain-ducasse`
- [ ] Gratinéed French Onion Soup — https://lucylean.com/ducasses-french-onion-soup-recipe/
- [ ] Chocolate Crêpes — https://reportergourmet.com/en/news/7236-the-world-s-most-michelin-starred-chocolate-crepes-alain-ducasse-s-recipe
- [ ] Grenoble-Style Roasted Scallops in Their Shell — https://reportergourmet.com/en/news/6304-how-alain-ducasse-transformed-scallops-into-a-masterpiece-the-original-recipe

### Anne-Sophie Pic（アンヌ＝ソフィー・ピック）— chefSlug: `anne-sophie-pic`
- [ ] Melting Berlingot with Goat Cheese and Spring Watercress — https://reportergourmet.com/en/news/6867-anne-sophie-pic-s-iconic-berlingots-how-to-make-the-worlds-most-starred-chef-s-ravioli

### Pierre Gagnaire（ピエール・ガニェール）— chefSlug: `pierre-gagnaire`
- [ ] Puffed Bread with Mascarpone, Baby Leeks, Spinach Fondue and Truffle Salad — https://www.four-magazine.com/recipes/recipe-by-pierre-gagnaire/
- [ ] Chocolate Soufflé Biscuit — https://www.groupeseb.com/en/news/pierre-gagnaire-offers

### Enrique Olvera（エンリケ・オルベラ）— chefSlug: `enrique-olvera`
- [ ] Banana-Leaf Fish（Empapelado de Pescado） — https://cookswithoutborders.com/banana-leaf-fish
- [ ] Mole Madre / Mole Nuevo — https://www.newworlder.com/mole-madre/

### Martín Berasategui（マルティン・ベラサテギ）— chefSlug: `martin-berasategui`
- [ ] フォアグラのミルフィーユ 燻製うなぎ・アスパラガス・りんご添え — https://www.hogarmania.com/cocina/recetas/aperitivos/milhojas-caramelizado-foie-gras-anguila-41649.html
- [ ] メルルーサとココチャスのタコス ピルピルソース — https://www.hogarmania.com/cocina/recetas/pescados-mariscos/tacos-merluza-kokotxas-37910.html

### Thomas Keller（トーマス・ケラー）— chefSlug: `thomas-keller`
- [ ] Leeks Vinaigrette, Pain de Campagne and Black Winter Truffle Ravigote — https://www.thecaterer.com/products/recipes/recipe-thomas-keller-leeks-vinaigrette

### Eric Ripert（エリック・リペール）— chefSlug: `eric-ripert`
- [ ] Tuna Carpaccio（叩きマグロ） — https://www.ericripert.com/news/blog-post-title-two-e34mr
- [ ] Smoked Salmon Croque Monsieur with Caviar — https://www.cbsnews.com/news/recipe-smoked-salmon-croque-monsieur-with-caviar-le-bernardin/

### Daniel Boulud（ダニエル・ブールー）— chefSlug: `daniel-boulud`
- [ ] Bouillabaisse with Garlic Rouille — https://hauteliving.com/2018/10/chef-daniel-boulud-shares-signature-bouillabaisse-recipe/661327/
- [ ] Gratin Dauphinois — https://tamronhallshow.com/blog/chef-daniel-bouluds-gratin-dauphinois/
- [ ] Madeleines（要URL再確認） — https://www.bonappetit.com/recipe/daniel-bouluds-madeleines

### Atul Kochhar（アトゥル・コチャール）— chefSlug: `atul-kochhar`
- [ ] Tandoori Grilled Lamb Chops with Pomegranate Molasses — https://atulkochhar.com/tandoori-grilled-lamb-chops-recipe/
- [ ] Stargazy Prawn Biryani — https://atulkochhar.com/stargazy-prawn-biryani-indian-recipe-atul-kochhar/
- [ ] Benares Mixed Seafood（Samundari Khazana） — https://www.greatbritishchefs.com/recipes/benares-mixed-seafood-recipe

### David Shim（デイヴィッド・シム）— chefSlug: `david-shim`
- [ ] Galbi（韓国式カルビのマリネ） — https://www.starchefs.com/recipes/galbi
- [ ] Korean Short Rib Skewers（要URL再確認） — https://www.today.com/recipes/korean-short-rib-galbi-skewers-recipe-t286798

### Clare Smyth（クレア・スミス）— chefSlug: `clare-smyth`
- [ ] Pasta "Miller" Style — https://www.jamesmartinchef.co.uk/recipes/clare-smyths-pasta-miller-style/
- [ ] Brill Baked in Seaweed with Clams, Fennel and Coco Beans — https://git.macropus.org/bbc-food/www.bbc.co.uk/food/recipes/brill_baked_in_seaweed_42689.html
- [ ] Artichokes à la Barigoule — https://git.macropus.org/bbc-food/www.bbc.co.uk/food/recipes/artichokesalabarigou_93572.html

### Heston Blumenthal（ヘストン・ブルメンタール）— chefSlug: `heston-blumenthal`
- [ ] Egg Sandwich — https://www.waitrose.com/ecom/recipe/egg-sandwich
- [ ] Rich Chilli Con Carne with Spiced Butter — https://www.lovefood.com/recipes/59512/heston-blumenthals-rich-chilli-con-carne-with-spiced-butter-recipe

### Emma Bengtsson（エマ・ベングトソン）— chefSlug: `emma-bengtsson`
- [ ] Swedish Meatballs — https://www.foodnetwork.com/fnk/recipes/swedish-meatballs-7151608
- [ ] Gravlax-Potato Gratin（Laxpudding） — https://www.foodnetwork.com/fnk/recipes/gravlax-potato-gratin-laxpudding-7151589
- [ ] Gravlax Toast — https://guide.michelin.com/us/en/article/dining-in/chef-emma-bengtsson-gravlax-toast-recipe

### Marcus Wareing（マーカス・ウェアリング）— chefSlug: `marcus-wareing`
- [ ] Barbecue Sauce — https://www.greatbritishchefs.com/recipes/barbecue-sauce-recipe-marcus-wareing
- [ ] White Chocolate and Raspberry Coconut Ice — https://www.greatbritishchefs.com/recipes/coconut-ice-recipe
- [ ] Manchester Tart — https://www.greatbritishchefs.com/recipes/manchester-tart-recipe

### Nathan Outlaw（ネイサン・アウトロウ）— chefSlug: `nathan-outlaw`
- [ ] Grilled Bream with Mustard and Tarragon Sauce — https://www.greatbritishchefs.com/recipes/grilled-bream-mustard-tarragon-sauce
- [ ] Fish and Chips with Tartare Sauce — https://www.greatbritishchefs.com/recipes/fish-and-chips-recipe-tartare-sauce
- [ ] Pear Tart and Earl Grey Tea Ice Cream（参考レベル） — https://www.greatbritishchefs.com/recipes/pear-tart-recipe

---

候補なし: José Avillez（著書のみ、無料公開レシピ未発見）、Chen Yong-hua（既存の滷肉飯以外未発見）
