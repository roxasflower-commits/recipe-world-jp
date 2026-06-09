import { MetadataRoute } from 'next';
import { recipes, cuisines } from '@/data/recipes';

const BASE_URL = 'https://recipe-world-jp.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const recipeUrls = recipes.map((recipe) => ({
    url: `${BASE_URL}/recipes/${recipe.slug}`,
    lastModified: new Date(recipe.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const categoryUrls = cuisines.map((cuisine) => ({
    url: `${BASE_URL}/category/${cuisine.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/recipes`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...recipeUrls,
    ...categoryUrls,
  ];
}
