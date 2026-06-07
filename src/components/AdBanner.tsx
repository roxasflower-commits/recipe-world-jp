'use client';

/**
 * Google AdSense対応の広告バナーコンポーネント
 *
 * 本番環境での設定方法:
 * 1. layout.tsx の <head> に AdSense スクリプトタグを追加:
 *    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous" />
 * 2. AdSenseの審査が通ったら、下記の PLACEHOLDER 部分を実際の広告コードに置き換える
 */

interface AdBannerProps {
  slot?: string;
  format?: 'horizontal' | 'rectangle' | 'vertical';
  className?: string;
}

const formatStyles: Record<string, { label: string; dims: string }> = {
  horizontal: { label: '広告（728×90）', dims: 'min-h-[90px] w-full max-w-[728px] mx-auto' },
  rectangle: { label: '広告（300×250）', dims: 'w-[300px] h-[250px]' },
  vertical: { label: '広告（160×600）', dims: 'w-[160px] min-h-[600px]' },
};

export default function AdBanner({ format = 'horizontal', className = '' }: AdBannerProps) {
  const style = formatStyles[format];

  /* --- 本番: 以下のコメントアウトを外してPlaceholderブロックを削除 ---
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className={`overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
  --- ここまで --- */

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${style.dims} bg-warm-border/30 border border-warm-border flex items-center justify-center`}
      >
        <span className="text-xs text-muted tracking-widest uppercase">{style.label}</span>
      </div>
    </div>
  );
}
