import { Technique } from '@/types/technique';

export const techniques: Technique[] = [
  {
    slug: 'pasta-water-emulsification',
    title: 'パスタの茹で汁で乳化させる方法（ソースがまとまらない人へ）',
    shortTitle: 'パスタの茹で汁で乳化させる',
    description:
      'カルボナーラやカチョエペペのソースが分離してしまう、油っぽくなってしまう——その原因の多くは「乳化」がうまくいっていないことにあります。パスタの茹で汁に含まれるでんぷんが水と油を橋渡しし、なめらかなソースを作ってくれます。このテクニックひとつで、ローマの定番パスタからボンゴレまで、幅広いレシピの仕上がりが劇的に変わります。',
    categoryLabel: 'パスタの基本技術',
    image: 'https://images.unsplash.com/photo-1602738111450-ca565706aab5?w=1200&q=80',
    steps: [
      {
        step: 1,
        text: 'パスタを茹でる湯には、パスタの重量に対して十分な塩を加える。茹で汁はソースの一部になるので、しょっぱすぎない程度にしっかり効かせる。',
      },
      {
        step: 2,
        text: '茹で上がる1〜2分前に、茹で汁をお玉で50ml程度すくって取っておく。',
        tip: '茹で上がってから慌てて汲むと、必要な分量を確保し損ねることがあります。早めに確保しておきましょう。',
      },
      {
        step: 3,
        text: 'フライパンにソースの材料（オイル・チーズ・卵など）を用意し、茹で汁を大さじ1〜2ずつ少しずつ加えながら混ぜる。',
      },
      {
        step: 4,
        text: '茹で汁を加えるたびにフライパンを揺するか、トングでパスタを持ち上げて空気を含ませるように混ぜ合わせる。',
        tip: '一気に全部の茹で汁を加えると乳化せずに水っぽくなるだけなので、必ず少量ずつ加えるのがポイントです。',
      },
      {
        step: 5,
        text: 'ソースが白濁し、とろみがついてパスタによく絡むようになったら乳化完了のサイン。仕上げにチーズや胡椒を加えて味を調える。',
      },
    ],
    commonMistakes: [
      '茹で汁を入れずに水道水を使ってしまう（でんぷんが入っていないため乳化しない）',
      '茹で汁を一度に大量に加えてしまい、ソースがシャバシャバになる',
      '火を止めずに卵を使うソース（カルボナーラ等）に強火のまま加えて卵が固まってしまう',
      'ソースを作る前に茹で汁を取り忘れ、パスタの湯をすべて捨ててしまう',
    ],
    relatedRecipeSlugs: [
      'roman-carbonara',
      'amatriciana',
      'cacio-e-pepe',
      'pasta-alla-norma',
      'pesto-pasta',
      'spaghetti-aglio-olio-peperoncino',
      'spaghetti-alle-vongole',
      'pasta-al-limone',
      'orecchiette-con-cime-di-rapa',
      'bucatini-all-amatriciana',
      'spaghetti-alla-puttanesca',
      'trofie-al-pesto-genovese',
      'rigatoni-alla-vodka',
      'fettuccine-alfredo',
      'spaghetti-alla-nerano',
      'pasta-alla-norcina',
      'spaghetti-alla-carrettiera',
      'spaghetti-alle-cozze',
    ],
    publishedAt: '2026-07-05',
    faqs: [
      {
        question: 'なぜ茹で汁で「乳化」できるのですか？',
        answer:
          'パスタの茹で汁にはパスタから溶け出したでんぷんが含まれています。でんぷんは水にも油にも馴染む性質を持つため、本来混ざり合わない水分と油分を橋渡しし、なめらかなソースにまとめてくれます。',
      },
      {
        question: '茹で汁を取り忘れた場合はどうすればいいですか？',
        answer:
          '片栗粉や小麦粉を少量の水で溶いたものをごく少量加えると近い効果が得られますが、風味は本来の茹で汁に劣ります。次回は茹で上がる前に必ず確保しておきましょう。',
      },
      {
        question: '乳化がうまくいっているかはどう判断すればいいですか？',
        answer:
          'ソースの色が白っぽく濁り、とろみがついてパスタ全体をコーティングするようになれば成功です。分離して水っぽいままの場合は、茹で汁を少しずつ追加しながら手早く混ぜ続けてください。',
      },
    ],
  },
  {
    slug: 'egg-white-meringue',
    title: '卵白の泡立て方（メレンゲの作り方と分離させないコツ）',
    shortTitle: '卵白の泡立て方（メレンゲ）',
    description:
      'スフレやマカロン、ティラミスなど、ふわりと軽い食感を生み出す鍵は卵白の泡立て方にあります。泡立てが甘いと生地が膨らまず、泡立てすぎると分離してボソボソになってしまう——絶妙なタイミングを見極めるコツを解説します。',
    categoryLabel: '製菓の基本技術',
    image: 'https://images.unsplash.com/photo-1771795533816-d2da398b1e9f?w=1200&q=80',
    steps: [
      {
        step: 1,
        text: 'ボウルと泡立て器は油分・水分が残っていないか確認する。卵白は卵黄が一切混ざらないよう丁寧に分ける。',
        tip: 'わずかでも油分や卵黄が混ざると、卵白のたんぱく質がうまく泡立たなくなります。',
      },
      {
        step: 2,
        text: '卵白を低速〜中速で泡立て、全体が白っぽく細かい泡になるまで攪拌する。',
      },
      {
        step: 3,
        text: '砂糖を使うレシピの場合、この段階で少量ずつ数回に分けて加える。一度に加えると泡立ちが悪くなる。',
      },
      {
        step: 4,
        text: '泡立て器を持ち上げたときに角がゆっくり倒れる「ソフトピーク」、角がピンと立つ「ハードピーク」など、レシピが指定する状態まで泡立てる。',
        tip: 'スフレはやや柔らかめのしっかりしたピーク、マカロンはハードピークが目安です。泡立てすぎるとパサついて分離するので、状態をこまめに確認しましょう。',
      },
      {
        step: 5,
        text: '泡立てたメレンゲをベースの生地に加える際は、泡を潰さないようゴムベラで底からすくうように優しく折り込む。',
        tip: '混ぜすぎると気泡が潰れて生地がしぼみます。加える回数は2〜3回に分け、粉っぽさが消えたらすぐに止めるのがコツです。',
      },
    ],
    commonMistakes: [
      'ボウルに油分や水分が残っていて泡立ちが悪くなる',
      '卵黄がわずかに混ざり、卵白が十分に泡立たない',
      '砂糖を一度に全部加えてしまい、泡立ちの進行が遅くなる',
      '生地に混ぜ込む際にぐるぐると強く混ぜてしまい、気泡が潰れて膨らまなくなる',
    ],
    relatedRecipeSlugs: [
      'tiramisu',
      'macarons',
      'mont-blanc',
      'tarte-au-citron',
      'souffle-au-chocolat',
    ],
    publishedAt: '2026-07-05',
    faqs: [
      {
        question: 'ソフトピークとハードピークの見分け方は？',
        answer:
          '泡立て器を持ち上げたとき、角の先端がゆっくりお辞儀するように倒れるのがソフトピーク、角がピンと立ったまま形を保つのがハードピークです。レシピに指定がある場合はその状態を目安にしてください。',
      },
      {
        question: '卵白が泡立たない・分離してしまう原因は？',
        answer:
          'ボウルや泡立て器に油分・水分が残っている、卵白に卵黄が混ざっている、泡立てすぎているなどが主な原因です。道具は洗浄後によく拭き取り、卵は冷蔵庫から出したてより室温に近いほうが泡立ちやすくなります。',
      },
      {
        question: 'メレンゲを生地に混ぜるときのコツは？',
        answer:
          'ゴムベラで底からすくい上げるように「切るように」混ぜるのがポイントです。ぐるぐると円を描くように混ぜると気泡が潰れてしまうので注意してください。',
      },
    ],
  },
  {
    slug: 'maillard-searing',
    title: '焼き色をつける方法（メイラード反応でうま味を引き出すコツ）',
    shortTitle: '焼き色をつける（メイラード反応）',
    description:
      '肉や野菜をこんがりと焼いたときの香ばしい風味と茶色い焼き色は「メイラード反応」と呼ばれる化学反応によるものです。煮込み料理の下ごしらえからステーキ、餃子の焼き目まで、世界中の料理で使われる最も基本的で重要なテクニックのひとつ。ちょっとした違いで料理の完成度が大きく変わります。',
    categoryLabel: '万能の基本技術',
    image: 'https://images.unsplash.com/photo-1579636858731-24857b3f4305?w=1200&q=80',
    steps: [
      {
        step: 1,
        text: '焼く前に食材の表面の水分をキッチンペーパーでしっかり拭き取る。',
        tip: '表面が濡れていると、焼くというより「蒸す」状態になってしまい、焼き色がつきにくくなります。',
      },
      {
        step: 2,
        text: 'フライパンを煙が立つ手前まで十分に熱してから、油を入れる。',
      },
      {
        step: 3,
        text: '食材を入れたら、すぐに動かさずに焼き面がしっかり色づくまで触らずに待つ。',
        tip: '早く裏返したくなりますが、焼き色がつく前に動かすと表面がくっついたり、色ムラの原因になります。',
      },
      {
        step: 4,
        text: 'フライパンに食材を詰め込みすぎない。隙間を空けて並べ、蒸気がこもらないようにする。',
        tip: '一度にたくさん焼こうとすると温度が下がり、焼き色がつく前に水分が出てきてしまいます。数回に分けて焼くほうが結果的に早く仕上がります。',
      },
      {
        step: 5,
        text: 'こんがりとした焼き色（濃い茶色）がついたら裏返し、反対側も同様に焼く。煮込み料理の場合はここでできた「焼き汁（フォン）」も旨味として活用する。',
      },
    ],
    commonMistakes: [
      '表面の水分を拭かずに焼き始めてしまう',
      'フライパンが十分に熱くないうちに食材を入れてしまう',
      '焼き色がつく前に何度もひっくり返してしまう',
      '一度にたくさんの量を詰め込みすぎて温度が下がってしまう',
    ],
    relatedRecipeSlugs: [
      'boeuf-bourguignon',
      'smash-burger',
      'beef-wellington',
      'turkish-moussaka',
      'osso-buco',
      'swedish-meatballs',
      'coq-au-vin',
      'paella-valenciana',
      'butter-chicken',
      'redzepi-lamb-shank-beetroot-elderflower',
      'gordon-ramsay-roast-beef',
      'imam-bayildi',
      'lomo-saltado',
      'chicken-fricassee',
      'braised-beef-short-ribs',
      'palak-paneer',
      'mushroom-risotto',
      'gordon-ramsay-scallops',
      'frikadeller',
      'lasagna-bolognese',
      'abbacchio-alla-romana',
      'acqua-pazza',
      'albondigas',
      'empanada-gallega',
      'pimientos-de-padron',
      'rabbit-stew-berasategui',
      'olive-allascolana',
      'french-onion-soup',
      'pappardelle-al-cinghiale',
      'lobiani',
      'chakhokhbili',
      'shkmeruli',
      'kalua-pork',
      'loco-moco',
      'egyptian-moussaka',
      'san-bei-ji',
      'bastilla',
      'arroz-con-pollo-peruano',
      'hui-guo-rou',
      'hong-shao-rou',
      'cassoulet',
      'tartiflette',
      'blanquette-de-veau',
      'beef-and-broccoli',
    ],
    publishedAt: '2026-07-05',
    faqs: [
      {
        question: 'メイラード反応とは何ですか？',
        answer:
          'たんぱく質と糖が加熱によって反応し、茶色い色素と香ばしい香り成分を生み出す化学反応です。肉や野菜、パンなどを焼いたときの「こんがりした風味」の正体で、100℃以上の高温でよく進みます。',
      },
      {
        question: 'テフロン加工のフライパンでも焼き色はつきますか？',
        answer:
          'つきますが、鉄製やステンレス製のフライパンのほうがより高温を保ちやすく、しっかりとした焼き色をつけやすい傾向があります。',
      },
      {
        question: '煮込み料理でも焼き色をつける意味はありますか？',
        answer:
          'あります。煮込む前に肉の表面を焼き固めることで、旨味を閉じ込めると同時に、焼き汁（フォン）がソースの深いコクのもとになります。',
      },
    ],
  },
  {
    slug: 'water-bath-temperature-control',
    title: '湯煎・低温調理で温度を安定させる方法（す・分離を防ぐコツ）',
    shortTitle: '湯煎・低温調理で温度管理',
    description:
      'クレームブリュレやフラン、なめらかなチョコレートケーキ——これらの繊細なお菓子は、直接の高温にさらすと「す」が入ったり分離したりしてしまいます。湯煎（ウォーターバス）を使うことで、オーブンの熱を和らげ、じっくりと均一に火を通すことができます。',
    categoryLabel: '製菓・低温調理の基本技術',
    image: 'https://images.unsplash.com/photo-1618889500097-8c4d32ff7cff?w=1200&q=80',
    steps: [
      {
        step: 1,
        text: '耐熱の型に生地やカスタード液を流し入れ、深さのある天板やバットに並べる。',
      },
      {
        step: 2,
        text: '天板に型の高さの半分〜3分の2程度まで、沸騰したお湯を注ぐ。',
        tip: 'お湯の量が少なすぎると保温効果が弱くなり、多すぎると型の中に水が入る危険があります。',
      },
      {
        step: 3,
        text: 'オーブンに入れ、レシピが指定する低め〜中程度の温度でじっくり焼く（多くの場合140〜160℃程度）。',
      },
      {
        step: 4,
        text: '中心が軽く揺れる程度（プルプルとした半熟状態）で焼き上がりの目安とする。焼きすぎると「す」が入る原因になる。',
        tip: '中心まで完全に固まるまで焼くと加熱しすぎです。余熱で火が入るので、少し早めに取り出しましょう。',
      },
      {
        step: 5,
        text: 'オーブンから取り出し、湯煎のお湯から型を上げて粗熱を取ってから冷蔵庫でしっかり冷やす。',
      },
    ],
    commonMistakes: [
      'お湯の温度が低い状態（水道水のまま）で始めてしまう',
      '天板にお湯を入れずに直接オーブンで焼いてしまい、表面にすが入る',
      '完全に固まるまで焼いてしまい、なめらかさが失われる',
      '型に流し込む前に生地の気泡を取り除かず、焼き上がりに穴が残る',
    ],
    relatedRecipeSlugs: [
      'creme-brulee',
      'redzepi-potato-crisps-chocolate',
      'redzepi-lamb-shank-beetroot-elderflower',
      'eggs-benedict',
      'lampredotto',
      'gateau-au-chocolat',
      'carnitas',
      'chocolate-brownie',
      'taiwanese-castella-cake',
      'banh-flan',
      'pierre-gagnaire-chicken-cream',
      'chocolate-eclairs',
      'cioccolato-salami',
    ],
    publishedAt: '2026-07-05',
    faqs: [
      {
        question: '湯煎焼きの「す」はなぜできるのですか？',
        answer:
          '卵料理やカスタードを高温で急激に加熱すると、たんぱく質が過剰に収縮して細かい気泡が生地の中に残ります。これが「す」の正体です。湯煎でゆっくり均一に加熱することで防げます。',
      },
      {
        question: 'お湯はどのくらいの温度で入れればいいですか？',
        answer:
          '沸騰したての熱いお湯を使ってください。ぬるいお湯だと型全体の温度が上がるまでに時間がかかり、焼きムラの原因になります。',
      },
      {
        question: '湯煎に使う型からお湯が入ってしまいそうで心配です。',
        answer:
          '型とオーブン天板の高さに余裕を持たせ、お湯は型の高さの半分程度を目安に注ぐと安心です。アルミホイルで型の周りを覆う方法も有効です。',
      },
    ],
  },
  {
    slug: 'resting-dough',
    title: '生地を寝かせる理由（グルテンを落ち着かせて扱いやすくするコツ）',
    shortTitle: '生地を寝かせる（グルテンを休ませる）',
    description:
      'こねた生地をすぐに伸ばそうとすると、縮んでしまったり破れやすくなったりします。生地を冷蔵庫でしばらく休ませることで、こねる際にできたグルテンの緊張がゆるみ、扱いやすく、焼き上がりも均一になります。クレープからピザ生地まで、幅広い料理に共通する基本テクニックです。',
    categoryLabel: '製パン・製菓の基本技術',
    image: 'https://images.unsplash.com/photo-1754149155720-d06e44a4b033?w=1200&q=80',
    steps: [
      {
        step: 1,
        text: '生地をこね終えたら、表面が乾かないようにラップでぴったりと包む、または濡れ布巾をかける。',
      },
      {
        step: 2,
        text: 'レシピが指定する時間、冷蔵庫（または常温）で休ませる。目安は30分〜ひと晩程度。',
        tip: '長く休ませるほどグルテンが落ち着き、風味も増す傾向がありますが、発酵を伴う生地は過発酵に注意してください。',
      },
      {
        step: 3,
        text: '休ませている間に生地に含まれるでんぷんが水分を吸収し、全体がなじんでべたつきにくくなる。',
      },
      {
        step: 4,
        text: '使う直前に冷蔵庫から出し、必要であれば常温に少し戻してから伸ばしたり成形したりする。',
        tip: '冷えたまま伸ばそうとすると生地が硬く、ひび割れの原因になります。少し常温に戻すと格段に伸ばしやすくなります。',
      },
      {
        step: 5,
        text: '伸ばす際に生地が縮んでくる場合は、無理に伸ばさず数分置いてから再度伸ばすとうまくいく。',
      },
    ],
    commonMistakes: [
      'こねた直後にすぐ伸ばそうとして生地が縮んでしまう',
      'ラップをせずに乾燥させてしまい、表面が硬くなる',
      '休ませすぎて発酵生地が過発酵になってしまう',
      '冷え切った生地をそのまま無理に伸ばして破れさせてしまう',
    ],
    relatedRecipeSlugs: [
      'scones',
      'crepes',
      'baklava',
      'danish-pastry',
      'hotteok',
      'mille-crepe-cake',
      'banh-xeo',
      'new-york-style-pizza',
    ],
    publishedAt: '2026-07-05',
    faqs: [
      {
        question: 'なぜ生地を休ませるとグルテンが落ち着くのですか？',
        answer:
          'こねている間に小麦粉のグルテンというたんぱく質が絡み合い、生地に弾力と張りが生まれます。時間を置くことでこの絡み合いが緩やかにほどけ、伸ばしやすくなります。',
      },
      {
        question: '休ませる時間はどのくらいが目安ですか？',
        answer:
          'レシピにより異なりますが、クレープ生地なら30分程度、パイ生地やピザ生地は1時間〜ひと晩が目安です。長く休ませるほど扱いやすく、風味も増す傾向があります。',
      },
      {
        question: '休ませずに作るとどうなりますか？',
        answer:
          '生地が縮んで思うように伸ばせなかったり、焼いたときに硬く仕上がったりします。特にパイ生地やピザ生地では食感に大きく影響します。',
      },
    ],
  },
  {
    slug: 'making-a-roux',
    title: 'ルーの作り方（バターと小麦粉でとろみソースの土台を作る）',
    shortTitle: 'ルーでとろみをつける',
    description:
      'バターと小麦粉を炒め合わせた「ルー」は、フランス料理のブランケットからスペインのクロケッタ、アメリカ南部のガンボまで、世界中のとろみソースの土台になる万能テクニックです。焦げやダマに注意しながら、なめらかなソースを作るコツを解説します。',
    categoryLabel: 'ソースの基本技術',
    image: 'https://images.unsplash.com/photo-1637194502327-c99c94943680?w=1200&q=80',
    steps: [
      {
        step: 1,
        text: '鍋にバターを入れて弱火〜中火で溶かす。',
      },
      {
        step: 2,
        text: 'バターと同量程度の小麦粉を加え、木べらで絶えず混ぜながら炒める。',
        tip: 'バターと小麦粉の比率は1:1が基本です。まずはこの黄金比を覚えましょう。',
      },
      {
        step: 3,
        text: 'レシピが指定する色（白いまま・薄いきつね色・茶色など）になるまで、焦がさないように弱火でじっくり炒める。',
        tip: '色が濃いルーほど香ばしさが増しますが、とろみをつける力は弱くなります。ガンボなど茶色いルーは特に焦げやすいので目を離さないでください。',
      },
      {
        step: 4,
        text: '温めた出汁や牛乳を少しずつ加え、その都度よく混ぜてダマにならないようにのばしていく。',
        tip: '冷たい液体を一気に加えるとダマになりやすいので、温めた液体を少量ずつ加えるのが鉄則です。',
      },
      {
        step: 5,
        text: '全体がなめらかになったら弱火で数分煮込み、とろみと粉っぽさが消えたことを確認して味を調える。',
      },
    ],
    commonMistakes: [
      'バターと小麦粉の比率が合っておらず、とろみがつかない、またはつきすぎる',
      '強火で炒めて焦がしてしまう',
      '冷たい液体を一気に加えてダマになる',
      '粉っぽさが残ったまま加熱を止めてしまう',
    ],
    relatedRecipeSlugs: [
      'croquetas-de-jamon',
      'gumbo',
      'loco-moco',
      'blanquette-de-veau',
    ],
    publishedAt: '2026-07-05',
    faqs: [
      {
        question: 'ルーの色はどう選べばいいですか？',
        answer:
          '白いルーはベシャメルソースなど繊細な味わいに、茶色いルーはガンボのようにナッツのような香ばしさとコクを出したい料理に向いています。レシピの指定に従いましょう。',
      },
      {
        question: 'ダマになってしまった場合はどうすればいいですか？',
        answer:
          '泡立て器でしっかり混ぜるか、目の細かいザルで漉すことである程度改善できます。次回からは液体を少量ずつ、温めた状態で加えるようにしてください。',
      },
      {
        question: 'ルーは事前に作り置きできますか？',
        answer:
          'はい、冷蔵で数日、冷凍でも保存可能です。使うときに少量の出汁や牛乳でのばしながら温め直してください。',
      },
    ],
  },
  {
    slug: 'deep-frying-oil-temperature',
    title: '揚げ油の温度管理（べちゃっとしない・油っぽくならないコツ）',
    shortTitle: '揚げ油の温度管理',
    description:
      'フィッシュ・アンド・チップスから北京ダック、チュロスまで、世界中の揚げ物料理に共通するのが「油の温度管理」です。温度が低すぎると衣に油を吸ってべちゃっとし、高すぎると中が生焼けのまま表面だけ焦げてしまいます。温度計に頼らなくても判断できるコツも紹介します。',
    categoryLabel: '揚げ物の基本技術',
    image: 'https://images.unsplash.com/photo-1518207429941-5b17e09f4d86?w=1200&q=80',
    steps: [
      {
        step: 1,
        text: '揚げ油をレシピが指定する温度（多くは160〜180℃）まで、油温計を使ってしっかり温める。',
        tip: '温度計がない場合は、菜箸を油に入れて細かい泡が全体から勢いよく出るかどうかで目安を判断できます。',
      },
      {
        step: 2,
        text: '食材は油の量に対して詰め込みすぎず、数回に分けて揚げる。',
        tip: '一度に大量の食材を入れると油の温度が急激に下がり、衣に油を吸い込んでべちゃっとした仕上がりになります。',
      },
      {
        step: 3,
        text: '二度揚げが指定されているレシピでは、1回目は低めの温度でじっくり中まで火を通し、2回目は高温で表面だけを短時間でカリッと仕上げる。',
      },
      {
        step: 4,
        text: '揚げている間は油の温度をこまめに確認し、下がってきたら火力を上げて調整する。',
      },
      {
        step: 5,
        text: '揚げ上がったら油をよく切り、網やキッチンペーパーの上で余分な油を落とす。',
        tip: '揚げたてをそのまま重ねて置くと、蒸気がこもって衣がしんなりしてしまいます。網の上に並べて蒸気を逃がしましょう。',
      },
    ],
    commonMistakes: [
      '油の温度が十分に上がる前に食材を入れてしまう',
      '一度にたくさんの食材を入れて温度が急降下する',
      '揚げ上がった食材をキッチンペーパーで包んでしまい、蒸気で衣がしんなりする',
      '温度計がないからと勘だけで判断し、中が生焼けのまま仕上げてしまう',
    ],
    relatedRecipeSlugs: [
      'tortilla-espanola',
      'turkish-moussaka',
      'fish-and-chips',
      'buffalo-wings',
      'khao-soi',
      'samosa',
      'redzepi-potato-crisps-chocolate',
      'bottura-five-ages-parmigiano',
      'virgilio-sea-bass-ceviche-leche-de-tigre',
      'quiche-lorraine',
      'gordon-ramsay-roast-beef',
      'gambas-al-ajillo',
      'churros',
      'sticky-toffee-pudding',
      'croquetas-de-jamon',
      'patatas-bravas',
      'achatz-lamb-herbed-breadcrumb-crust',
      'gateau-au-chocolat',
      'gratin-dauphinois',
      'olive-allascolana',
      'chocolate-brownie',
      'prinsesstarta',
      'knackebrod',
      'galette-bretonne',
      'paris-brest',
      'taiwanese-castella-cake',
      'shakshuka',
      'bun-cha',
      'dan-dan-noodles',
      'moussaka',
      'arroz-de-pato',
      'knafeh',
      'egyptian-moussaka',
      'malai-kofta',
      'taiwanese-fried-chicken',
      'alain-ducasse-rum-baba',
      'anne-sophie-pic-white-millefeuille',
      'pierre-gagnaire-vanilla-millefeuille',
      'bastilla',
      'sfenj',
      'picarones',
      'cannoli-siciliani',
      'zuccotto',
      'apple-crisp',
      'peking-duck',
      'sweet-and-sour-pork',
      'tartiflette',
      'thomas-keller-buttermilk-fried-chicken',
      'souffle-au-chocolat',
      'general-tsos-chicken',
    ],
    publishedAt: '2026-07-05',
    faqs: [
      {
        question: '温度計がない場合、油の温度はどう判断すればいいですか？',
        answer:
          '乾いた菜箸や木べらの先を油に入れ、細かい泡が勢いよく全体から出れば170℃前後の目安になります。衣を少量落として、すぐに浮き上がってくれば適温です。',
      },
      {
        question: '二度揚げはなぜ必要なのですか？',
        answer:
          '1回目の低めの温度で中までじっくり火を通し、2回目の高温で表面の水分を飛ばしてカリッとさせるためです。冷めても衣がベタつきにくくなる効果もあります。',
      },
      {
        question: '揚げ油は何回まで使い回せますか？',
        answer:
          '揚げる食材や油の状態にもよりますが、色が濃くなったり煙が出やすくなったりしたら交換の目安です。使用後はしっかり濾して保存してください。',
      },
    ],
  },
  {
    slug: 'resting-meat-after-cooking',
    title: '肉を切る前に休ませる理由（肉汁を逃さないコツ）',
    shortTitle: '肉を切る前に休ませる（レスティング）',
    description:
      '焼き上がった肉をすぐに切ると、断面から肉汁が一気に流れ出てパサついた仕上がりになってしまいます。数分間休ませることで肉汁が全体に落ち着き、ジューシーな状態を保てます。ローストビーフからステーキまで、切る直前のひと手間が仕上がりを左右します。',
    categoryLabel: '肉料理の基本技術',
    image: 'https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=1200&q=80',
    steps: [
      {
        step: 1,
        text: '肉を焼き上げたら、まな板やバットの上に取り出す。',
      },
      {
        step: 2,
        text: 'アルミホイルを軽くかぶせ、密閉しすぎないようふんわりと覆う。',
        tip: 'ぴったり密閉すると蒸気がこもり、せっかくの焼き上げた表面がしんなりしてしまいます。',
      },
      {
        step: 3,
        text: '肉の大きさに応じて5〜20分程度休ませる。塊肉ほど長めに休ませる。',
      },
      {
        step: 4,
        text: '休ませている間に肉の内部温度が均一になり、加熱で外側に押し出された肉汁が全体に再び行き渡る。',
      },
      {
        step: 5,
        text: '休ませ終えたら、繊維を断ち切る方向に包丁を入れて切り分ける。',
        tip: '肉の繊維に沿って切ると硬く感じやすいので、繊維を断ち切るように切ると柔らかく感じられます。',
      },
    ],
    commonMistakes: [
      '焼き上がってすぐに切ってしまい、肉汁がまな板に流れ出てパサつく',
      'アルミホイルで密閉しすぎて、カリッと焼いた表面がふやける',
      '塊肉を薄切り肉と同じ短い時間しか休ませない',
      '休ませすぎて肉が冷めきってしまう',
    ],
    relatedRecipeSlugs: [
      'beef-wellington',
      'sis-kebabi',
      'gordon-ramsay-roast-beef',
      'porchetta',
      'braised-beef-short-ribs',
      'achatz-lamb-herbed-breadcrumb-crust',
      'lasagna-bolognese',
      'gratin-dauphinois',
      'chiles-rellenos',
      'naan',
      'char-siu',
      'souvlaki',
      'taiwanese-pineapple-cake',
      'cioccolato-salami',
      'peking-duck',
      'daniel-boulud-loup-de-mer',
      'steak-au-poivre',
    ],
    publishedAt: '2026-07-05',
    faqs: [
      {
        question: 'なぜ休ませると肉汁が逃げにくくなるのですか？',
        answer:
          '加熱直後は肉の内部の水分（肉汁）が中心に向かって圧縮された状態です。休ませることでこの圧力が均一に分散し、切ったときに流れ出る肉汁の量が減ります。',
      },
      {
        question: '休ませる時間はどのくらいが目安ですか？',
        answer:
          '薄いステーキなら5分程度、ローストビーフのような塊肉なら15〜20分が目安です。肉の厚みに比例して長めに休ませてください。',
      },
      {
        question: '休ませている間に肉が冷めてしまいませんか？',
        answer:
          'ふんわりとアルミホイルをかぶせることである程度保温できます。多少温度は下がりますが、切ったときのジューシーさを優先する価値は十分にあります。',
      },
    ],
  },
  {
    slug: 'marinating-meat-and-fish',
    title: 'マリネ・漬け込みで下味をつける方法（味を染み込ませるコツ）',
    shortTitle: 'マリネ・漬け込みで下味をつける',
    description:
      '肉や魚を漬け込み液に浸すことで、味を染み込ませるだけでなく、酸や酵素の力で身を柔らかくする効果もあります。タンドリーチキンのヨーグルトマリネからセビーチェの「酸で火を通す」調理法まで、漬け込みの原理と時間の目安を解説します。',
    categoryLabel: '下ごしらえの基本技術',
    image: 'https://images.unsplash.com/photo-1565134367533-60a8ee591cbd?w=1200&q=80',
    steps: [
      {
        step: 1,
        text: '漬け込み液（酸・油・塩・香辛料など）を、材料や料理に合わせて用意する。',
      },
      {
        step: 2,
        text: '肉や魚の表面の水分を軽く拭き取ってから、漬け込み液に浸す。',
        tip: '水分が残ったままだと漬け込み液が薄まり、味が入りにくくなります。',
      },
      {
        step: 3,
        text: '食材の厚みや種類に応じて漬け込み時間を調整する。魚介は短時間（数分〜30分程度）、肉の塊は長時間（数時間〜一晩）が目安。',
      },
      {
        step: 4,
        text: '冷蔵庫で漬け込み、時々上下を返して全体に均一に浸るようにする。',
        tip: '常温で漬け込むと食中毒のリスクが高まるため、必ず冷蔵庫で行ってください。',
      },
      {
        step: 5,
        text: '漬け込みすぎに注意し、指定の時間が来たら取り出して調理に移る。',
      },
    ],
    commonMistakes: [
      '酸が強い漬け込み液（柑橘・酢など）に長時間浸しすぎて、身がパサパサ・スカスカになる',
      '常温で漬け込んでしまい、食中毒のリスクが高まる',
      '漬け込み液の塩分・酸味の効かせ具合を確認せず、味が入りすぎる、または入らない',
      '漬け込み液を再利用して生食用のソースにしてしまう（加熱が必要）',
    ],
    relatedRecipeSlugs: [
      'duck-confit',
      'tandoori-chicken',
      'coq-au-vin',
      'pickled-herring',
      'lamb-chops',
      'sis-kebabi',
      'virgilio-sea-bass-ceviche-leche-de-tigre',
      'gai-yang',
      'tacos-al-pastor',
      'aguachile',
      'cochinita-pibil',
      'souvlaki',
      'taiwanese-fried-chicken',
      'anticuchos',
      'thomas-keller-buttermilk-fried-chicken',
    ],
    publishedAt: '2026-07-05',
    faqs: [
      {
        question: '漬け込み時間はどのくらいが目安ですか？',
        answer:
          '魚介など身が薄いものは数分〜30分程度、鶏肉は数時間、塊肉は一晩が目安です。酸が強い漬け込み液は長時間浸すと身が締まりすぎるので注意してください。',
      },
      {
        question: 'ヨーグルトで漬け込むメリットは何ですか？',
        answer:
          'ヨーグルトの乳酸と酵素が肉のたんぱく質をやさしく分解し、しっとり柔らかく仕上げてくれます。タンドリーチキンなどインド料理でよく使われる手法です。',
      },
      {
        question: '漬け込み液は使い回せますか？',
        answer:
          '生の肉や魚に使った漬け込み液は雑菌が繁殖している可能性があるため、そのままソースとして使うのは避け、必ず加熱してから使用してください。',
      },
    ],
  },
  {
    slug: 'tempering-spices',
    title: 'スパイスをテンパリングする方法（油で香りを引き出すコツ）',
    shortTitle: 'スパイスをテンパリング',
    description:
      'ホールスパイスを油で加熱すると、水に溶けにくい香り成分が油に溶け出し、料理全体に香りが行き渡ります。インド料理の「タルカ」をはじめ、香辛料を使う料理で香りを最大限に引き出すための基本テクニックです。',
    categoryLabel: 'スパイス使いの基本技術',
    image: 'https://images.unsplash.com/photo-1598259065881-8a65b97d50fb?w=1200&q=80',
    steps: [
      {
        step: 1,
        text: '使うホールスパイス（クミンシード、マスタードシード、カルダモンなど）を計量しておく。',
      },
      {
        step: 2,
        text: '鍋やフライパンに油（またはギー）を入れ、中火で熱する。',
      },
      {
        step: 3,
        text: '油が十分に温まったらホールスパイスを加え、香りが立つまで数十秒炒める。',
        tip: 'スパイスは焦げやすいので、目を離さずこまめに鍋を揺すりながら加熱してください。',
      },
      {
        step: 4,
        text: 'パチパチとはじける音がしてスパイスの色が変わり始めたら、香りが十分に出たサイン。',
      },
      {
        step: 5,
        text: 'すぐに他の材料（玉ねぎやスパイスパウダー、煮込み料理など）を加えて、続けて調理する。',
        tip: '香りが立った状態で放置すると焦げて苦味が出るので、テンパリングが終わったらすぐ次の工程に移りましょう。',
      },
    ],
    commonMistakes: [
      '油が十分に温まる前にスパイスを入れてしまい、香りが十分に引き出せない',
      '強火のまま目を離してスパイスを焦がしてしまう',
      'テンパリング後にそのまま放置し、苦味が出てしまう',
      'パウダースパイスとホールスパイスを同じタイミングで加えてしまい、パウダーだけ焦げる',
    ],
    relatedRecipeSlugs: [
      'swedish-meatballs',
      'dum-biryani',
      'samosa',
      'redzepi-potato-crisps-chocolate',
      'dal-tadka',
      'palak-paneer',
      'massaman-curry',
      'paris-brest',
      'zuppa-inglese',
      'dubai-chocolate-bar',
    ],
    publishedAt: '2026-07-05',
    faqs: [
      {
        question: 'テンパリングとは何ですか？',
        answer:
          'ホールスパイスを油で加熱し、水に溶けにくい香り成分を油に移して料理全体に香りを行き渡らせる調理技術です。インド料理では「タルカ」または「チョーンク」と呼ばれます。',
      },
      {
        question: 'ホールスパイスがない場合はパウダースパイスで代用できますか？',
        answer:
          '代用は可能ですが、パウダースパイスは焦げやすいため、油の温度を少し低めにして手早く炒めるようにしてください。ホールスパイスに比べて香りの立ち方は穏やかになります。',
      },
      {
        question: 'テンパリングはどのタイミングで行うのが良いですか？',
        answer:
          '料理の最初（玉ねぎなどを炒める前）に行う方法と、仕上げに別鍋で作ったテンパリングオイルを最後にかける方法があります。レシピの指定に従ってください。',
      },
    ],
  },
  {
    slug: 'soffritto-mirepoix',
    title: 'ソフリット・ミルポワとは？煮込み料理の土台を作る黄金比',
    shortTitle: 'ソフリット・ミルポワ（香味野菜の黄金比）',
    description:
      'ボブルギニョンにもボロネーゼにも共通して登場する、玉ねぎ・にんじん・セロリのみじん切り。イタリアでは「ソフリット」、フランスでは「ミルポワ」と呼ばれるこの黄金比が、煮込み料理の味の土台を決めています。',
    categoryLabel: '煮込み料理の基本技術',
    image: 'https://images.unsplash.com/photo-1562753504-7f98abff6c5a?w=1200&q=80',
    steps: [
      {
        step: 1,
        text: '玉ねぎ・にんじん・セロリを、それぞれ同じくらいの大きさにみじん切りにする。',
        tip: 'フランスの伝統的なミルポワの比率は玉ねぎ2：にんじん1：セロリ1。イタリアのソフリットも近い比率が一般的です。',
      },
      {
        step: 2,
        text: '鍋にオリーブオイルまたはバターを熱し、弱火〜中火で3種の野菜を炒める。',
      },
      {
        step: 3,
        text: '焦がさないよう時々混ぜながら、野菜がしんなりして甘い香りが立つまでじっくり炒める（10〜15分程度）。',
        tip: '強火で急いで炒めると焦げて苦味が出るだけでなく、野菜の甘みが十分に引き出せません。焦らずゆっくりが鉄則です。',
      },
      {
        step: 4,
        text: '野菜が透き通り、全体がしんなりしたら土台が完成。ここに肉やトマト、ワインなどを加えて煮込みを続ける。',
      },
    ],
    commonMistakes: [
      '野菜の大きさが不揃いで、火の通りにムラができる',
      '強火で炒めて焦がしてしまい、苦味が出る',
      '炒める時間が短すぎて、野菜の甘みが引き出せないまま次の工程に進んでしまう',
      'セロリを省略してしまう（風味の要のひとつなので、なるべく省略しないのがおすすめ）',
    ],
    relatedRecipeSlugs: [
      'boeuf-bourguignon',
      'osso-buco',
      'bouillabaisse',
      'tagliatelle-ragu-bolognese',
      'braised-beef-short-ribs',
      'pasta-e-fagioli',
      'lasagna-bolognese',
      'lampredotto',
      'olive-allascolana',
      'meat-ravioli-in-broth',
      'pappardelle-al-cinghiale',
      'ragu-bianco',
      'pollo-alla-cacciatora',
      'trippa-alla-fiorentina',
      'pasta-alla-genovese',
    ],
    publishedAt: '2026-07-06',
    faqs: [
      {
        question: 'ソフリットとミルポワは同じものですか？',
        answer:
          '基本の材料（玉ねぎ・にんじん・セロリ）は共通していますが、ミルポワ（フランス）は炒めずにゆっくり「汗をかかせる」ように火を通すのに対し、ソフリット（イタリア）はしっかり炒めて香ばしさを出す傾向があります。国や料理によって仕上がりの色や香りに違いが出ます。',
      },
      {
        question: 'セロリが苦手な場合は省略できますか？',
        answer:
          '省略しても料理は成立しますが、独特の爽やかな香りが失われます。苦手な場合は量を控えめにする、または細かく刻んで存在感を減らす方法がおすすめです。',
      },
      {
        question: '大量に作って冷凍保存できますか？',
        answer:
          'はい、炒めたソフリット・ミルポワは冷凍保存が可能です。まとめて作って小分け冷凍しておくと、平日の煮込み料理の時短に役立ちます。',
      },
    ],
  },
];

export function getTechniqueBySlug(slug: string): Technique | undefined {
  return techniques.find((t) => t.slug === slug);
}
