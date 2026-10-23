// 从拍板页源文件里的候选清单 + 用户选择，生成工具总目录 catalog/tools.json。
// 用法：node scripts/gen-catalog.mjs
// 已存在的 catalog/tools.json 里的 status / repo / release 等进度字段会保留，只刷新候选信息与选择。
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const root = new URL('..', import.meta.url).pathname;
const html = readFileSync(root + 'design/toolbox-plan.html', 'utf8');
const T = eval(html.match(/const T=(\[[\s\S]*?\n\]);/)[1]);
const CATS = { e: '电商运营', w: '微信私域', c: '内容生产', o: '办公提效', a: 'AI 助手' };
const decisions = JSON.parse(readFileSync(root + 'research/decisions.json', 'utf8'));

// 仓库名（组织下的仓库 slug）
const SLUG = {
  e01: '1688-to-pdd-listing', e02: 'temu-listing-sheet', e03: 'bg-remover-batch', e04: 'hd-product-cutout',
  e05: 'video-bg-remover', e06: 'detail-image-translator', e07: 'main-image-resizer', e08: 'sku-image-composer',
  e09: 'ai-title-writer', e10: 'banned-words-checker', e11: 'order-profit-reconciler', e12: 'doudian-batch-price',
  e13: 'shopee-batch-price', e14: 'amazon-order-export', e15: 'tiktokshop-listing', e16: 'sea-multistore',
  e17: 'crossborder-product-research', e18: 'shopee-profit-calculator', e19: 'amazon-asin-lookup', e20: 'review-insight',
  e21: 'express-exception-board', e22: 'purchase-order-export', e23: 'xianyu-monitor', e24: 'xianyu-auto-delivery',
  e25: 'ecom-ai-customer-service', e26: 'live-room-assistant', e27: 'douyin-danmaku-stats', e28: 'price-compare-crawler',
  e29: 'image-search-1688', e30: 'ecom-mcp-connector', e31: 'ai-detail-page', e32: 'product-image-to-video',
  w01: 'wechat-md-formatter', w02: 'wechat-draft-publisher', w03: 'wecom-group-ai-bot', w04: 'wecom-ai-service',
  w05: 'dify-wecom-connector', w06: 'wecom-customer-tagger', w07: 'wecom-archive-qa', w08: 'wecom-channel-qrcode',
  w09: 'wecom-churn-alert', w10: 'mp-weekly-report', w11: 'moments-daily-writer', w12: 'script-quick-reply',
  w13: 'chat-screenshot-to-crm', w14: 'group-welcome-templates', w15: 'wechat-alert-push', w16: 'sms-notify-forwarder',
  w17: 'bot-webhook-debugger', w18: 'mp-subscribe-msg-tester', w19: 'live-script-writer', w20: 'wechat-backup-exporter',
  w21: 'mp-article-exporter', w22: 'multi-platform-sync', w23: 'wechat-auto-reply-rpa', w24: 'wechat-hook-bot',
  w25: 'wechat-bulk-rpa', w26: 'wecom-group-manager-android', w27: 'channels-video-downloader', w28: 'bot-hub',
  c01: 'topic-to-short-video', c02: 'film-commentary-maker', c03: 'long-video-clipper', c04: 'jianying-draft-generator',
  c05: 'batch-video-remix', c06: 'offline-subtitle', c08: 'video-translate-dub', c09: 'subtitle-proofreader',
  c10: 'text-to-speech', c11: 'offline-voice', c12: 'voice-clone', c13: 'digital-human', c14: 'live-recorder',
  c15: 'live-record-clipper', c16: 'subtitle-watermark-remover', c17: 'xhs-card-maker', c18: 'cover-studio',
  c19: 'trending-radar', c20: 'title-ab-generator', c21: 'video-breakdown', c22: 'originality-checker',
  c23: 'ai-content-labeler', c24: 'asset-dedup', c25: 'subtitle-style-templates', c26: 'social-auto-upload',
  c27: 'multipost-extension', c28: 'xhs-ai-assistant', c29: 'video-downloader', c30: 'douyin-downloader',
  c31: 'comment-insight', c32: 'channels-mp-daily',
  o01: 'invoice-to-expense', o02: 'pdf-toolbox', o03: 'scan-to-word', o04: 'doc-to-markdown', o05: 'batch-ocr',
  o06: 'searchable-pdf', o07: 'excel-split-merge', o08: 'excel-to-word-batch', o09: 'bank-statement-to-excel',
  o10: 'bill-reconciler', o11: 'ofd-to-pdf', o12: 'batch-rename', o13: 'image-compressor', o14: 'id-photo',
  o15: 'batch-qrcode-labels', o16: 'speech-to-text', o17: 'call-qa', o18: 'meeting-minutes', o19: 'voice-typing',
  o20: 'media-to-article', o21: 'screenshot-translate', o22: 'pdf-bilingual-translate', o23: 'local-knowledge-qa',
  o24: 'shop-bookkeeping', o25: 'image-inpaint',
  a01: 'browser-agent', a02: 'backend-batch-bot', a03: 'web-data-collector', a04: 'excel-mcp', a05: 'browser-mcp',
  a06: 'word-mcp',
};

// 做法：fork = 直接 fork 现成应用后中文化、补安装包；wrap = 我们写桌面界面，调用开源库；own = 从零写
const FORK = new Set(['e22', 'e23', 'e24', 'e25', 'e26', 'e27', 'e28', 'e29', 'e30', 'w01', 'w02', 'w03', 'w04',
  'w05', 'w20', 'w21', 'w23', 'w24', 'w25', 'w26', 'w27', 'w28', 'c01', 'c02', 'c03', 'c05', 'c08', 'c12', 'c13',
  'c14', 'c15', 'c16', 'c19', 'c26', 'c27', 'c28', 'c30', 'o18', 'o22', 'o23', 'o24', 'o25', 'o19', 'o20', 'a02',
  'a03', 'a04', 'a05', 'a06', 'w16', 'w22', 'c09', 'o03', 'o06']);
