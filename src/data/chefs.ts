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
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
  },
];

export function getChefBySlug(slug: string): Chef | undefined {
  return chefs.find((c) => c.slug === slug);
}
