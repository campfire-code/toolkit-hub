// 生成应用区图文素材：node scripts/gen-art.mjs [编号...]
// 读 catalog/copy/<编号>.json（工具）或 catalog/skills.json（技能）的文案，渲染到 catalog/art/<编号>/：
//   cover.jpg  1600×1000 封面（与应用区双列卡片同比例）：分类色浅底 + 图标 + 名称卖点 + 界面截图露出
//   card1.jpg  卖点卡：一句卖点 + 界面截图 + 三个关键点
//   card2.jpg  功能卡：便当格排列全部功能
//   card3.jpg  上手卡：三步上手 + 适合谁
// 图文卡宽 1080，小程序详情页整宽显示。
import { existsSync, mkdirSync, readFileSync, readdirSync } from 'node:fs';
import { chromium } from 'playwright-core';
import { colorsOf, iconTile } from './icon-art.mjs';

const root = new URL('..', import.meta.url).pathname;
const listing = JSON.parse(readFileSync(root + 'catalog/store-listing.json', 'utf8')).items;
const tools = JSON.parse(readFileSync(root + 'catalog/tools.json', 'utf8')).tools;
const skills = existsSync(root + 'catalog/skills.json') ? JSON.parse(readFileSync(root + 'catalog/skills.json', 'utf8')).items : [];
const SKILL_CAT = { 设计: '内容生产', PPT: '办公提效', 编码: 'AI 助手', 提示词: 'AI 助手', 调研: 'AI 助手' };

/** 统一成渲染需要的形状：名称、分类、文案、截图路径（技能没有截图） */
function load(id) {
  const s = skills.find((x) => x.id === id);
  const own = existsSync(`${root}catalog/copy/${id}.json`) ? JSON.parse(readFileSync(`${root}catalog/copy/${id}.json`, 'utf8')) : null;
  if (s) return { id, name: s.name, category: SKILL_CAT[s.category] ?? 'AI 助手', tag: `AI 技能 · ${s.category}`, copy: own ?? { slogan: s.summary, intro: s.summary, features: s.features.map((f) => ({ title: f.split(/[：:，,]/)[0].slice(0, 12), desc: f })), audience: [s.audience], steps: s.steps }, shot: null };
  const i = listing.find((x) => x.id === id);
  const t = tools.find((x) => x.id === id);
  const file = `${root}catalog/copy/${id}.json`;
  if (!i || !existsSync(file)) return null;
  const shot = `${root}tools/${t.slug}/docs/screenshot.png`;
  return { id, name: i.name, category: i.category, tag: i.category, copy: JSON.parse(readFileSync(file, 'utf8')), shot: existsSync(shot) ? shot : null };
}

const want = process.argv.slice(2);
const ids = want.length ? want : [...new Set([...readdirSync(root + 'catalog/copy').map((f) => f.replace('.json', '')), ...skills.map((s) => s.id)])];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const FONT = "'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif";
const INK = '#1d1d28';
const SUB = '#5b5b6b';

