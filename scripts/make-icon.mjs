// 生成工具图标：node scripts/make-icon.mjs <编号> [桌面工程目录，默认 tools/<slug>]
// 圆角方块 + 工具名主体字 + 右下角篝火火苗；底色按方向（与应用区分类色一致），再用 tauri icon 生成各平台尺寸。
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { chromium } from 'playwright-core';

const root = new URL('..', import.meta.url).pathname;
const [id, appDirArg] = process.argv.slice(2);
const t = JSON.parse(readFileSync(root + 'catalog/tools.json', 'utf8')).tools.find((x) => x.id === id);
if (!t) throw new Error(`总目录里没有编号 ${id}`);
const appDir = appDirArg ? join(root, appDirArg) : `${root}tools/${t.slug}`;

const COLORS = { 电商运营: ['#F0443A', '#C81E3A'], 微信私域: ['#16A34A', '#0E7A3A'], 内容生产: ['#8B5CF6', '#5B2CC9'], 办公提效: ['#2F6FEB', '#1E48B8'], 'AI 助手': ['#0EA5A4', '#0B6E77'] };
const [c1, c2] = COLORS[t.category] ?? COLORS['办公提效'];
// 主体字：优先用指定的代表字（避免重复、看得出用途），否则取名称里第一个汉字
const GLYPH = {
  e03: '白', e07: '尺', o08: '套', o05: '识', c23: '标', e09: '题', e11: '账', o02: 'PDF', w12: '话', c17: '卡', w11: '圈',
  e20: '评', e10: '禁', o13: '压', o07: '表', w01: '排', w02: '稿', c19: '热', o01: '票',
};
const glyph = GLYPH[t.id] ?? (t.name.replace(/[（(].*?[)）]/g, '').match(/[一-龥]/) ?? [t.name[0]])[0];
const html = `<html><body style="margin:0;background:transparent">
<div style="width:1024px;height:1024px;display:grid;place-items:center">
 <div style="position:relative;width:824px;height:824px;border-radius:184px;background:linear-gradient(145deg,${c1},${c2});box-shadow:0 24px 48px rgba(0,0,0,.18);display:grid;place-items:center;overflow:hidden">
  <div style="position:absolute;inset:0;background:radial-gradient(circle at 30% 20%,rgba(255,255,255,.28),transparent 55%)"></div>
  <span style="position:relative;font:900 ${glyph.length > 1 ? 300 : 470}px/1 'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;color:#fff;letter-spacing:-.02em;text-shadow:0 10px 30px rgba(0,0,0,.18)">${glyph}</span>
  <svg style="position:absolute;right:70px;bottom:62px" width="150" height="190" viewBox="0 0 30 38"><path d="M15 1C17 9 25 13 25 23a10 10 0 0 1-20 0c0-5 3-8 5-10 0 4 2 6 4 6-1-6 1-12 1-18z" fill="#FFB547" stroke="#fff" stroke-width="2"/><path d="M15 20c2 3 4 4 4 8a4 4 0 0 1-8 0c0-3 2-4 4-8z" fill="#fff" opacity=".9"/></svg>
 </div></div></body></html>`;
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
