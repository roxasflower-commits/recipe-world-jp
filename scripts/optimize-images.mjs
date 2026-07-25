#!/usr/bin/env node
// public/images 配下の画像をリサイズ・再圧縮する。
// next.config.js の images.unoptimized: true (Vercel画像最適化の利用上限超過の応急処置)
// により配信時のリサイズ/圧縮が効かないため、元ファイル自体を軽量化しておく必要がある。
import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const IMAGES_DIR = path.join(process.cwd(), 'public/images');
const MAX_WIDTH = 1600;
const JPEG_QUALITY = 75;
const PNG_QUALITY = 75;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else {
      yield full;
    }
  }
}

async function optimize(file) {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return null;

  const before = (await stat(file)).size;
  const image = sharp(file);
  const meta = await image.metadata();

  let pipeline = image.rotate();
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  const buffer =
    ext === '.png'
      ? await pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9 }).toBuffer()
      : await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();

  if (buffer.length < before) {
    await sharp(buffer).toFile(file + '.tmp');
    await (await import('node:fs/promises')).rename(file + '.tmp', file);
    return { file, before, after: buffer.length };
  }
  return { file, before, after: before, skipped: true };
}

const results = [];
for await (const file of walk(IMAGES_DIR)) {
  const r = await optimize(file);
  if (r) {
    results.push(r);
    const pct = (100 * (1 - r.after / r.before)).toFixed(0);
    console.log(`${r.skipped ? '=' : '-' + pct + '%'}\t${(r.before / 1024).toFixed(0)}KB -> ${(r.after / 1024).toFixed(0)}KB\t${path.relative(IMAGES_DIR, r.file)}`);
  }
}

const totalBefore = results.reduce((a, r) => a + r.before, 0);
const totalAfter = results.reduce((a, r) => a + r.after, 0);
console.log(`\n合計: ${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB (削減率 ${(100 * (1 - totalAfter / totalBefore)).toFixed(0)}%)`);
