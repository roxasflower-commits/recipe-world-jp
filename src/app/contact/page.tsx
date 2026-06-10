import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: 'MONDE RECIPEへのお問い合わせ・ご意見・レシピリクエストはこちらからどうぞ。',
};

const topics = [
  { label: 'レシピのリクエスト', desc: '「この料理のレシピが欲しい」というご要望をお気軽にどうぞ。' },
  { label: 'レシピの誤りについて', desc: '分量・手順に誤りを見つけた場合は教えていただけると助かります。' },
  { label: 'サイトについてのご意見', desc: '使いにくい点や改善のご提案など、なんでも歓迎です。' },
  { label: 'その他', desc: 'ご質問・ご感想など、お気軽にどうぞ。' },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-warm-bg">
      {/* Hero */}
      <section className="bg-primary text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs tracking-widest uppercase text-white/40">Contact</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-4 leading-tight">
            お問い合わせ
          </h1>
          <p className="text-white/60 mt-6 text-base leading-relaxed max-w-xl mx-auto">
            レシピのリクエストやご意見など、お気軽にご連絡ください。
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Topics */}
        <section className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-6 bg-accent" />
            <h2 className="font-serif text-2xl font-bold tracking-tight">こんなことでもどうぞ</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topics.map((t) => (
              <div key={t.label} className="bg-white border border-warm-border p-6">
                <span className="text-xs tracking-widest uppercase text-accent">{t.label}</span>
                <p className="text-sm text-gray-600 leading-relaxed mt-2">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Form */}
        <section className="bg-white border border-warm-border p-8 sm:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-6 bg-accent" />
            <h2 className="font-serif text-2xl font-bold tracking-tight">メッセージを送る</h2>
          </div>

          <form
            action="https://formspree.io/f/meewzday"
            method="POST"
            className="space-y-6"
          >
            <div>
              <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2">
                お名前
              </label>
              <input
                type="text"
                name="name"
                placeholder="山田 太郎"
                className="w-full border border-warm-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors bg-warm-bg"
              />
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2">
                メールアドレス <span className="text-accent">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                className="w-full border border-warm-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors bg-warm-bg"
              />
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2">
                件名
              </label>
              <select
                name="subject"
                className="w-full border border-warm-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors bg-warm-bg"
              >
                <option value="">選択してください</option>
                <option value="レシピのリクエスト">レシピのリクエスト</option>
                <option value="レシピの誤りについて">レシピの誤りについて</option>
                <option value="サイトについてのご意見">サイトについてのご意見</option>
                <option value="その他">その他</option>
              </select>
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2">
                メッセージ <span className="text-accent">*</span>
              </label>
              <textarea
                name="message"
                required
                rows={6}
                placeholder="メッセージをご記入ください"
                className="w-full border border-warm-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors bg-warm-bg resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-accent text-white text-sm tracking-widest uppercase py-4 hover:bg-primary transition-colors"
            >
              送信する
            </button>
          </form>

          <p className="text-xs text-gray-400 leading-relaxed mt-6">
            返信は通常3〜5営業日以内にお送りします。お急ぎの場合はご了承ください。
            送信いただいた情報はお問い合わせへの返答のみに使用し、第三者に提供することはありません。
          </p>
        </section>
      </div>
    </div>
  );
}