/** 图标方块缩放到指定边长 */
const icon = (t, size) => `<div style="width:${size}px;height:${size}px;flex:none;position:relative"><div style="position:absolute;left:0;top:0;width:824px;height:824px;transform:scale(${size / 824});transform-origin:0 0">${iconTile(t)}</div></div>`;
/** 桌面窗口外框里的截图；技能没有截图时画一张代码卡片 */
const windowShot = (x, w, c2) =>
  x.shot
    ? `<div style="width:${w}px;border-radius:14px;overflow:hidden;background:#fff;box-shadow:0 18px 50px rgba(20,20,40,.18),0 0 0 1px rgba(0,0,0,.06)">
        <div style="height:26px;background:#f1f1f4;display:flex;align-items:center;gap:7px;padding-left:12px"><i style="width:10px;height:10px;border-radius:50%;background:#ff5f57"></i><i style="width:10px;height:10px;border-radius:50%;background:#febc2e"></i><i style="width:10px;height:10px;border-radius:50%;background:#28c840"></i></div>
        <img src="data:image/png;base64,${readFileSync(x.shot).toString('base64')}" style="display:block;width:100%">
      </div>`
    : `<div style="width:${w}px;border-radius:14px;overflow:hidden;box-sizing:border-box;background:#1e1e2a;box-shadow:0 18px 50px rgba(20,20,40,.22);font:500 17px/1.7 'SF Mono',Menlo,monospace;color:#d6d6e6;padding:22px 24px">
        <div style="color:#8a8aa0">~/.claude/skills/</div>
        <div><span style="color:${c2 === '#5B2CC9' ? '#c4a5ff' : '#7ee0c3'}">●</span> ${esc(x.name)}</div>
        <div style="color:#8a8aa0;margin-top:10px">&gt; 用 Claude Code 说一句话</div>
        <div>&gt; 技能自动接手，按专业流程完成</div>
      </div>`;

async function shotEl(page, html, path, width) {
  await page.setViewportSize({ width, height: 400 });
  await page.setContent(`<html><body style="margin:0;font-family:${FONT}">${html}</body></html>`, { waitUntil: 'load' });
  await page.locator('#art').screenshot({ path, type: 'jpeg', quality: 86 });
}

