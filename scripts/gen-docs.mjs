// 由 catalog/tools.json 生成 README.md（总目录）与 docs/backlog.md（后做清单）。
// 用法：node scripts/gen-docs.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const root = new URL('..', import.meta.url).pathname;
const { tools } = JSON.parse(readFileSync(root + 'catalog/tools.json', 'utf8'));
const ORG = 'campfire-code';
const CATS = ['电商运营', '微信私域', '内容生产', '办公提效', 'AI 助手'];
const RISK = { low: '低', mid: '中', high: '高' };
const STATUS = { todo: '待做', doing: '进行中', released: '已发布', backlog: '后做', merged: '已并入其他工具' };

// 后做原因与重启时的第一步（2026-10-23 拍板时的判断）
const LATER = {
  w07: ['需要企业开通付费的会话存档，并告知员工与客户，前置条件多', '确认公司企微是否开通会话存档，拿到测试企业的 secret 与私钥'],
  w14: ['功能薄，单独成仓价值低', '考虑并入 w12「私域话术库快捷回复」作为一个模板分类'],
  w16: ['手机端这一期不做；上游已是成熟安卓应用', 'fork 上游，中文 README 与配置示例，沿用上游 APK'],
  w18: ['使用面窄，只对小程序开发者有用', '用 w17 Webhook 调试器的界面框架加一个订阅消息页'],
  w22: ['GPL 浏览器插件，多平台适配维护量大', 'fork 上游，确认各平台适配是否仍可用后再中文化'],
  c09: ['与 c06 离线字幕、c08 翻译配音功能重叠', '先看 c06、c08 的用户反馈，缺断句校对再做'],
  c13: ['需要 NVIDIA 显卡，上游为社区协议有限制，肖像需授权', '逐条阅读 Duix 社区协议，确认可再分发再决定'],
  c15: ['与 c14 直播录制重叠', '在 c14 基础上加「标记高光并切片」'],
  c22: ['需要全网相似内容检索，数据来源成本高', '先定检索来源（搜索 API 还是本地语料），再写比对'],
  c25: ['依赖剪映或字幕渲染方案', '等 c04 剪映草稿生成器稳定后，作为其中的花字模板模块'],
  c27: ['与 c26 多平台发布重叠，插件形态', 'fork 上游，中文化后与 c26 互相引用'],
  c28: ['登录态自动化，封号风险高', '只做「搜索与分析」只读功能，不做自动发布'],
  c32: ['依赖各后台导出文件格式，格式常变', '收集视频号、公众号后台导出样例文件后再写解析'],
  o03: ['模型大；上游有附加商用条款', '确认附加条款，评估只用 CPU 的小模型效果'],
  o06: ['依赖 Tesseract，Windows 打包复杂', '试用 RapidOCR 替代 Tesseract 生成文字层'],
  o09: ['各银行流水版式不同，需要大量样本', '收集 5 家常用银行的流水 PDF 样本'],
  o19: ['上游已有成熟安装包，中文化收益小', 'fork 上游，补中文界面与说明'],
  o20: ['与 o16 录音转文字、o18 会议纪要重叠', '在 o16 上加「生成图文」'],
  o22: ['AGPL，上游已有安装包', 'fork 上游，补中文说明与常用模型配置'],
  o23: ['安装包体积大，上游已成熟', 'fork 上游，预置「话术库 / 产品手册」模板'],
  o24: ['与电商运营主线关联弱', 'fork 上游，加小店常用收支分类'],
  o25: ['上游已归档，去水印有版权争议', '寻找仍在维护的替代项目'],
  a02: ['需要大模型多模态能力，成本与稳定性待验证', '用 midscene 跑一个真实后台的批量操作样例'],
  a03: ['与 a01 浏览器助手重叠，目标站合规需逐个确认', '先确定 3 个合规的采集目标'],
  a05: ['上游已是官方成熟项目，二次封装价值低', '只写中文接入教程，作为文档类条目'],
  a06: ['上游已归档', '寻找仍在维护的替代项目，或并入 a04 Excel AI 助手'],
};

const link = (t) => (t.repo ? `[${t.slug}](https://github.com/${t.repo})` : `\`${t.slug}\``);
const up = (t) => (t.upstream ? `[${t.upstream.repo}](https://github.com/${t.upstream.repo}) · ${t.upstream.license}` : '从零写');
const dl = (t) => (t.release ? `[下载](${t.release})` : '—');

// README 总目录
const done = tools.filter((t) => t.status === 'released').length;
const doList = tools.filter((t) => t.decision === 'do');
let md = `# 篝火开源工具箱

> 篝火出品 · 全部工具收录于篝火 App 应用区

面向电商运营、微信私域、内容生产、办公提效的开源小工具合集。每个工具是 [campfire-code](https://github.com/${ORG}) 组织下的独立仓库，提供源码与 Windows / macOS 安装包。

- 计划做 ${doList.length} 个，已发布 ${done} 个；另有 ${tools.length - doList.length} 个后做，见 [docs/backlog.md](docs/backlog.md)
- 总方案：[docs/00-总方案.md](docs/00-总方案.md)
- 本页由 \`node scripts/gen-docs.mjs\` 根据 \`catalog/tools.json\` 生成，不要手改

`;
for (const cat of CATS) {
  const list = doList.filter((t) => t.category === cat);
  md += `## ${cat}（${list.length}）\n\n| 编号 | 工具 | 能做什么 | 仓库 | 基于 | 风险 | 状态 | 安装包 |\n|---|---|---|---|---|---|---|---|\n`;
  for (const t of list) {
    md += `| ${t.id} | ${t.name}${t.listing === 'repo-only' ? '（仅开源）' : ''} | ${t.desc} | ${link(t)} | ${up(t)} | ${RISK[t.risk]} | ${STATUS[t.status] ?? t.status} | ${dl(t)} |\n`;
  }
  md += '\n';
}
md += `## 许可证

全部工具归属篝火（GitHub 组织 campfire-code），由篝火维护与更新。我们自己写的工具使用 MIT，版权方为篝火；基于 GPL / AGPL 项目的工具沿用上游协议，以各仓库 LICENSE 为准。标「仅开源」的工具存在封号、违反平台规则或侵权风险，仅供学习研究，使用后果自负。
`;
writeFileSync(root + 'README.md', md);

// 后做清单
const later = tools.filter((t) => t.decision === 'later');
const miss = later.filter((t) => !LATER[t.id]).map((t) => t.id);
if (miss.length) throw new Error('后做工具缺少说明：' + miss.join(','));
let bl = `# 后做清单（${later.length} 个）

2026-10-23 拍板时标为「后做」的工具。重启某个工具时：把 \`research/decisions.json\` 里它的值改为 \`do\`，运行 \`node scripts/gen-catalog.mjs && node scripts/gen-docs.mjs\`，再按总方案「每个工具的验收标准」做。

`;
for (const cat of CATS) {
  const list = later.filter((t) => t.category === cat);
  if (!list.length) continue;
  bl += `## ${cat}\n\n`;
  for (const t of list) {
    const [why, next] = LATER[t.id];
    bl += `### ${t.id} ${t.name}\n\n- 做什么：${t.desc}\n- 基于：${up(t)}；计划做法：${t.trackLabel}；形态：${t.form}；风险：${RISK[t.risk]}\n- 计划仓库名：\`${ORG}/${t.slug}\`\n- 为什么后做：${why}\n- 重启第一步：${next}\n\n`;
  }
}
writeFileSync(root + 'docs/backlog.md', bl);
console.log(`README：${doList.length} 个工具；backlog：${later.length} 个`);
