const TAG = 'recipeworld-22';

interface Product {
  name: string;
  amazonQuery: string;
}

export default function AffiliateProducts({ products }: { products: Product[] }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="border border-warm-border bg-white mb-8">
      <div className="px-5 py-4 border-b border-warm-border flex items-center gap-2">
        <div className="w-1 h-5 bg-gold flex-shrink-0" />
        <h3 className="font-serif text-base font-bold">このレシピに使う食材・道具</h3>
      </div>
      <ul>
        {products.map((p) => (
          <li key={p.amazonQuery} className="border-b border-warm-border last:border-0">
            <a
              href={`https://www.amazon.co.jp/s?k=${encodeURIComponent(p.amazonQuery)}&tag=${TAG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3.5 text-sm hover:bg-warm-bg transition-colors group"
            >
              <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="flex-1 text-gray-700 group-hover:text-primary transition-colors">{p.name}</span>
              <span className="text-[10px] text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded">Amazon</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="px-5 py-3 text-[10px] text-gray-400 leading-relaxed">
        ※ Amazonアソシエイトリンクです。購入されると紹介料を受け取る場合があります。
      </p>
    </div>
  );
}
