// 生成应用区图文素材：node scripts/gen-art.mjs [编号...]
// 读 catalog/copy/<编号>.json（工具）或 catalog/skills.json（技能）的文案、catalog/style.json 的主色与版式，渲染到 catalog/art/<编号>/：
//   cover.jpg  1600×1000 封面（与应用区双列卡片同比例），五种版式：split 左文右图 / poster 大字海报 / rise 居中升起 / immersive 截图铺满 / phone 手机
//   card1.jpg  卖点卡、card2.jpg 功能卡、card3.jpg 上手卡，三种版式：bento 便当格 / list 清单 / story 场景
// 图文卡宽 1080，小程序详情页整宽显示。图上只用中文（术语表 docs/术语表.md 允许的原文除外）。
// 文案可选字段：scene { title, body } 一个具体的使用场景；不写就不画场景块。
import { existsSync, mkdirSync, readFileSync, readdirSync } from 'node:fs';
import { chromium } from 'playwright-core';
import { colorsOf, iconTile, mix, styleOf } from './icon-art.mjs';

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
const img = (x) => `data:image/png;base64,${readFileSync(x.shot).toString('base64')}`;
/** 截图外框：desktop 桌面窗口 / bare 只有圆角 / phone 手机；技能没有截图时画一张终端卡片 */
function shot(x, w, a, frame = 'desktop') {
  if (!x.shot) {
    return `<div style="width:${w}px;border-radius:14px;overflow:hidden;box-sizing:border-box;background:#1e1e2a;box-shadow:0 18px 50px rgba(20,20,40,.22);font:500 17px/1.8 ${FONT};color:#d6d6e6;padding:22px 24px">
      <div style="color:#8a8aa0">技能目录 › ${esc(x.name)}</div>
      <div><span style="color:${mix(a, '#FFFFFF', 0.45)}">●</span> 已装好，随时可用</div>
      <div style="color:#8a8aa0;margin-top:10px">› 在 Claude Code 里说一句要做什么</div>
      <div>› 技能自动接手，按专业流程完成</div>
    </div>`;
  }
  if (frame === 'phone') return `<div style="width:${w}px;border-radius:26px;padding:10px;background:#15151c;box-shadow:0 24px 60px rgba(10,10,30,.35)"><img src="${img(x)}" style="display:block;width:100%;border-radius:18px"></div>`;
  // 截图最高按 3:2 显示，加长截图从顶部裁切，免得把卡片撑得过长
  const cap = `max-height:${Math.round(w / 1.5)}px;overflow:hidden`;
  if (frame === 'bare') return `<div style="width:${w}px;border-radius:12px;overflow:hidden;box-shadow:0 14px 40px rgba(20,20,40,.16),0 0 0 1px rgba(0,0,0,.06)"><div style="${cap}"><img src="${img(x)}" style="display:block;width:100%"></div></div>`;
  return `<div style="width:${w}px;border-radius:14px;overflow:hidden;background:#fff;box-shadow:0 18px 50px rgba(20,20,40,.18),0 0 0 1px rgba(0,0,0,.06)">
      <div style="height:26px;background:#f1f1f4;display:flex;align-items:center;gap:7px;padding-left:12px"><i style="width:10px;height:10px;border-radius:50%;background:#ff5f57"></i><i style="width:10px;height:10px;border-radius:50%;background:#febc2e"></i><i style="width:10px;height:10px;border-radius:50%;background:#28c840"></i></div>
      <div style="${cap}"><img src="${img(x)}" style="display:block;width:100%"></div>
    </div>`;
}
const chips = (list, fg, bg) => `<div style="display:flex;flex-wrap:wrap;gap:8px">${list.map((s) => `<span style="font-size:16px;padding:5px 13px;border-radius:999px;background:${bg};color:${fg};font-weight:600">${esc(s)}</span>`).join('')}</div>`;
const kicker = (s, a) => `<div style="font-size:15px;font-weight:700;letter-spacing:.14em;color:${a}">${esc(s)}</div>`;

