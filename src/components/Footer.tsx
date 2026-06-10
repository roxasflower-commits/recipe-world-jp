import Link from 'next/link';
import { cuisines } from '@/data/recipes';

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="font-serif text-2xl font-bold mb-3">MONDE RECIPE</div>
            <p className="text-white/50 text-sm leading-relaxed">
              世界中の名料理を丁寧に和訳し、家庭でも作れるレシピとしてお届けします。
              フランス、イタリア、アメリカから、プロの技法まで。
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs tracking-widest uppercase text-white/40 mb-4">料理カテゴリー</h3>
            <ul className="space-y-2">
              {cuisines.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Level */}
          <div>
            <h3 className="text-xs tracking-widest uppercase text-white/40 mb-4">難易度別</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href="/recipes?level=home" className="hover:text-white transition-colors">
                  家庭料理
                </Link>
              </li>
              <li>
                <Link href="/recipes?level=intermediate" className="hover:text-white transition-colors">
                  中級レシピ
                </Link>
              </li>
              <li>
                <Link href="/recipes?level=professional" className="hover:text-white transition-colors">
                  プロ仕様レシピ
                </Link>
              </li>
            </ul>

            <h3 className="text-xs tracking-widest uppercase text-white/40 mb-4 mt-8">サイトについて</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href="/chefs" className="hover:text-white transition-colors">
                  世界のトップシェフ
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  このサイトについて
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} MONDE RECIPE. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            掲載レシピの転載・無断使用はご遠慮ください。
          </p>
        </div>
      </div>
    </footer>
  );
}
