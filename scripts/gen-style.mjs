// 给每个上架商品分配专属主色和上架图版式：node scripts/gen-style.mjs
// 写入 catalog/style.json：{ 编号: { accent, cover, cards } }。已有的条目不改（手工调过的颜色保留），只给新商品补。
//   accent：主色 #RRGGBB。色相落在分类的色系里，同分类内逐个错开，保证白字可读（亮度 38%～46%）。
//   cover：封面版式 split / poster / rise / immersive / phone（安卓工具固定 phone）。
//   cards：图文卡版式 bento / list / story。
// 同分类相邻商品的封面和图文卡版式都不重复。
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const root = new URL('..', import.meta.url).pathname;
const file = root + 'catalog/style.json';
const listing = JSON.parse(readFileSync(root + 'catalog/store-listing.json', 'utf8')).items;
const tools = JSON.parse(readFileSync(root + 'catalog/tools.json', 'utf8')).tools;
const skills = existsSync(root + 'catalog/skills.json') ? JSON.parse(readFileSync(root + 'catalog/skills.json', 'utf8')).items : [];
const style = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : {};

// 分类色系：[起始色相, 结束色相]（度，可跨 360）
const HUES = { 电商运营: [345, 395], 微信私域: [100, 165], 内容生产: [255, 325], 办公提效: [195, 240], 'AI 助手': [168, 200], 技能: [20, 50] };
const COVERS = ['split', 'poster', 'rise', 'immersive'];
const CARDS = ['bento', 'list', 'story'];

function hsl(h, s, l) {
  h = ((h % 360) + 360) % 360; s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1))));
  return '#' + [f(0), f(8), f(4)].map((x) => x.toString(16).padStart(2, '0')).join('').toUpperCase();
}

const groups = {};
for (const i of listing) (groups[i.category] ??= []).push(i.id);
groups['技能'] = skills.map((s) => s.id);

let added = 0;
for (const [cat, ids] of Object.entries(groups)) {
  const [h0, h1] = HUES[cat] ?? [200, 240];
  ids.forEach((id, k) => {
    if (style[id]) return;
    // 色相按「隔一个跳一半」的顺序铺开，相邻商品色相差得远
    const n = ids.length;
    const order = (k % 2 ? Math.floor(n / 2) : 0) + Math.floor(k / 2);
    const h = h0 + ((h1 - h0) * order) / Math.max(1, n - 1);
    const s = [72, 64, 80][k % 3];
    const l = [42, 38, 46][Math.floor(k / 3) % 3];
    const t = tools.find((x) => x.id === id);
    const android = t && listing.find((x) => x.id === id)?.delivery === 'android';
    style[id] = { accent: hsl(h, s, l), cover: android ? 'phone' : COVERS[k % COVERS.length], cards: CARDS[(k + Math.floor(k / COVERS.length)) % CARDS.length] };
    added++;
  });
}
writeFileSync(file, JSON.stringify(style, null, 2) + '\n');
console.log(`共 ${Object.keys(style).length} 个，新增 ${added} 个 → catalog/style.json`);