const TRACK_LABEL = { own: '从零写', wrap: '自研界面 + 开源库', fork: 'fork 中文化 + 安装包' };


// 界面类型（只对自研界面的工具有意义）：media 图片视频 / data 表格文档 / text 文案生成
const UITYPE = {
  media: ['e03', 'e04', 'e05', 'e06', 'e07', 'e08', 'e31', 'e32', 'c04', 'c06', 'c10', 'c11', 'c17', 'c18', 'c23', 'c24', 'c29', 'o13', 'o14'],
  data: ['e01', 'e02', 'e11', 'e12', 'e13', 'e14', 'e15', 'e16', 'e17', 'e18', 'e19', 'e20', 'e21', 'w06', 'w08', 'w09', 'w10', 'w13', 'w15',
    'o01', 'o02', 'o04', 'o05', 'o07', 'o08', 'o10', 'o11', 'o12', 'o15', 'o16', 'o17', 'a01', 'w14', 'w18', 'c22', 'c25', 'c32', 'o09', 'w07'],
  text: ['e09', 'e10', 'w11', 'w12', 'w17', 'w19', 'c20', 'c21', 'c31', 'o21'],
};
const uiTypeOf = Object.fromEntries(Object.entries(UITYPE).flatMap(([k, ids]) => ids.map((id) => [id, k])));

// 界面抽签：规则与拍板页 design/ui-versions.html 一致（research/ui-decisions.json）
const uiDecisions = JSON.parse(readFileSync(root + 'research/ui-decisions.json', 'utf8'));
const LAYOUT_SUITS = { a: ['data', 'media', 'text'], b: ['data', 'media'], c: ['data', 'media', 'text'], d: ['media'], e: ['media', 'data', 'text'], f: ['text', 'media', 'data'] };
const LAYOUT_PALETTES = { a: ['blue', 'teal', 'rose'], b: ['teal', 'blue', 'amber'], c: ['orange', 'rose', 'green'], d: ['amber', 'teal', 'violet'], e: ['green', 'blue', 'orange'], f: ['violet', 'rose', 'teal'] };
function hash(str) {
  let h = 2166136261;
  for (const c of str) { h ^= c.codePointAt(0); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
export function drawUi(id, type) {
  let pool = Object.keys(LAYOUT_SUITS).filter((k) => uiDecisions.pool[k]);
  if (uiDecisions.q.q_assign === 'typed') {
    const f = pool.filter((k) => LAYOUT_SUITS[k].includes(type));
    if (f.length) pool = f;
  }
  const layout = pool[hash(id + '#layout') % pool.length];
  const palette = uiDecisions.q.q_palette === 'draw' ? LAYOUT_PALETTES[layout][hash(id + '#color') % 3] : LAYOUT_PALETTES[layout][0];
  return { layout, palette };
}

const prev = existsSync(root + 'catalog/tools.json')
  ? Object.fromEntries(JSON.parse(readFileSync(root + 'catalog/tools.json', 'utf8')).tools.map((t) => [t.id, t]))
  : {};

const tools = T.map(([id, cat, name, desc, base, star, license, form, risk, rec, first]) => {
  const decision = decisions.tools[id] ?? rec;
  const track = !base ? 'own' : FORK.has(id) ? 'fork' : 'wrap';
  const p = prev[id] ?? {};
  return {
    id, slug: SLUG[id], category: CATS[cat], name, desc,
    upstream: base ? { repo: base, stars: star, license } : null,
    form, risk, recommended: rec, decision,
    firstBatch: Boolean(first) && decision === 'do',
    track, trackLabel: TRACK_LABEL[track],
    // 高风险工具按选择「开源但不上架应用区」
    listing: risk === 'high' ? 'repo-only' : 'store',
    uiType: track === 'fork' ? null : uiTypeOf[id] ?? null,
    ui: track === 'fork' || !uiTypeOf[id] ? null : drawUi(id, uiTypeOf[id]),
    status: p.status ?? (decision === 'do' ? 'todo' : 'backlog'),
    repo: p.repo ?? null, version: p.version ?? null, release: p.release ?? null, notes: p.notes ?? '',
  };
});

const missing = tools.filter((t) => !t.slug).map((t) => t.id);
const noType = tools.filter((t) => t.track !== 'fork' && !t.uiType).map((t) => t.id);
if (noType.length) throw new Error('自研界面的工具缺界面类型：' + noType.join(','));
if (missing.length) throw new Error('缺仓库名：' + missing.join(','));
if (new Set(tools.map((t) => t.slug)).size !== tools.length) throw new Error('仓库名重复');

writeFileSync(root + 'catalog/tools.json', JSON.stringify({
  generatedAt: new Date().toISOString(), decisionsSource: decisions.source, engineering: decisions.q, tools,
}, null, 2) + '\n');

const count = (f) => tools.filter(f).length;
console.log(`共 ${tools.length}：做 ${count((t) => t.decision === 'do')}（首批 ${count((t) => t.firstBatch)}），后做 ${count((t) => t.decision === 'later')}，不做 ${count((t) => t.decision === 'no')}`);
for (const k of ['own', 'wrap', 'fork']) console.log(`  ${TRACK_LABEL[k]}：${count((t) => t.decision === 'do' && t.track === k)}`);
console.log(`  只开源不上架：${count((t) => t.decision === 'do' && t.listing === 'repo-only')}`);
