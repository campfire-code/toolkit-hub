// 生成应用区封面：node scripts/gen-covers.mjs [编号...]
// 每个可上架工具一张 1600×1000（1.6:1，与小程序应用区双列卡片同比例）：分类色浅底 + 居中篝火图标方块 + 底部工具名。
// 输出 catalog/covers/<编号>.jpg，由 campfire 的 scripts/seed-toolkit-apps.mjs 上传。
import { mkdirSync, readFileSync } from 'node:fs';
import { chromium } from 'playwright-core';
import { colorsOf, iconTile } from './icon-art.mjs';

const root = new URL('..', import.meta.url).pathname;
const listing = JSON.parse(readFileSync(root + 'catalog/store-listing.json', 'utf8')).items;
const want = process.argv.slice(2);
const items = want.length ? listing.filter((i) => want.includes(i.id)) : listing;
const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);

mkdirSync(root + 'catalog/covers', { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const page = await browser.newPage({ viewport: { width: 800, height: 500 }, deviceScaleFactor: 2 });
for (const i of items) {
  const t = { id: i.id, name: i.name, category: i.category };
  const [c1, c2] = colorsOf(t);
  await page.setContent(`<html><body style="margin:0">
<div style="position:relative;width:800px;height:500px;overflow:hidden;background:linear-gradient(160deg,${c1}1f,${c2}33);font-family:'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif">
 <div style="position:absolute;width:520px;height:520px;border-radius:50%;right:-160px;top:-220px;background:${c1}1a"></div>
 <div style="position:absolute;width:360px;height:360px;border-radius:50%;left:-120px;bottom:-200px;background:${c2}14"></div>
 <div style="position:absolute;left:50%;top:58px;width:824px;height:824px;transform:translateX(-50%) scale(.3);transform-origin:top center">${iconTile(t)}</div>
 <div style="position:absolute;left:40px;right:40px;bottom:58px;text-align:center;font-weight:700;font-size:40px;line-height:1.25;color:#1d1d28;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(i.name)}</div>
 <div style="position:absolute;left:0;right:0;bottom:24px;text-align:center;font-size:20px;color:${c2};letter-spacing:.08em">开源 · 篝火出品</div>
</div></body></html>`);
  await page.screenshot({ path: `${root}catalog/covers/${i.id}.jpg`, type: 'jpeg', quality: 85 });
  process.stdout.write('.');
}
await browser.close();
console.log(`\n封面 ${items.length} 张 → catalog/covers/`);
