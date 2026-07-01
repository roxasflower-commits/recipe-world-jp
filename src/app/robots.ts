import { MetadataRoute } from 'next';

const BASE_URL = 'https://monde-recipe.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BASE_URL}/sitemap-static.xml`,
  };
}
