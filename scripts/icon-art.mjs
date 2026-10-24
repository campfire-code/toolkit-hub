// 篝火图标的画法（make-icon.mjs 生成桌面图标、gen-covers.mjs / gen-art.mjs 生成应用区图片共用）：
// 圆角方块 + 工具名主体字 + 右下角篝火火苗；底色用 catalog/style.json 里每个商品自己的主色，没有时退回分类色。
import { existsSync, readFileSync } from 'node:fs';

const styleFile = new URL('../catalog/style.json', import.meta.url).pathname;
const STYLE = existsSync(styleFile) ? JSON.parse(readFileSync(styleFile, 'utf8')) : {};
export const styleOf = (id) => STYLE[id] ?? null;
export const COLORS = { 电商运营: ['#F0443A', '#C81E3A'], 微信私域: ['#16A34A', '#0E7A3A'], 内容生产: ['#8B5CF6', '#5B2CC9'], 办公提效: ['#2F6FEB', '#1E48B8'], 'AI 助手': ['#0EA5A4', '#0B6E77'] };
// 主体字：优先用指定的代表字（避免重复、看得出用途），否则取名称里第一个汉字
const GLYPH = {
  e03: '白', e07: '尺', o08: '套', o05: '识', c23: '标', e09: '题', e11: '账', o02: '页', w12: '话', c17: '卡', w11: '圈',
  e20: '评', e10: '禁', o13: '压', o07: '表', w01: '排', w02: '稿', c19: '热', o01: '票',
};
export const glyphOf = (t) => GLYPH[t.id] ?? (t.name.replace(/[（(].*?[)）]/g, '').match(/[一-龥]/) ?? [t.name[0]])[0];
/** [浅一档, 主色]：渐变从浅到主色 */
export const colorsOf = (t) => {
  const a = STYLE[t.id]?.accent;
  return a ? [mix(a, '#FFFFFF', 0.18), a] : COLORS[t.category] ?? COLORS['办公提效'];
};
/** 两个 #RRGGBB 按比例混合（w 是 b 的占比） */
export function mix(a, b, w) {
  const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [x, y] = [p(a), p(b)];
  return '#' + x.map((v, i) => Math.round(v * (1 - w) + y[i] * w).toString(16).padStart(2, '0')).join('').toUpperCase();
}

/** 边长 824px 的图标方块（外层自行缩放） */
export function iconTile(t) {
  const [c1, c2] = colorsOf(t);
  const glyph = glyphOf(t);
  return `<div style="position:relative;width:824px;height:824px;border-radius:184px;background:linear-gradient(145deg,${c1},${c2});box-shadow:0 24px 48px rgba(0,0,0,.18);display:grid;place-items:center;overflow:hidden">
  <div style="position:absolute;inset:0;background:radial-gradient(circle at 30% 20%,rgba(255,255,255,.28),transparent 55%)"></div>
  <span style="position:relative;font:900 ${glyph.length > 1 ? 300 : 470}px/1 'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;color:#fff;letter-spacing:-.02em;text-shadow:0 10px 30px rgba(0,0,0,.18)">${glyph}</span>
  <svg style="position:absolute;right:70px;bottom:62px" width="150" height="190" viewBox="0 0 30 38"><path d="M15 1C17 9 25 13 25 23a10 10 0 0 1-20 0c0-5 3-8 5-10 0 4 2 6 4 6-1-6 1-12 1-18z" fill="#FFB547" stroke="#fff" stroke-width="2"/><path d="M15 20c2 3 4 4 4 8a4 4 0 0 1-8 0c0-3 2-4 4-8z" fill="#fff" opacity=".9"/></svg>
 </div>`;
}