// ---------- 封面 800×500 ----------
function cover(x, t, a, kind) {
  const c = x.copy;
  const tags = ['免费', '开源', x.tag];
  const nameSize = x.name.length > 10 ? 34 : 40;
  if (kind === 'poster') {
    return `<div id="art" style="position:relative;width:800px;height:500px;overflow:hidden;background:linear-gradient(135deg,${mix(a, '#000000', 0.1)},${mix(a, '#FFFFFF', 0.12)})">
      <div style="position:absolute;right:-60px;top:-90px;font:900 420px/1 ${FONT};color:rgba(255,255,255,.07)">${esc(x.name.match(/[一-龥]/)?.[0] ?? '')}</div>
      <div style="position:absolute;left:52px;top:56px;display:flex;align-items:center;gap:14px">${icon(t, 64)}<div style="font-weight:700;font-size:24px;color:#fff">${esc(x.name)}</div></div>
      <div style="position:absolute;left:52px;top:150px;width:380px;font-weight:900;font-size:46px;line-height:1.22;color:#fff">${esc(c.slogan)}</div>
      <div style="position:absolute;left:52px;bottom:52px">${chips(tags, a, 'rgba(255,255,255,.92)')}</div>
      <div style="position:absolute;left:470px;top:120px;transform:rotate(4deg)">${shot(x, 470, a)}</div>
    </div>`;
  }
  if (kind === 'rise') {
    return `<div id="art" style="position:relative;width:800px;height:500px;overflow:hidden;background:${mix(a, '#FFFFFF', 0.92)};background-image:linear-gradient(${mix(a, '#FFFFFF', 0.82)} 1px,transparent 1px),linear-gradient(90deg,${mix(a, '#FFFFFF', 0.82)} 1px,transparent 1px);background-size:32px 32px">
      <div style="position:absolute;left:0;right:0;top:44px;display:flex;flex-direction:column;align-items:center;text-align:center">
        <div style="display:flex;align-items:center;gap:14px">${icon(t, 58)}<div style="font-weight:800;font-size:${nameSize - 4}px;color:${INK}">${esc(x.name)}</div></div>
        <div style="margin-top:12px;font-size:23px;color:${SUB}">${esc(c.slogan)}</div>
      </div>
      <div style="position:absolute;left:110px;top:200px">${shot(x, 580, a)}</div>
      <div style="position:absolute;right:28px;top:28px">${chips(['免费开源'], '#fff', a)}</div>
    </div>`;
  }
  if (kind === 'immersive' && x.shot) {
    const dark = mix(a, '#000000', 0.62);
    return `<div id="art" style="position:relative;width:800px;height:500px;overflow:hidden;background:${dark}">
      <img src="${img(x)}" style="position:absolute;left:250px;top:40px;width:640px;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,.4)">
      <div style="position:absolute;inset:0;background:linear-gradient(90deg,${dark} 34%,${dark}cc 52%,transparent 80%)"></div>
      <div style="position:absolute;left:52px;top:70px;width:330px">
        ${icon(t, 84)}
        <div style="margin-top:24px;font-weight:800;font-size:${nameSize}px;line-height:1.2;color:#fff">${esc(x.name)}</div>
        <div style="margin-top:12px;font-size:22px;line-height:1.5;color:rgba(255,255,255,.8)">${esc(c.slogan)}</div>
        <div style="margin-top:24px">${chips(tags, '#fff', 'rgba(255,255,255,.16)')}</div>
      </div>
    </div>`;
  }
  if (kind === 'phone') {
    return `<div id="art" style="position:relative;width:800px;height:500px;overflow:hidden;background:linear-gradient(160deg,${mix(a, '#FFFFFF', 0.86)},${mix(a, '#FFFFFF', 0.7)})">
      <div style="position:absolute;left:52px;top:70px;width:300px">
        ${icon(t, 96)}
        <div style="margin-top:24px;font-weight:800;font-size:${nameSize - 4}px;line-height:1.25;color:${INK}">${esc(x.name)}</div>
        <div style="margin-top:12px;font-size:22px;line-height:1.5;color:${SUB}">${esc(c.slogan)}</div>
        <div style="margin-top:22px">${chips(['安卓手机', '免费', '开源'], a, '#fff')}</div>
      </div>
      <div style="position:absolute;left:380px;top:60px">${shot(x, 400, a, 'phone')}</div>
    </div>`;
  }
  // split：左文右图
  return `<div id="art" style="position:relative;width:800px;height:500px;overflow:hidden;background:linear-gradient(160deg,${mix(a, '#FFFFFF', 0.9)},${mix(a, '#FFFFFF', 0.78)})">
    <div style="position:absolute;width:520px;height:520px;border-radius:50%;right:-180px;top:-240px;background:${mix(a, '#FFFFFF', 0.7)}"></div>
    <div style="position:absolute;left:52px;top:64px;width:330px">
      ${icon(t, 104)}
      <div style="margin-top:26px;font-weight:800;font-size:${nameSize}px;line-height:1.2;color:${INK}">${esc(x.name)}</div>
      <div style="margin-top:12px;font-size:23px;line-height:1.45;color:${SUB}">${esc(c.slogan)}</div>
      <div style="margin-top:22px">${chips(tags, a, '#fff')}</div>
    </div>
    <div style="position:absolute;left:420px;top:78px;transform:rotate(-2deg)">${shot(x, 560, a)}</div>
  </div>`;
}

