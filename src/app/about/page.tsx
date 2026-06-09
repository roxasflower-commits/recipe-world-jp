import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'このサイトについて',
  description: '世界中の本場レシピを日本語で。MONDE RECIPEが生まれた理由と、このサイトへの想いをご紹介します。',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-warm-bg">
      {/* Hero */}
      <section className="bg-primary text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs tracking-widest uppercase text-white/40">About</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-4 leading-tight">
            このサイトについて
          </h1>
          <p className="text-white/60 mt-6 text-base leading-relaxed max-w-xl mx-auto">
            世界中の本場レシピを、言葉の壁を越えてあなたの食卓へ。
          </p>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Origin story */}
        <section className="bg-white border border-warm-border p-8 sm:p-12 mb-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-6 bg-accent" />
            <h2 className="font-serif text-2xl font-bold tracking-tight">サイトを作った経緯</h2>
          </div>

          <div className="prose-like space-y-6 text-sm sm:text-base leading-loose text-gray-700">
            <p>
              「今日の晩ごはん、何にしようか」——そんな日常の小さな悩みから、このサイトは生まれました。
            </p>
            <p>
              毎日の献立を考えるのは、思いのほか大変なことです。冷蔵庫の中を眺めながら同じようなメニューを繰り返してしまう。せっかく週末があるなら、少し手間をかけて普段とは違う料理に挑戦してみたい。そう思ってインターネットで検索すると、本場の美味しそうなレシピがたくさんヒットします。
            </p>
            <p>
              けれど、そこには大きな壁がありました。<strong className="font-semibold text-primary">英語、フランス語、イタリア語——言葉がわからない。</strong>
            </p>
            <p>
              機械翻訳を使っても、料理の工程は微妙なニュアンスが命です。「fold in」と「mix」の違い、「sauté until translucent」の火加減、「season to taste」の塩梅……字面を訳しただけでは伝わらない、料理ならではの言葉があります。プロのシェフが海外の文献で本場のレシピを確認しようとしても、同じ壁にぶつかることは少なくありません。
            </p>
            <p>
              それなら、<strong className="font-semibold text-primary">料理を知っている人間が、ちゃんと日本語に翻訳すればいい。</strong>
            </p>
            <p>
              そう考えて立ち上げたのが、この MONDE RECIPE です。
            </p>
          </div>
        </section>

        {/* Three use cases */}
        <section className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-6 bg-accent" />
            <h2 className="font-serif text-2xl font-bold tracking-tight">こんな方に使ってほしい</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                tag: '毎日の食卓',
                title: '献立に迷ったとき',
                body: '「今日は何を作ろう」という日常の悩みに。世界の家庭料理から新しいレパートリーを見つけてください。',
              },
              {
                tag: '週末の挑戦',
                title: 'ちょっと凝った料理をしたいとき',
                body: '少し手間をかけて本格的な一皿を作りたい日に。本場のレシピを日本の材料で再現できるよう工夫しています。',
              },
              {
                tag: 'プロの現場',
                title: '原典レシピを確認したいとき',
                body: '料理人やフードプロの方にも。海外の名著・専門サイトのレシピを、調理用語の精度を保ちながら翻訳しています。',
              },
            ].map((item) => (
              <div key={item.tag} className="bg-white border border-warm-border p-6">
                <span className="text-xs tracking-widest uppercase text-accent">{item.tag}</span>
                <h3 className="font-serif text-lg font-bold mt-2 mb-3 leading-snug">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="bg-primary text-white p-8 sm:p-12 mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-6 bg-accent" />
            <h2 className="font-serif text-2xl font-bold tracking-tight">MONDE RECIPE の想い</h2>
          </div>
          <p className="text-white/70 text-sm sm:text-base leading-loose">
            「monde」はフランス語で「世界」を意味します。フランス料理、イタリアン、アメリカン BBQ、中華、タイ料理……
            国境を越えた食の多様性が、毎日の食卓を豊かにすると信じています。
            言語という障壁をなくし、世界中の美味しいレシピをすべての人に届けること。それが、このサイトを作り続ける理由です。
          </p>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-accent text-white text-sm tracking-widest uppercase px-8 py-3 hover:bg-primary transition-colors"
          >
            レシピを見る
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
