/**
 * MONDE RECIPE — Pinterest 自動投稿スクリプト
 *
 * 使い方:
 *   1. 先に pinterest-auth.mjs を実行してトークンを取得
 *   2. node scripts/pinterest-post.mjs
 *
 * 環境変数でもトークンを指定できます:
 *   PINTEREST_ACCESS_TOKEN=xxx node scripts/pinterest-post.mjs
 *
 * オプション:
 *   --dry-run    実際には投稿せず確認のみ
 *   --limit=10   最初の10件だけ投稿
 *   --skip=5     最初の5件をスキップ（途中再開用）
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));

// ── 設定 ──────────────────────────────────────
const BASE_URL = 'https://recipe-world-jp.vercel.app';
const DELAY_MS = 3000; // 投稿間隔（3秒）— レート制限対策
const PROGRESS_FILE = join(__dir, 'pinterest-progress.json');
// ─────────────────────────────────────────────

// Parse CLI args
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const limitArg = args.find((a) => a.startsWith('--limit='));
const skipArg = args.find((a) => a.startsWith('--skip='));
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : Infinity;
const skipCount = skipArg ? parseInt(skipArg.split('=')[1]) : 0;

// Load access token
let accessToken = process.env.PINTEREST_ACCESS_TOKEN || '';
if (!accessToken) {
  const tokenFile = join(__dir, 'pinterest-token.json');
  if (existsSync(tokenFile)) {
    const data = JSON.parse(readFileSync(tokenFile, 'utf-8'));
    accessToken = data.access_token;
  }
}
if (!accessToken) {
  console.error(`
❌ アクセストークンがありません。

先に認証を実行してください:
  node scripts/pinterest-auth.mjs

または環境変数で指定:
  PINTEREST_ACCESS_TOKEN=xxx node scripts/pinterest-post.mjs
`);
  process.exit(1);
}

// Extract recipes
console.log('📋 レシピデータを読み込み中...');
const recipesJson = execSync('node ' + join(__dir, 'extract-recipes.mjs'), { encoding: 'utf-8' });
const allRecipes = JSON.parse(recipesJson);
console.log(`✅ ${allRecipes.length}品のレシピを読み込みました`);

// Get boards
async function getBoards() {
  const res = await fetch('https://api.pinterest.com/v5/boards?page_size=25', {
    headers: { 'Authorization': `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`ボード取得失敗: ${res.status} ${await res.text()}`);
  return (await res.json()).items;
}

// Create a pin
async function createPin({ boardId, title, description, imageUrl, link }) {
  const body = {
    board_id: boardId,
    title,
    description,
    link,
    media_source: {
      source_type: 'image_url',
      url: imageUrl,
    },
  };

  const res = await fetch('https://api.pinterest.com/v5/pins', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`Pin作成失敗: ${JSON.stringify(data)}`);
  return data;
}

function buildDescription(recipe) {
  const tags = recipe.tags.map((t) => `#${t.replace(/\s+/g, '')}`).join(' ');
  return [
    recipe.description,
    '',
    `🍴 ${recipe.cuisine}レシピ | MONDE RECIPE`,
    `詳しい作り方 → ${BASE_URL}/recipes/${recipe.slug}`,
    '',
    tags,
    '#レシピ #料理 #世界料理 #海外料理 #料理好きな人と繋がりたい',
  ].join('\n');
}

// Load progress
function loadProgress() {
  if (existsSync(PROGRESS_FILE)) {
    return JSON.parse(readFileSync(PROGRESS_FILE, 'utf-8'));
  }
  return { posted: [], failed: [] };
}

function saveProgress(progress) {
  writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log('\n🎯 Pinterest自動投稿を開始します');
  if (isDryRun) console.log('🔍 DRY RUN モード（実際には投稿しません）');

  // Filter recipes (before API calls in dry-run)
  const progress = loadProgress();
  const alreadyPosted = new Set(progress.posted.map((p) => p.slug));

  let recipes = allRecipes
    .filter((r) => !alreadyPosted.has(r.slug))
    .slice(skipCount)
    .slice(0, limit);

  console.log(`\n📊 投稿予定: ${recipes.length}品`);
  if (alreadyPosted.size > 0) console.log(`   (すでに投稿済み: ${alreadyPosted.size}品をスキップ)`);

  if (isDryRun) {
    console.log('\n投稿予定のレシピ:');
    recipes.forEach((r, i) => console.log(`  ${i + 1}. ${r.title}`));
    console.log('\nPin説明文サンプル（1品目）:');
    console.log('────────────────────────────────────────');
    console.log(buildDescription(recipes[0]));
    console.log('────────────────────────────────────────');
    return;
  }

  // Get boards
  console.log('\n📌 Pinterestボードを取得中...');
  let boards;
  try {
    boards = await getBoards();
  } catch (e) {
    console.error('❌', e.message);
    process.exit(1);
  }

  if (boards.length === 0) {
    console.error('❌ ボードが見つかりません。Pinterestでボードを作成してください。');
    process.exit(1);
  }

  console.log('\n利用可能なボード:');
  boards.forEach((b, i) => console.log(`  [${i + 1}] ${b.name} (ID: ${b.id})`));

  // For now, use the first board. You can add interactive selection here.
  const board = boards[0];
  console.log(`\n✅ ボード「${board.name}」に投稿します`);

  console.log('\n');

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const num = `[${i + 1}/${recipes.length}]`;

    process.stdout.write(`${num} ${recipe.title} ... `);

    try {
      const pin = await createPin({
        boardId: board.id,
        title: recipe.title,
        description: buildDescription(recipe),
        imageUrl: recipe.image,
        link: `${BASE_URL}/recipes/${recipe.slug}`,
      });

      console.log(`✅ (pin: ${pin.id})`);
      progress.posted.push({ slug: recipe.slug, pinId: pin.id, postedAt: new Date().toISOString() });
      successCount++;
    } catch (e) {
      console.log(`❌ ${e.message}`);
      progress.failed.push({ slug: recipe.slug, error: e.message, failedAt: new Date().toISOString() });
      failCount++;
    }

    saveProgress(progress);

    if (i < recipes.length - 1) {
      await sleep(DELAY_MS);
    }
  }

  console.log(`\n🎉 完了！`);
  console.log(`   成功: ${successCount}品`);
  if (failCount > 0) {
    console.log(`   失敗: ${failCount}品`);
    console.log(`   失敗分は pinterest-progress.json の "failed" を確認してください`);
  }
  console.log(`   進捗: scripts/pinterest-progress.json に保存しました`);
}

main().catch((e) => {
  console.error('予期しないエラー:', e);
  process.exit(1);
});
