import type { Metadata } from 'next';
import AboutContent from './about-content';
import { chefs } from '@/data/chefs';
import { recipes, cuisines } from '@/data/recipes';

export const metadata: Metadata = {
  title: 'このサイトについて | MONDE RECIPE',
  description: '世界中の本場レシピを日本語で。MONDE RECIPEが生まれた経緯と、サイトへの想いをご紹介します。',
  alternates: {
    canonical: 'https://monde-recipe.com/about',
  },
};

export default function AboutPage() {
  return (
    <AboutContent
      recipeCount={recipes.length}
      cuisineCount={cuisines.length}
      chefs={chefs.map((c) => ({
        slug: c.slug,
        nameJa: c.nameJa,
        restaurant: c.restaurant,
        michelinStars: c.michelinStars,
        image: c.image,
      }))}
    />
  );
}