const browser = await chromium.launch({ executablePath: process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const page = await browser.newPage({ deviceScaleFactor: 2 });
let n = 0;
for (const id of ids) {
  const x = load(id);
  if (!x) { console.log(`跳过 ${id}：没有文案`); continue; }
  const t = { id: x.id, name: x.name, category: x.category };
  const [c1, c2] = colorsOf(t);
  const c = x.copy;
  const dir = `${root}catalog/art/${id}`;
  mkdirSync(dir, { recursive: true });
  const bg = `background:linear-gradient(160deg,${c1}1c,${c2}30)`;

  // 封面 800×500（输出 1600×1000）
  await shotEl(page, `<div id="art" style="position:relative;width:800px;height:500px;overflow:hidden;${bg}">
    <div style="position:absolute;width:520px;height:520px;border-radius:50%;right:-180px;top:-240px;background:${c1}1a"></div>
    <div style="position:absolute;left:52px;top:64px;width:330px">
      ${icon(t, 112)}
      <div style="margin-top:26px;font-weight:800;font-size:40px;line-height:1.2;color:${INK}">${esc(x.name)}</div>
      <div style="margin-top:12px;font-size:23px;line-height:1.45;color:${SUB}">${esc(c.slogan)}</div>
      <div style="margin-top:22px;display:flex;gap:8px">${['免费', '开源', x.tag].map((s) => `<span style="font-size:16px;padding:5px 12px;border-radius:999px;background:#fff;color:${c2};font-weight:600">${esc(s)}</span>`).join('')}</div>
    </div>
    <div style="position:absolute;left:420px;top:78px;transform:rotate(-2deg)">${windowShot(x, 560, c2)}</div>
  </div>`, `${dir}/cover.jpg`, 800);

  // 卖点卡
  await shotEl(page, `<div id="art" style="width:540px;padding:40px 32px 36px;box-sizing:border-box;${bg}">
    <div style="display:flex;align-items:center;gap:14px">${icon(t, 56)}<div><div style="font-weight:800;font-size:24px;color:${INK}">${esc(x.name)}</div><div style="font-size:15px;color:${c2};margin-top:2px">篝火出品 · 开源免费</div></div></div>
    <div style="margin-top:26px;font-weight:800;font-size:34px;line-height:1.3;color:${INK}">${esc(c.slogan)}</div>
    <div style="margin-top:12px;font-size:19px;line-height:1.65;color:${SUB}">${esc(c.intro)}</div>
    <div style="margin-top:24px">${windowShot(x, 476, c2)}</div>
    <div style="margin-top:24px;display:flex;flex-direction:column;gap:10px">${c.features.slice(0, 3).map((f) => `<div style="display:flex;gap:12px;align-items:flex-start;background:#fff;border-radius:16px;padding:14px 16px"><span style="flex:none;width:26px;height:26px;border-radius:50%;background:${c1};color:#fff;font-size:15px;font-weight:700;display:grid;place-items:center">✓</span><div><div style="font-weight:700;font-size:19px;color:${INK}">${esc(f.title)}</div><div style="font-size:16px;color:${SUB};margin-top:2px;line-height:1.5">${esc(f.desc)}</div></div></div>`).join('')}</div>
  </div>`, `${dir}/card1.jpg`, 540);

  // 功能卡（便当格：第一格占满一行，其余两列；其余为单数时最后一格也占满一行）
  const feats = c.features;
  await shotEl(page, `<div id="art" style="width:540px;padding:36px 32px;box-sizing:border-box;background:#f5f5f7">
    <div style="font-size:15px;font-weight:700;letter-spacing:.12em;color:${c2}">功能一览</div>
    <div style="margin-top:6px;font-weight:800;font-size:${x.name.length > 9 ? 25 : 30}px;color:${INK}">${esc(x.name)}能帮你做什么</div>
    <div style="margin-top:22px;display:grid;grid-template-columns:1fr 1fr;gap:12px">${feats.map((f, k) => `<div style="${k === 0 || (feats.length % 2 === 0 && k === feats.length - 1) ? 'grid-column:1 / -1;' : ''}background:${k === 0 ? `linear-gradient(145deg,${c1},${c2})` : '#fff'};border-radius:20px;padding:20px 18px;min-height:${k === 0 ? 0 : 130}px;box-sizing:border-box">
        <div style="font-size:14px;font-weight:700;color:${k === 0 ? 'rgba(255,255,255,.75)' : c2}">${String(k + 1).padStart(2, '0')}</div>
        <div style="margin-top:8px;font-weight:800;font-size:${k === 0 ? 24 : 20}px;line-height:1.3;color:${k === 0 ? '#fff' : INK}">${esc(f.title)}</div>
        <div style="margin-top:6px;font-size:16px;line-height:1.55;color:${k === 0 ? 'rgba(255,255,255,.88)' : SUB}">${esc(f.desc)}</div>
      </div>`).join('')}</div>
  </div>`, `${dir}/card2.jpg`, 540);

  // 上手卡
  await shotEl(page, `<div id="art" style="width:540px;padding:36px 32px;box-sizing:border-box;background:#fff">
    <div style="font-size:15px;font-weight:700;letter-spacing:.12em;color:${c2}">三步上手</div>
    <div style="margin-top:18px;display:flex;flex-direction:column">${c.steps.map((s, k) => `<div style="display:flex;gap:16px"><div style="display:flex;flex-direction:column;align-items:center"><span style="width:40px;height:40px;border-radius:50%;background:${c1};color:#fff;font-weight:800;font-size:20px;display:grid;place-items:center">${k + 1}</span>${k < c.steps.length - 1 ? `<i style="width:2px;flex:1;min-height:22px;background:${c1}40"></i>` : ''}</div><div style="padding:7px 0 22px;font-size:19px;line-height:1.55;color:${INK}">${esc(s)}</div></div>`).join('')}</div>
    <div style="margin-top:8px;border-radius:20px;padding:20px 22px;${bg}">
      <div style="font-size:15px;font-weight:700;letter-spacing:.12em;color:${c2}">适合谁</div>
      ${c.audience.map((a) => `<div style="margin-top:10px;font-size:18px;line-height:1.55;color:${INK}">· ${esc(a)}</div>`).join('')}
    </div>
  </div>`, `${dir}/card3.jpg`, 540);
  n++;
  process.stdout.write('.');
}
await browser.close();
console.log(`\n图文素材 ${n} 套 → catalog/art/`);
