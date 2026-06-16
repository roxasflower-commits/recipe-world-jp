/**
 * Pinterest OAuth 2.0 認証スクリプト
 *
 * 使い方:
 *   node scripts/pinterest-auth.mjs
 *
 * 実行後、ブラウザが開くのでPinterestにログインして許可してください。
 * アクセストークンが表示されます。
 */
import http from 'node:http';
import { exec } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));

// ── ここにPinterest Developer Appの情報を入力 ──
const CLIENT_ID = process.env.PINTEREST_CLIENT_ID || '';
const CLIENT_SECRET = process.env.PINTEREST_CLIENT_SECRET || '';
// ─────────────────────────────────────────────

const REDIRECT_URI = 'http://localhost:8888/callback';
const SCOPE = 'boards:read,pins:write';
const STATE = 'monde_recipe_' + Date.now();

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(`
❌ CLIENT_ID と CLIENT_SECRET が必要です。

実行方法:
  PINTEREST_CLIENT_ID=xxx PINTEREST_CLIENT_SECRET=yyy node scripts/pinterest-auth.mjs

Pinterest Developer AppのIDとSecretは:
  https://developers.pinterest.com/apps/ → あなたのアプリ → Settings
`);
  process.exit(1);
}

const authUrl =
  `https://www.pinterest.com/oauth/?` +
  `client_id=${CLIENT_ID}&` +
  `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
  `response_type=code&` +
  `scope=${SCOPE}&` +
  `state=${STATE}`;

console.log('\n🔑 Pinterest 認証を開始します...');
console.log('ブラウザで次のURLを開いてください:');
console.log('\n' + authUrl + '\n');

// macOSでブラウザを自動オープン
exec(`open "${authUrl}"`);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost:8888');
  if (url.pathname !== '/callback') {
    res.writeHead(404); res.end(); return;
  }

  const code = url.searchParams.get('code');
  const returnedState = url.searchParams.get('state');

  if (returnedState !== STATE) {
    res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>❌ State mismatch error</h1>');
    return;
  }

  if (!code) {
    const error = url.searchParams.get('error_description') || 'Unknown error';
    res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<h1>❌ 認証エラー</h1><p>${error}</p>`);
    server.close();
    return;
  }

  console.log('✅ 認証コードを取得しました。アクセストークンを取得中...');

  // Exchange code for access token
  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const tokenRes = await fetch('https://api.pinterest.com/v5/oauth/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const tokenData = await tokenRes.json();

  if (!tokenRes.ok) {
    console.error('❌ トークン取得失敗:', tokenData);
    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<h1>❌ トークン取得に失敗しました</h1><pre>${JSON.stringify(tokenData, null, 2)}</pre>`);
    server.close();
    return;
  }

  const { access_token, refresh_token, expires_in } = tokenData;

  // Save tokens to file
  const tokenFile = join(__dir, 'pinterest-token.json');
  writeFileSync(tokenFile, JSON.stringify({ access_token, refresh_token, expires_in, created_at: Date.now() }, null, 2));

  console.log('\n✅ アクセストークンを取得しました！');
  console.log(`📁 保存先: scripts/pinterest-token.json`);
  console.log(`\n次のステップ:`);
  console.log(`  node scripts/pinterest-post.mjs\n`);

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <html><body style="font-family:sans-serif;padding:40px;max-width:600px">
    <h1>✅ 認証完了</h1>
    <p>アクセストークンを取得しました。このタブを閉じてターミナルに戻ってください。</p>
    <p style="color:gray;font-size:12px">tokens saved to scripts/pinterest-token.json</p>
    </body></html>
  `);

  server.close();
});

server.listen(8888, () => {
  console.log('⏳ ブラウザでPinterestにログインして許可してください...');
});

server.on('close', () => {
  process.exit(0);
});
