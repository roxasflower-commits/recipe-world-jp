import { MetadataRoute } from 'next';
import { recipes, cuisines } from '@/data/recipes';
import { chefs } from '@/data/chefs';

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

  const chefUrls = chefs.map((chef) => ({
    url: `${BASE_URL}/chefs/${chef.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/recipes`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/chefs`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    ...recipeUrls,
    ...categoryUrls,
    ...chefUrls,
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    },
  ];
}
