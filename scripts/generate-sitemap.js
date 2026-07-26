const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://monde-recipe.com';
const TODAY = new Date().toISOString().slice(0, 10);
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap-static.xml');

function extractSlugs(filePath, startMarker, endMarker) {
  const content = fs.readFileSync(filePath, 'utf8');
  const startIdx = content.indexOf(startMarker);
  if (startIdx === -1) throw new Error(`marker not found: ${startMarker} in ${filePath}`);
  const endIdx = endMarker ? content.indexOf(endMarker, startIdx) : -1;
  const slice = content.slice(startIdx, endIdx === -1 ? content.length : endIdx);
  return [...slice.matchAll(/slug:\s*'([a-z0-9-]+)'/g)].map((m) => m[1]);
}

// 既存のsitemapからURLごとのlastmodを読み取る。新規追加分だけ本日の日付になり、
// 既存分の追加履歴（lastmod）は上書きしない。
function loadExistingLastmods(sitemapPath) {
  const map = new Map();
  if (!fs.existsSync(sitemapPath)) return map;
  const content = fs.readFileSync(sitemapPath, 'utf8');
  for (const m of content.matchAll(/<loc>(.*?)<\/loc>\s*<lastmod>(.*?)<\/lastmod>/g)) {
    map.set(m[1], m[2]);
  }
  return map;
}

function urlEntry(existingLastmods, loc, changefreq, priority) {
  const fullUrl = `${BASE_URL}${loc}`;
  const lastmod = existingLastmods.get(fullUrl) ?? TODAY;
  return `  <url>\n    <loc>${fullUrl}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

const dataDir = path.join(__dirname, '../src/data');
const existingLastmods = loadExistingLastmods(SITEMAP_PATH);

const recipeSlugs = extractSlugs(path.join(dataDir, 'recipes.ts'), 'export const recipes', 'export const cuisines');
const cuisineSlugs = extractSlugs(path.join(dataDir, 'recipes.ts'), 'export const cuisines', null);
const chefSlugs = extractSlugs(path.join(dataDir, 'chefs.ts'), 'export const chefs', null);
const ingredientSlugs = extractSlugs(path.join(dataDir, 'ingredients.ts'), 'export const ingredients', 'export const ingredientCategories');
const guideSlugs = extractSlugs(path.join(dataDir, 'guides.ts'), 'export const guides', null);
const techniqueSlugs = extractSlugs(path.join(dataDir, 'techniques.ts'), 'export const techniques', null);

const entries = [
  urlEntry(existingLastmods, '', 'daily', '1.0'),
  urlEntry(existingLastmods, '/recipes', 'daily', '0.9'),
  urlEntry(existingLastmods, '/chefs', 'weekly', '0.8'),
  urlEntry(existingLastmods, '/ingredients', 'weekly', '0.8'),
  urlEntry(existingLastmods, '/guides', 'weekly', '0.8'),
  urlEntry(existingLastmods, '/techniques', 'weekly', '0.8'),
  urlEntry(existingLastmods, '/about', 'monthly', '0.5'),
];

const newUrls = [];
function track(loc) {
  if (!existingLastmods.has(`${BASE_URL}${loc}`)) newUrls.push(loc);
}

for (const slug of cuisineSlugs) {
  track(`/category/${slug}`);
  entries.push(urlEntry(existingLastmods, `/category/${slug}`, 'weekly', '0.8'));
}
for (const slug of recipeSlugs) {
  track(`/recipes/${slug}`);
  entries.push(urlEntry(existingLastmods, `/recipes/${slug}`, 'monthly', '0.7'));
}
for (const slug of chefSlugs) {
  track(`/chefs/${slug}`);
  entries.push(urlEntry(existingLastmods, `/chefs/${slug}`, 'weekly', '0.7'));
}
for (const slug of ingredientSlugs) {
  track(`/ingredients/${slug}`);
  entries.push(urlEntry(existingLastmods, `/ingredients/${slug}`, 'monthly', '0.7'));
}
for (const slug of guideSlugs) {
  track(`/guides/${slug}`);
  entries.push(urlEntry(existingLastmods, `/guides/${slug}`, 'monthly', '0.7'));
}
for (const slug of techniqueSlugs) {
  track(`/techniques/${slug}`);
  entries.push(urlEntry(existingLastmods, `/techniques/${slug}`, 'monthly', '0.7'));
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;

fs.writeFileSync(SITEMAP_PATH, xml);

console.log(`sitemap-static.xml generated: ${entries.length} URLs`);
console.log(
  `  recipes: ${recipeSlugs.length}, cuisines: ${cuisineSlugs.length}, chefs: ${chefSlugs.length}, ingredients: ${ingredientSlugs.length}, guides: ${guideSlugs.length}, techniques: ${techniqueSlugs.length}`
);
if (newUrls.length > 0) {
  console.log(`  new URLs added (lastmod=${TODAY}): ${newUrls.length}`);
  for (const u of newUrls) console.log(`    ${u}`);
} else {
  console.log('  no new URLs (sitemap was already up to date)');
}
