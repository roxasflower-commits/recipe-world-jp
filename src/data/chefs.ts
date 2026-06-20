export interface Chef {
  slug: string;
  name: string;
  nameJa: string;
  restaurant: string;
  location: string;
  michelinStars: number;
  nationality: string;
  born: string;
  bio: string;
  philosophy: string;
  awards: string[];
  image: string;
}

export const chefs: Chef[] = [
  {
    slug: 'rene-redzepi',
    name: 'René Redzepi',
    nameJa: 'レネ・レゼピ',
    restaurant: 'Noma',
    location: 'コペンハーゲン、デンマーク',
    michelinStars: 2,
    nationality: 'デンマーク',
    born: '1977年',
    bio: 'デンマーク生まれ。北欧料理に革命をもたらした「ノルディック・キュイジーヌ」の第一人者。コペンハーゲンに構えたレストラン「Noma（ノーマ）」は、ミシュラン2つ星を獲得するとともに、「世界のベストレストラン50」にて4度の1位に輝いた。発酵・保存・採取といった北欧の伝統技法を現代料理に昇華させ、食の概念そのものを問い直した。2024年にNoma閉店を発表し、新たな食の探求へと進んでいる。',
    philosophy: '「土地と季節と食材の声に耳を澄ませること」。Nomaのキッチンでは、その日に採取した野草、発酵させた魚の内臓、雪解け水で育った野菜が並ぶ。完璧な技術より、完璧な素材への敬意を重んじる哲学が料理に宿る。',
    awards: [
      '世界のベストレストラン50 第1位（2010、2011、2012、2014）',
      'ミシュラン2つ星',
      'ジェームス・ビアード財団 最優秀国際シェフ賞',
    ],
    image: '/images/chefs/chef-rene-redzepi.jpg',
  },
  {
    slug: 'massimo-bottura',
    name: 'Massimo Bottura',
    nameJa: 'マッシモ・ボットゥラ',
    restaurant: 'Osteria Francescana',
    location: 'モデナ、イタリア',
    michelinStars: 3,
    nationality: 'イタリア',
    born: '1962年',
    bio: 'イタリア・モデナ生まれ。「Osteria Francescana（オステリア・フランチェスカーナ）」でミシュラン3つ星を獲得し、「世界のベストレストラン50」で2度の1位を達成。イタリア料理の伝統を守りつつ、現代アートや哲学からインスピレーションを得た前衛的な料理で世界を驚かせ続ける。また、食品ロス削減を訴えるプロジェクト「Refettorio」を世界各地で展開し、料理人としての社会的責任も体現する。',
    philosophy: '「伝統とは過去のコピーではなく、未来への橋渡し」。ダミアン・ハーストの絵画から着想を得た料理、切れてしまったビスコットから生まれたデザートなど、偶然とアートを料理に昇華させる。パルミジャーノやバルサミコ酢といったエミリア・ロマーニャの産物への深い敬意が、その革新的な皿の根底にある。',
    awards: [
      '世界のベストレストラン50 第1位（2016、2018）',
      'ミシュラン3つ星',
      'ジェームス・ビアード財団 特別功労賞',
    ],
    image: '/images/chefs/chef-massimo-bottura.jpg',
  },
  {
    slug: 'alain-passard',
    name: 'Alain Passard',
    nameJa: 'アラン・パッサール',
    restaurant: "L'Arpège",
    location: 'パリ、フランス',
    michelinStars: 3,
    nationality: 'フランス',
    born: '1956年',
    bio: 'フランス・ブルターニュ生まれ。パリ7区の「L\'Arpège（ラルページュ）」でミシュラン3つ星を30年以上維持し続けるフランス料理界の重鎮。2001年、星付きレストランとしては異例の「肉をほぼ使わない野菜中心メニュー」へのシフトを宣言し、料理界に衝撃を与えた。パリ郊外と西部に3つの農園を持ち、自ら土を耕して育てた野菜を翌朝のランチに使うという、食材との最短距離を追い求める。',
    philosophy: '「野菜は肉より難しい。でもそれが面白い」。火入れのマエストロとも称され、バターと低温という二つの道具だけで野菜の甘みと香りを極限まで引き出す。シンプルに見える料理の裏に、数十年の技術と農園での経験が宿っている。',
    awards: [
      'ミシュラン3つ星（1996年〜現在）',
      'ゴー・ミヨ 最優秀シェフ賞',
      '野菜料理の革命的先駆者として料理界に多大な影響',
    ],
    image: '/images/chefs/chef-alain-passard.jpg',
  },
  {
    slug: 'dominique-crenn',
    name: 'Dominique Crenn',
    nameJa: 'ドミニク・クレン',
    restaurant: 'Atelier Crenn',
    location: 'サンフランシスコ、アメリカ',
    michelinStars: 3,
    nationality: 'フランス',
    born: '1965年',
    bio: 'フランス・ヴェルサイユ生まれ。サンフランシスコの「Atelier Crenn（アトリエ・クレン）」でミシュラン3つ星を獲得し、アメリカで初めて3つ星を手にした女性シェフとして歴史に名を刻む。料理を「詩的な料理（Poetic Culinaria）」と呼び、一皿一皿が詩の一節のような物語を持つ。2019年に乳癌の診断を受けながらも料理への情熱を失わず、サステナビリティや食の平等を訴える活動家としても国際的に影響力を持つ。',
    philosophy: '「料理は詩であり、食卓は対話の場」。メニューは詩の形式で書かれ、料理名ではなく詩の一行が皿を紹介する。フランスの伝統技法をベースに、カリフォルニアの季節食材と女性的な感性が交わる独自の世界を表現する。プラントベースへのシフトも積極的に進め、地球環境への配慮が料理哲学の根底に流れる。',
    awards: [
      'ミシュラン3つ星（Atelier Crenn）',
      'アメリカ初の女性ミシュラン3つ星シェフ（2018年）',
      'ジェームス・ビアード財団 最優秀女性シェフ賞（2018年）',
    ],
    image: '/images/chefs/chef-dominique-crenn.jpg',
  },
  {
    slug: 'grant-achatz',
    name: 'Grant Achatz',
    nameJa: 'グラント・アカッツ',
    restaurant: 'Alinea',
    location: 'シカゴ、アメリカ',
    michelinStars: 3,
    nationality: 'アメリカ',
    born: '1974年',
    bio: 'アメリカ・ミシガン州生まれ。シカゴの「Alinea（アリネア）」でミシュラン3つ星を獲得し、アメリカ前衛料理の最前線に立つ。2007年、口腔癌のステージ4と診断され、味覚を失うリスクに直面。しかし治療を続けながら厨房に立ち続け、奇跡的な回復を遂げた。その経験は料理哲学をさらに深め、「感情を食べる」という体験型料理の世界を切り開いた。著書・ドキュメンタリーを通じ、その生き様は料理界を超えて広く知られる。',
    philosophy: '「料理は五感と感情を揺さぶるアートである」。テーブルクロスに直接料理を描いたり、香りを食前に漂わせたりと、従来の「皿に盛る」概念を解体する。液体窒素、エディブルフィルム、風船型デザートなど、科学と芸術が融合した料理は一度体験すると記憶から消えない。',
    awards: [
      'ミシュラン3つ星（Alinea）',
      'ジェームス・ビアード財団 最優秀シェフ賞（2008年）',
      'タイム誌「世界で最も影響力のある100人」選出',
    ],
    image: '/images/chefs/chef-grant-achatz.jpg',
  },
  {
    slug: 'virgilio-martinez',
    name: 'Virgilio Martínez',
    nameJa: 'ヴィルヒリオ・マルティネス',
    restaurant: 'Central',
    location: 'リマ、ペルー',
    michelinStars: 0,
    nationality: 'ペルー',
    born: '1977年',
    bio: 'ペルー・リマ生まれ。「Central（セントラル）」のオーナーシェフとして、ペルーの生態系と食材をテーマにした独自の料理哲学を体現。2023年「世界のベストレストラン50」で第1位を獲得。アンデスの高地から深海まで、標高ごとに異なる食材を12のコースで表現する「Altitudes（高度）」というコンセプトは世界的に注目を集めた。妻で共同シェフのピア・レオン（Kjolle）と共に、ペルー料理の世界的地位を押し上げた第一人者。',
    philosophy: '「食材の生息する高度と環境こそがレシピの設計図」。セビーチェに欠かせないレチェ・デ・ティグレ（虎のミルク）、コチャユヨ（海藻）、マカ根、サチャインチなど、ペルーの多様な生態系に由来する食材を最大限に活かす。ヨーロッパの技法を下敷きにしながらも、根底にあるのは南米の大地への深いリスペクトだ。',
    awards: [
      '世界のベストレストラン50 第1位（2023年）',
      'ラテンアメリカのベストレストラン50 第1位（複数回）',
      '世界のベストレストラン50 トップ5常連',
    ],
    image: '/images/chefs/chef-virgilio-martinez.jpg',
  },
];

export function getChefBySlug(slug: string): Chef | undefined {
  return chefs.find((c) => c.slug === slug);
}
