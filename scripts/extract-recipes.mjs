/**
 * Extracts recipe data from recipes.ts and outputs JSON for Pinterest posting.
 * Run: node scripts/extract-recipes.mjs > scripts/recipes.json
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(join(__dir, '../src/data/recipes.ts'), 'utf-8');

const BASE_URL = 'https://recipe-world-jp.vercel.app';

const recipes = [];
// Split on recipe object boundaries
const blocks = src.split(/\n  \{/);

for (const block of blocks) {
  const slug = (block.match(/slug:\s*'([^']+)'/) || [])[1];
  if (!slug || slug.includes('/') || block.includes('cuisineSlug') === false) continue;

  // Skip cuisine slugs (they appear at the bottom of the file)
  if (['french','italian','american','thai','british','spanish','nordic','turkish','indian','peruvian'].includes(slug)) continue;

  const title = (block.match(/\n\s+title:\s*'([^']+)'/) || [])[1];
  const cuisine = (block.match(/\n\s+cuisine:\s*'([^']+)'/) || [])[1];
  const cuisineSlug = (block.match(/\n\s+cuisineSlug:\s*'([^']+)'/) || [])[1];
  const image = (block.match(/\n\s+image:\s*'([^']+)'/) || [])[1];

  // Description can be single or multi-line
  const descMatch = block.match(/description:\s*\n\s*'([^']+)'/) || block.match(/description:\s*'([^']+)'/);
  const description = descMatch?.[1] ?? '';

  // Tags array
  const tagsMatch = block.match(/tags:\s*\[([^\]]+)\]/);
  const tags = tagsMatch
    ? tagsMatch[1].match(/'([^']+)'/g)?.map((t) => t.replace(/'/g, '')) ?? []
    : [];

  if (slug && title && image) {
    recipes.push({ slug, title, description, cuisine, cuisineSlug, image, tags });
  }
}

process.stdout.write(JSON.stringify(recipes, null, 2));
