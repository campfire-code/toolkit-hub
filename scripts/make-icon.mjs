// 生成工具图标：node scripts/make-icon.mjs <编号> [桌面工程目录，默认 tools/<slug>]
// 画法见 icon-art.mjs，再用 tauri icon 生成各平台尺寸。
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { chromium } from 'playwright-core';
import { glyphOf, iconTile } from './icon-art.mjs';

const root = new URL('..', import.meta.url).pathname;
const [id, appDirArg] = process.argv.slice(2);
const t = JSON.parse(readFileSync(root + 'catalog/tools.json', 'utf8')).tools.find((x) => x.id === id);
if (!t) throw new Error(`总目录里没有编号 ${id}`);
const appDir = appDirArg ? join(root, appDirArg) : `${root}tools/${t.slug}`;

const glyph = glyphOf(t);
const html = `<html><body style="margin:0;background:transparent">
<div style="width:1024px;height:1024px;display:grid;place-items:center">
 ${iconTile(t)}</div></body></html>`;
const dir = mkdtempSync(join(tmpdir(), 'icon-'));
const htmlPath = join(dir, 'icon.html');
writeFileSync(htmlPath, html);
const browser = await chromium.launch({ executablePath: process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const page = await browser.newPage({ viewport: { width: 1024, height: 1024 } });
await page.goto('file://' + htmlPath);
const png = join(dir, 'icon.png');
await page.screenshot({ path: png, omitBackground: true });
await browser.close();
execFileSync('pnpm', ['exec', 'tauri', 'icon', png], { cwd: appDir, stdio: 'ignore' });
// 标记：已换成篝火图标（发布脚本据此判断是否还要生成）
writeFileSync(`${appDir}/src-tauri/icons/.campfire`, `${glyph} ${t.category}\n`);
console.log(`已生成图标「${glyph}」（${t.category}）→ ${appDir}/src-tauri/icons`);
