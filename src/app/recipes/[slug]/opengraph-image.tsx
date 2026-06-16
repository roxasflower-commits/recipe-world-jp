import { ImageResponse } from 'next/og';
import { getRecipeBySlug } from '@/data/recipes';

export const size = { width: 1000, height: 1500 };
export const contentType = 'image/png';

async function loadJapaneseFont(text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&text=${encodeURIComponent(text)}&display=swap`,
      { headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64)' } }
    ).then((r) => r.text());
    const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype|woff2?)'\)/);
    if (!match) return null;
    return fetch(match[1]).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Image({ params }: { params: { slug: string } }) {
  const recipe = getRecipeBySlug(params.slug);
  if (!recipe) return new Response('Not found', { status: 404 });

  const totalTime = recipe.prepTime + recipe.cookTime;
  const fontChars = `${recipe.title}${recipe.cuisine}${recipe.difficultyLabel}調理分人前MONDE RECIPE作り方本格レシピ`;
  const fontData = await loadJapaneseFont(fontChars);

  const font = fontData
    ? [{ name: 'NotoSansJP', data: fontData, weight: 700 as const, style: 'normal' as const }]
    : [];

  const titleSize = recipe.title.length > 12 ? 56 : recipe.title.length > 8 ? 64 : 72;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundImage: `url(${recipe.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.92) 100%)',
            display: 'flex',
          }}
        />

        {/* Site name — top left */}
        <div
          style={{
            position: 'absolute',
            top: 56,
            left: 64,
            display: 'flex',
            color: 'rgba(255,255,255,0.45)',
            fontSize: 26,
            fontFamily: font.length ? 'NotoSansJP' : 'sans-serif',
            letterSpacing: 8,
          }}
        >
          MONDE RECIPE
        </div>

        {/* Bottom content block */}
        <div
          style={{
            position: 'absolute',
            bottom: 88,
            left: 64,
            right: 64,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {/* Cuisine badge */}
          <div style={{ display: 'flex' }}>
            <div
              style={{
                background: '#2D5A3D',
                color: 'white',
                fontSize: 26,
                fontFamily: font.length ? 'NotoSansJP' : 'sans-serif',
                padding: '8px 24px',
              }}
            >
              {recipe.cuisine}
            </div>
          </div>

          {/* Recipe title */}
          <div
            style={{
              color: 'white',
              fontSize: titleSize,
              fontFamily: font.length ? 'NotoSansJP' : 'sans-serif',
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            {recipe.title}
          </div>

          {/* Stats row */}
          <div
            style={{
              display: 'flex',
              gap: 36,
              color: 'rgba(255,255,255,0.55)',
              fontSize: 28,
              fontFamily: font.length ? 'NotoSansJP' : 'sans-serif',
            }}
          >
            <span>調理 {totalTime}分</span>
            <span>{recipe.servings}人前</span>
            <span>{recipe.difficultyLabel}</span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: font }
  );
}
