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
const FORK = new Set(['a01', 'e22', 'e23', 'e24', 'e25', 'e26', 'e27', 'e28', 'e29', 'e30', 'w01', 'w03', 'w04',
  'w05', 'w20', 'w21', 'w23', 'w24', 'w25', 'w26', 'w27', 'w28', 'c01', 'c02', 'c03', 'c05', 'c08', 'c12', 'c13',
  'c14', 'c15', 'c16', 'c26', 'c27', 'c28', 'c30', 'o18', 'o22', 'o23', 'o24', 'o25', 'o19', 'o20', 'a02',
  'a03', 'a04', 'a05', 'a06', 'w16', 'w22', 'c09', 'o03', 'o06']);
const TRACK_LABEL = { own: '从零写', wrap: '自研界面 + 开源库', fork: 'fork 中文化 + 安装包' };


// 界面类型（只对自研界面的工具有意义）：media 图片视频 / data 表格文档 / text 文案生成
const UITYPE = {
  media: ['e03', 'e04', 'e05', 'e06', 'e07', 'e08', 'e31', 'e32', 'c04', 'c06', 'c10', 'c11', 'c17', 'c18', 'c23', 'c24', 'c29', 'o13', 'o14', 'c05'],
  data: ['e01', 'e02', 'e11', 'e12', 'e13', 'e14', 'e15', 'e16', 'e17', 'e18', 'e19', 'e20', 'e21', 'w06', 'w08', 'w09', 'w10', 'w13', 'w15',
    'o01', 'o02', 'o04', 'o05', 'o07', 'o08', 'o10', 'o11', 'o12', 'o15', 'o16', 'o17', 'a01', 'w14', 'w18', 'c22', 'c25', 'c32', 'o09', 'w07', 'e25', 'e27', 'e28', 'e29', 'w23', 'w24', 'w16'],
  text: ['w02', 'c19', 'e09', 'e10', 'w11', 'w12', 'w17', 'w19', 'c20', 'c21', 'c31', 'o21'],
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

// 实际使用的上游与拍板页候选不同时，以实际为准
// 做出来的功能和调研时的一句话不同，以实际为准
const DESC_FIX = {
  // 2026-10-24 写应用区文案时按 README 核对出的不准确说法（夸大或缺失），改用 catalog/copy 里的 summary
  e18: '按你填的费率，算 Shopee 商品的佣金、物流、毛利、利润率和保本售价，可批量',
  e10: '上架前自检标题、详情、文案里的广告法违禁词，标出风险并给修改建议',
  o18: '在自己电脑上录会议、实时转写，再用大模型生成会议摘要与待办',
  e30: '让支持 MCP 的 AI 助手只读查询你自己店铺的订单、售后等数据',
  o02: 'PDF 合并、拆分、删页、加水印、转图片，全在本机完成',
  e32: '多张商品图自动推拉运镜、加转场和标题，合成一条短视频',
  c24: '扫描图片文件夹，找出完全相同和近似重复的图片，一键移到待删除文件夹',
  w11: '按商品信息和节日日历生成每天的朋友圈文案、配图建议和首评，导出排期表',
  c19: '一次看 14 个中文热榜，按关键词高亮命中的热点，可导出 Excel',
  c17: '输入正文自动分页，生成整套小红书图文卡片，导出 1080×1440 PNG',
  c14: '监控直播间状态，开播自动录制，录完可转成 mp4',
  w20: '把自己 iPhone 备份里的微信聊天记录，导出成 HTML、PDF 或文本',
  c21: '粘贴文案或导入字幕，AI 拆成钩子、分镜、话术节奏表',
  w15: '读库存表和订单表，异常时推到企微 / 钉钉 / 飞书群',
  e21: '导入运单表或用快递100 接口，列出停滞件、退回件并导出',
  w09: '按最后互动时间（导入）或添加时间分级列出沉睡客户，同步对比发现流失',
  e16: '导入各店订单表和库存表，出多店汇总与 SKU 跨店对照',
  e17: '导入商品表，按利润、需求、竞争、口碑打分排名并出选品报告',
  e19: '批量 ASIN 走亚马逊官方 Creators API 查标题、价格，导出 Excel',
  c10: '离线合成中英混读配音（Kokoro 多音色），导出 MP3 / WAV 和对齐字幕',
  o16: '本机离线转写录音，导出带时间戳的 TXT / Word / SRT（不区分说话人）',
  e22: '油猴脚本：导出淘宝「已买到的宝贝」订单（不含 1688），用来和入库对账',
};
// 调研时列的上游最后没用（例如出于合规改走官方接口），按自研处理
// e28 w23 w24 e25 e27 e29 c05：上游附加了非商用 / 商业需授权声明，2026-10-23 用户定为只借思路自研
const NO_UPSTREAM = new Set(['e16', 'e17', 'e19', 'w08', 'e28', 'w23', 'w24', 'e25', 'e27', 'e29', 'c05', 'w16']);
const UPSTREAM_FIX = { o02: { repo: 'Hopding/pdf-lib', stars: '8.7k', license: 'MIT' }, o15: { repo: 'soldair/node-qrcode', stars: '', license: 'MIT' }, o04: { repo: 'mwilliamson/mammoth.js', stars: '', license: 'BSD-2-Clause' }, a01: { repo: 'browser-use/web-ui', stars: '16.6k', license: 'MIT' }, c06: { repo: 'huggingface/transformers.js', stars: '', license: 'Apache-2.0' }, e05: { repo: 'danielgatis/rembg', stars: '', license: 'MIT' }, o16: { repo: 'huggingface/transformers.js', stars: '', license: 'Apache-2.0' }, o17: { repo: 'huggingface/transformers.js', stars: '', license: 'Apache-2.0' }, c29: { repo: 'yt-dlp/yt-dlp', stars: '', license: 'Unlicense' }, c10: { repo: 'k2-fsa/sherpa-onnx', stars: '', license: 'Apache-2.0' } };

// 改名：用户 2026-10-24 要求产品里只能有中文（术语表允许的原文除外）
const NAME_FIX = { w17: '群机器人调试器', a05: '浏览器助手（AI 接入教程）' };

const tools = T.map(([id, cat, name, desc, base, star, license, form, risk, rec, first]) => {
  const decision = decisions.tools[id] ?? rec;
  if (NO_UPSTREAM.has(id)) base = '';
  const track = !base ? 'own' : FORK.has(id) ? 'fork' : 'wrap';
  const p = prev[id] ?? {};
  return {
    id, slug: SLUG[id], category: CATS[cat], name: NAME_FIX[id] ?? name, desc: DESC_FIX[id] ?? desc,
    upstream: UPSTREAM_FIX[id] ?? (base ? { repo: base, stars: star, license } : null),
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

// 队友自带的工具：不在拍板页候选里，界面不用工具箱外壳（uiType 为空）
const EXTRA = [
  { id: 'o26', slug: 'Boundless', category: '办公提效', name: '无界', desc: '一套键盘鼠标控制两台电脑（Mac ↔ Mac、Mac ↔ Windows），鼠标推到屏幕边缘即切换，自动同步剪贴板', form: '桌面', repo: 'campfire-code/Boundless', version: '0.2.0', release: 'https://github.com/campfire-code/Boundless/releases/tag/v0.2.0' },
];
// 用户个人应用重构（docs/个人应用重构方案.md，2026-10-27 拍板全部上架）：参考用户的私有仓库新建重写，对应关系见本机方案文档
// uiType 有值的用桌面模板生成；为空的是手机网页、安卓、资料包、游戏，单独建仓
const PERSONAL = [
  ['c33', 'live-speech-pace', '内容生产', '直播语速告警器', '直播时实时测说话快慢，太快就响铃提醒，纯本地不录音', 'media', 'personal'],
  ['o27', 'live-review-to-feishu', '办公提效', '主播复盘入表台', '上传抖音、视频号、快手直播复盘截图，识别关键指标一键写进飞书多维表格', 'data', 'personal'],
  ['c34', 'douyin-live-review', '内容生产', '抖音直播复盘分析', '导出每场直播的话术与每分钟人数，标出留人和掉人的时段', 'data', 'personal'],
  ['w29', 'quiz-lead-game', '微信私域', '行业答题获客', '可换题库、可换品牌的手机答题小游戏，答完看段位、领资料、引导加微信', null, 'personal'],
  ['o28', 'notes-star-map', '办公提效', '笔记知识星图', '导入自己的笔记，生成能点能拖的知识星空图，看清知识之间的联系', 'data', 'personal'],
  ['a07', 'ai-coding-installer', 'AI 助手', 'AI 编程工具一键安装器', '双击装好 Claude Code、Codex 等 AI 编程工具，自填接口自动配好，安装报错有引导', 'text', 'personal'],
  ['c35', 'ai-room-render', '内容生产', 'AI 装修效果图', '上传房间照片，选材质和风格，用自填的图像模型生成装修效果图', 'media', 'personal'],
  ['o29', 'cron-task-board', '办公提效', '定时任务看板', '监控本机定时脚本的运行日志与产出文件，30 天运行热力图', 'data', 'personal'],
  ['e33', 'alibaba-customs-filler', '电商运营', '一达通报关单填写助手', '选客户 Excel，自动在阿里一达通填好报关草稿并校验，正式申报留给人工', 'data', 'personal'],
  ['a08', 'android-automation-base', 'AI 助手', '安卓自动化底座', '装在安卓手机上，电脑配对后远程点击、滑动、截图，每步留日志', null, 'personal'],
  ['a09', 'ai-adoption-handbook', 'AI 助手', 'AI 落地方法论手册', 'AI 工具安装、上手与落地方法论资料包（已脱敏）', null, 'personal'],
  ['e34', 'waimai-ops-handbook', '电商运营', '外卖经营方法论手册', '外卖、选址、抖音同城、开店的经营方法论资料包（已脱敏）', null, 'personal'],
  ['x01', 'ocean-trade-voyage', '休闲游戏', '原创航海经商游戏', '原创世界的像素风航海经商游戏：航行、靠港、贸易、造船、海战', null, 'personal'],
  ['e35', 'meituan-bid-pacer', '电商运营', '美团点金调价助手', '按昨日曝光分配每小时推广预算，给出点金出价建议，自动保存默认关闭', 'data', 'personal'],
  ['e36', 'meituan-store-collector', '电商运营', '美团门店数据采集（安卓）', '在手机上读取美团商家后台的订单、商品、评价数据存本机，写操作默认关闭', null, 'personal'],
  ['c36', 'zsxq-post-helper', '内容生产', '知识星球发帖助手', '扫码登录知识星球后，一篇篇发图文帖并存档，可 AI 配图', 'text', 'personal'],
  ['w30', 'group-recharge-ledger', '微信私域', '群充值单识别记账', '识别群里的充值文本和转账截图，登记对账并导出 Excel', 'data', 'personal'],
  ['a10', 'okx-contract-monitor', 'AI 助手', 'OKX 合约监控与策略', '监控 OKX 合约持仓与盈亏，策略默认模拟盘运行，实盘需双重确认', 'data', 'personal'],
  ['w31', 'wechat-message-assistant', '微信私域', '个微消息助手（安卓）', '安卓无障碍读取个人微信新消息，按规则提醒与辅助回复（从零重写）', null, 'personal'],
];
for (const [id, slug, category, name, desc, uiType, ref] of PERSONAL)
  EXTRA.push({ id, slug, category, name, desc, form: uiType ? '桌面' : '其他', uiType, ref, status: 'todo' });
for (const x of EXTRA) {
  const p = prev[x.id] ?? {};
  tools.push({
    id: x.id, slug: x.slug, category: x.category, name: x.name, desc: x.desc, upstream: null,
    form: x.form, risk: 'low', recommended: 'do', decision: 'do', firstBatch: false,
    track: 'own', trackLabel: TRACK_LABEL.own, listing: 'store', uiType: x.uiType ?? null, ui: x.uiType ? drawUi(x.id, x.uiType) : null,
    status: p.status ?? x.status ?? 'released', repo: p.repo ?? x.repo ?? null, version: p.version ?? x.version ?? null, release: p.release ?? x.release ?? null,
    notes: p.notes ?? (x.ref ? '参考用户个人应用重写' : '队友自带'),
  });
}
if (missing.length) throw new Error('缺仓库名：' + missing.join(','));
if (new Set(tools.map((t) => t.slug)).size !== tools.length) throw new Error('仓库名重复');

writeFileSync(root + 'catalog/tools.json', JSON.stringify({
  generatedAt: new Date().toISOString(), decisionsSource: decisions.source, engineering: decisions.q, tools,
}, null, 2) + '\n');

const count = (f) => tools.filter(f).length;
console.log(`共 ${tools.length}：做 ${count((t) => t.decision === 'do')}（首批 ${count((t) => t.firstBatch)}），后做 ${count((t) => t.decision === 'later')}，不做 ${count((t) => t.decision === 'no')}`);
for (const k of ['own', 'wrap', 'fork']) console.log(`  ${TRACK_LABEL[k]}：${count((t) => t.decision === 'do' && t.track === k)}`);
console.log(`  只开源不上架：${count((t) => t.decision === 'do' && t.listing === 'repo-only')}`);