// ---------- 卖点卡 ----------
function card1(x, t, a, kind, frame) {
  const c = x.copy;
  const head = `<div style="display:flex;align-items:center;gap:14px">${icon(t, 56)}<div><div style="font-weight:800;font-size:24px;color:${INK}">${esc(x.name)}</div><div style="font-size:15px;color:${a};margin-top:2px">篝火出品 · 开源免费</div></div></div>`;
  const scene = c.scene ? `<div style="margin-top:22px;border-left:4px solid ${a};padding:4px 0 4px 16px"><div style="font-weight:700;font-size:19px;color:${INK}">${esc(c.scene.title)}</div><div style="margin-top:6px;font-size:17px;line-height:1.65;color:${SUB}">${esc(c.scene.body)}</div></div>` : '';
  if (kind === 'list') {
    return `<div id="art" style="width:540px;box-sizing:border-box;background:#fff">
      <div style="padding:40px 32px 120px;background:linear-gradient(150deg,${mix(a, '#000000', 0.08)},${mix(a, '#FFFFFF', 0.1)})">
        <div style="display:flex;align-items:center;gap:14px">${icon(t, 52)}<div style="font-weight:700;font-size:22px;color:#fff">${esc(x.name)}</div></div>
        <div style="margin-top:22px;font-weight:900;font-size:36px;line-height:1.3;color:#fff">${esc(c.slogan)}</div>
      </div>
      <div style="margin:-96px 24px 0">${shot(x, 492, a, frame)}</div>
      <div style="padding:26px 32px 36px">
        <div style="font-size:18px;line-height:1.75;color:${SUB}">${esc(c.intro)}</div>
        ${scene}
      </div>
    </div>`;
  }
  if (kind === 'story') {
    return `<div id="art" style="width:540px;padding:40px 32px 36px;box-sizing:border-box;background:${mix(a, '#FFFFFF', 0.94)}">
      ${head}
      <div style="margin-top:28px;font-weight:900;font-size:38px;line-height:1.28;color:${INK}">${esc(c.slogan)}</div>
      <div style="margin-top:8px;width:56px;height:6px;border-radius:3px;background:${a}"></div>
      ${scene || `<div style="margin-top:20px;font-size:18px;line-height:1.7;color:${SUB}">${esc(c.intro)}</div>`}
      <div style="margin-top:26px">${shot(x, 476, a, frame)}</div>
      ${scene ? `<div style="margin-top:20px;font-size:17px;line-height:1.7;color:${SUB}">${esc(c.intro)}</div>` : ''}
    </div>`;
  }
  // bento
  return `<div id="art" style="width:540px;padding:40px 32px 36px;box-sizing:border-box;background:linear-gradient(160deg,${mix(a, '#FFFFFF', 0.9)},${mix(a, '#FFFFFF', 0.8)})">
    ${head}
    <div style="margin-top:26px;font-weight:800;font-size:34px;line-height:1.3;color:${INK}">${esc(c.slogan)}</div>
    <div style="margin-top:12px;font-size:19px;line-height:1.65;color:${SUB}">${esc(c.intro)}</div>
    <div style="margin-top:24px">${shot(x, 476, a, frame)}</div>
    <div style="margin-top:24px;display:flex;flex-direction:column;gap:10px">${c.features.slice(0, 3).map((f) => `<div style="display:flex;gap:12px;align-items:flex-start;background:#fff;border-radius:16px;padding:14px 16px"><span style="flex:none;width:26px;height:26px;border-radius:50%;background:${a};color:#fff;font-size:15px;font-weight:700;display:grid;place-items:center">✓</span><div><div style="font-weight:700;font-size:19px;color:${INK}">${esc(f.title)}</div><div style="font-size:16px;color:${SUB};margin-top:2px;line-height:1.5">${esc(f.desc)}</div></div></div>`).join('')}</div>
    ${scene}
  </div>`;
}

