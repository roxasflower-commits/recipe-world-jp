import { MetadataRoute } from 'next';

const BASE_URL = 'https://recipe-world-jp.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BASE_URL}/sitemap-static.xml`,
  };
}
