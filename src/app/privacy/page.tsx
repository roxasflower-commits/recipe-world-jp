import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'MONDE RECIPEのプライバシーポリシーです。個人情報の取り扱いおよびGoogle Analyticsの利用について説明します。',
};

const sections = [
  {
    title: '個人情報の収集について',
    body: '当サイト（MONDE RECIPE）は、お問い合わせフォームをご利用の際に、お名前・メールアドレスをご入力いただく場合があります。これらの情報は、お問い合わせへの返答のみに使用し、第三者への提供は行いません。',
  },
  {
    title: 'アフィリエイトプログラムについて',
    body: '当サイトはAmazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。当サイト内に掲載されているAmazonへのリンクから商品を購入された場合、当サイトは紹介料を受け取ることがあります。掲載商品の選定はサイト運営者が独自に行っており、広告主からの指定はありません。',
  },
  {
    title: 'アクセス解析ツールについて',
    body: '当サイトでは、Googleが提供するアクセス解析ツール「Google Analytics 4」を使用しています。Google Analyticsはトラフィックデータの収集のためにCookieを使用しています。収集されるデータは匿名であり、個人を特定するものではありません。Cookieの使用を無効にすることで、データ収集を拒否することができます。詳細はGoogleのプライバシーポリシーをご確認ください。',
  },
  {
    title: 'Cookieについて',
    body: '当サイトは、利便性向上やアクセス解析のためにCookieを使用しています。Cookieはブラウザに保存される小さなテキストファイルであり、個人を特定する情報は含まれません。ブラウザの設定によりCookieの受け入れを拒否することができますが、その場合一部のサービスが正常に動作しない可能性があります。',
  },
  {
    title: '著作権について',
    body: '当サイトに掲載しているレシピ、テキスト、画像の著作権は当サイトまたは各権利者に帰属します。無断での転載・複製・改変はご遠慮ください。なお、レシピの参考元については各ページに出典を記載しています。',
  },
  {
    title: '免責事項',
    body: '当サイトの情報は正確な情報を提供するよう努めておりますが、掲載内容の正確性・安全性・有用性については保証しかねます。当サイトの情報を利用することによって生じた損害については責任を負いかねますので、あらかじめご了承ください。',
  },
  {
    title: '外部リンクについて',
    body: '当サイトには外部サイトへのリンクが含まれる場合があります。リンク先のサイトにおける個人情報の取り扱いについては、各サイトのプライバシーポリシーをご確認ください。当サイトは外部サイトの内容について責任を負いません。',
  },
  {
    title: 'プライバシーポリシーの変更',
    body: '当サイトは、必要に応じて本プライバシーポリシーを変更することがあります。変更後のポリシーはこのページに掲載した時点から有効になります。',
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-warm-bg">
      {/* Hero */}
      <section className="bg-primary text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs tracking-widest uppercase text-white/40">Legal</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-4 leading-tight">
            プライバシーポリシー
          </h1>
          <p className="text-white/60 mt-6 text-base leading-relaxed max-w-xl mx-auto">
            当サイトにおける個人情報の取り扱いについて説明します。
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border border-warm-border p-8 sm:p-12 mb-8">
          <p className="text-sm text-gray-500 mb-8">制定日：2026年6月10日</p>
          <div className="space-y-10">
            {sections.map((section, i) => (
              <div key={i}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-1 h-5 bg-accent flex-shrink-0" />
                  <h2 className="font-serif text-xl font-bold tracking-tight">{section.title}</h2>
                </div>
                <p className="text-sm sm:text-base leading-loose text-gray-700 pl-5">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-warm-border p-8 sm:p-12 text-center">
          <p className="text-sm text-gray-600 leading-relaxed mb-2">
            本ポリシーに関するお問い合わせは下記よりご連絡ください。
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:underline mt-2"
          >
            お問い合わせフォームへ
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