// ---------- 功能卡 ----------
function card2(x, a, kind) {
  const feats = x.copy.features;
  const title = `<div style="margin-top:6px;font-weight:800;font-size:${x.name.length > 9 ? 25 : 30}px;color:${INK}">${esc(x.name)}能帮你做什么</div>`;
  if (kind === 'list') {
    return `<div id="art" style="width:540px;padding:36px 32px;box-sizing:border-box;background:#fff">
      ${kicker('功能清单', a)}${title}
      <div style="margin-top:18px">${feats.map((f, k) => `<div style="display:flex;gap:18px;padding:18px 0;${k ? `border-top:1px solid ${mix(a, '#FFFFFF', 0.85)};` : ''}">
          <div style="flex:none;width:44px;font:800 30px/1 ${FONT};color:${a}">${String(k + 1).padStart(2, '0')}</div>
          <div><div style="font-weight:700;font-size:20px;color:${INK}">${esc(f.title)}</div><div style="margin-top:5px;font-size:16px;line-height:1.6;color:${SUB}">${esc(f.desc)}</div></div>
        </div>`).join('')}</div>
    </div>`;
  }
  if (kind === 'story') {
    const limits = x.copy.limits ?? [];
    return `<div id="art" style="width:540px;padding:36px 32px;box-sizing:border-box;background:${mix(a, '#FFFFFF', 0.94)}">
      ${kicker('能做什么', a)}${title}
      <div style="margin-top:20px;display:flex;flex-direction:column;gap:10px">${feats.map((f) => `<div style="background:#fff;border-radius:14px;padding:16px 18px;box-shadow:0 1px 0 ${mix(a, '#FFFFFF', 0.8)}"><div style="display:flex;align-items:center;gap:10px"><span style="width:8px;height:8px;border-radius:2px;background:${a};transform:rotate(45deg)"></span><b style="font-size:19px;color:${INK}">${esc(f.title)}</b></div><div style="margin:6px 0 0 18px;font-size:16px;line-height:1.6;color:${SUB}">${esc(f.desc)}</div></div>`).join('')}</div>
      ${limits.length ? `<div style="margin-top:22px;border-radius:14px;padding:16px 18px;background:#fff7e6;border:1px solid #f3d9a4"><div style="font-weight:700;font-size:17px;color:#8a5a00">用之前先知道</div>${limits.map((l) => `<div style="margin-top:8px;font-size:16px;line-height:1.6;color:#6b5525">· ${esc(l)}</div>`).join('')}</div>` : ''}
    </div>`;
  }
  // bento：第一格占满一行，其余两列；其余为单数时最后一格也占满一行
  return `<div id="art" style="width:540px;padding:36px 32px;box-sizing:border-box;background:#f5f5f7">
    ${kicker('功能一览', a)}${title}
    <div style="margin-top:22px;display:grid;grid-template-columns:1fr 1fr;gap:12px">${feats.map((f, k) => `<div style="${k === 0 || (feats.length % 2 === 0 && k === feats.length - 1) ? 'grid-column:1 / -1;' : ''}background:${k === 0 ? `linear-gradient(145deg,${mix(a, '#FFFFFF', 0.15)},${a})` : '#fff'};border-radius:20px;padding:20px 18px;min-height:${k === 0 ? 0 : 130}px;box-sizing:border-box">
        <div style="font-size:14px;font-weight:700;color:${k === 0 ? 'rgba(255,255,255,.75)' : a}">${String(k + 1).padStart(2, '0')}</div>
        <div style="margin-top:8px;font-weight:800;font-size:${k === 0 ? 24 : 20}px;line-height:1.3;color:${k === 0 ? '#fff' : INK}">${esc(f.title)}</div>
        <div style="margin-top:6px;font-size:16px;line-height:1.55;color:${k === 0 ? 'rgba(255,255,255,.88)' : SUB}">${esc(f.desc)}</div>
      </div>`).join('')}</div>
  </div>`;
}

// ---------- 上手卡 ----------
function card3(x, a, kind) {
  const c = x.copy;
  const limits = kind === 'story' ? [] : c.limits ?? [];
  const limitBox = limits.length ? `<div style="margin-top:18px;border-radius:16px;padding:16px 20px;background:#f6f6f8"><div style="font-weight:700;font-size:16px;color:${INK}">使用前须知</div>${limits.map((l) => `<div style="margin-top:7px;font-size:15px;line-height:1.6;color:${SUB}">· ${esc(l)}</div>`).join('')}</div>` : '';
  if (kind === 'list') {
    return `<div id="art" style="width:540px;padding:36px 32px;box-sizing:border-box;background:#fff">
      ${kicker('怎么用', a)}
      <div style="margin-top:16px;display:flex;flex-direction:column;gap:12px">${c.steps.map((s, k) => `<div style="display:flex;gap:16px;align-items:center;border-radius:16px;padding:16px 18px;background:${mix(a, '#FFFFFF', 0.92)}"><span style="flex:none;font:900 34px/1 ${FONT};color:${a}">${k + 1}</span><span style="font-size:18px;line-height:1.55;color:${INK}">${esc(s)}</span></div>`).join('')}</div>
      <div style="margin-top:26px">${kicker('谁在用', a)}</div>
      <div style="margin-top:12px">${chips(c.audience, INK, '#f1f1f4')}</div>
      ${limitBox}
    </div>`;
  }
  if (kind === 'story') {
    return `<div id="art" style="width:540px;padding:36px 32px;box-sizing:border-box;background:${mix(a, '#FFFFFF', 0.94)}">
      ${kicker('适合这些人', a)}
      <div style="margin-top:14px;display:flex;flex-direction:column;gap:10px">${c.audience.map((p) => `<div style="background:#fff;border-radius:16px;padding:16px 18px;font-size:18px;line-height:1.55;color:${INK};display:flex;gap:12px"><span style="flex:none;width:30px;height:30px;border-radius:50%;background:${mix(a, '#FFFFFF', 0.8)};display:grid;place-items:center;color:${a};font-weight:800">人</span>${esc(p)}</div>`).join('')}</div>
      <div style="margin-top:26px">${kicker('上手只要三步', a)}</div>
      <div style="margin-top:14px;display:grid;grid-template-columns:repeat(${Math.min(c.steps.length, 3)},1fr);gap:10px">${c.steps.map((s, k) => `<div style="background:${a};border-radius:16px;padding:16px 14px;color:#fff"><div style="font:800 15px/1 ${FONT};opacity:.75">第 ${k + 1} 步</div><div style="margin-top:8px;font-size:16px;line-height:1.55">${esc(s)}</div></div>`).join('')}</div>
    </div>`;
  }
  // bento：时间线 + 适合谁
  return `<div id="art" style="width:540px;padding:36px 32px;box-sizing:border-box;background:#fff">
    ${kicker('三步上手', a)}
    <div style="margin-top:18px;display:flex;flex-direction:column">${c.steps.map((s, k) => `<div style="display:flex;gap:16px"><div style="display:flex;flex-direction:column;align-items:center"><span style="width:40px;height:40px;border-radius:50%;background:${a};color:#fff;font-weight:800;font-size:20px;display:grid;place-items:center">${k + 1}</span>${k < c.steps.length - 1 ? `<i style="width:2px;flex:1;min-height:22px;background:${mix(a, '#FFFFFF', 0.7)}"></i>` : ''}</div><div style="padding:7px 0 22px;font-size:19px;line-height:1.55;color:${INK}">${esc(s)}</div></div>`).join('')}</div>
    <div style="margin-top:8px;border-radius:20px;padding:20px 22px;background:${mix(a, '#FFFFFF', 0.9)}">
      ${kicker('适合谁', a)}
      ${c.audience.map((p) => `<div style="margin-top:10px;font-size:18px;line-height:1.55;color:${INK}">· ${esc(p)}</div>`).join('')}
    </div>
    ${limitBox}
  </div>`;
}

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
  const a = colorsOf(t)[1];
  const st = styleOf(id) ?? { cover: 'split', cards: 'bento' };
  const frame = st.cover === 'phone' ? 'bare' : 'desktop';
  const dir = `${root}catalog/art/${id}`;
  mkdirSync(dir, { recursive: true });
  await shotEl(page, cover(x, t, a, st.cover), `${dir}/cover.jpg`, 800);
  await shotEl(page, card1(x, t, a, st.cards, frame), `${dir}/card1.jpg`, 540);
  await shotEl(page, card2(x, a, st.cards), `${dir}/card2.jpg`, 540);
  await shotEl(page, card3(x, a, st.cards), `${dir}/card3.jpg`, 540);
  n++;
  process.stdout.write('.');
}
await browser.close();
console.log(`\n图文素材 ${n} 套 → catalog/art/`);
