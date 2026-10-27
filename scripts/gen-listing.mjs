// 生成应用区上架材料：node scripts/gen-listing.mjs
// 取总目录里已发布、listing = store 的工具，向 GitHub 读最新 Release 的附件与更新说明、截图是否存在，
// 写出 catalog/store-listing.json 和给运营看的 catalog/store-listing.md。价格一律留空，由用户定。
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const root = new URL('..', import.meta.url).pathname;
const catalog = JSON.parse(readFileSync(root + 'catalog/tools.json', 'utf8'));
const gh = (args) => { try { return execFileSync('gh', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { return ''; } };

// 附件名 → 平台；按交付方式不同，附件形态不同
const PLATFORM = [
  [/mac-arm64\.dmg$|aarch64\.dmg$|arm64\.(dmg|pkg)$/i, 'macOS Apple 芯片'],
  [/mac-x64\.dmg$|x64\.dmg$|amd64\.pkg$|x86_64\.dmg$/i, 'macOS Intel'],
  [/mac-universal\.dmg$/i, 'macOS（Apple 芯片与 Intel 通用）'],
  [/\.(exe|msi)$|win.*\.zip$/i, 'Windows'],
  [/\.apk$/i, '安卓'],
  [/_portable\.zip$/i, 'Windows / macOS 双击启动包'],
  [/docker-compose\.yml$/i, 'Docker 部署文件'],
  [/\.user\.js$/i, '油猴脚本'],
  [/\.mcpb$/i, 'Claude Desktop 扩展'],
];
const platformOf = (name) => PLATFORM.find(([re]) => re.test(name))?.[1] ?? null;

const tools = catalog.tools.filter((t) => t.status === 'released' && t.listing === 'store');
const items = [];
for (const t of tools) {
  const rel = JSON.parse(gh(['release', 'view', '-R', t.repo, '--json', 'tagName,url,body,assets', '--jq', '{tag: .tagName, url: .url, body: .body, assets: [.assets[] | {name, url}]}']) || 'null');
  const metaB64 = gh(['api', `repos/${t.repo}/contents/tool.json`, '--jq', '.content']);
  const meta = metaB64 ? JSON.parse(Buffer.from(metaB64, 'base64').toString('utf8')) : {};
  const branch = gh(['api', `repos/${t.repo}`, '--jq', '.default_branch']) || 'main';
  const hasShot = !!gh(['api', `repos/${t.repo}/contents/docs/screenshot.png`, '--jq', '.sha']);
  const downloads = (rel?.assets ?? []).map((a) => ({ platform: platformOf(a.name), name: a.name, url: a.url })).filter((d) => d.platform);
  items.push({
    id: t.id,
    category: t.category,
    name: t.name,
    summary: t.desc,
    delivery: meta.delivery ?? 'desktop',
    price: null,
    version: t.version,
    releaseNotes: rel?.body ?? '',
    repoUrl: `https://github.com/${t.repo}`,
    releaseUrl: rel?.url ?? t.release,
    screenshot: hasShot ? `https://raw.githubusercontent.com/${t.repo}/${branch}/docs/screenshot.png` : null,
    downloads,
    upstream: t.upstream?.repo ?? null,
    risk: t.risk,
  });
  process.stdout.write('.');
}
items.sort((a, b) => a.category.localeCompare(b.category, 'zh') || a.id.localeCompare(b.id));
writeFileSync(root + 'catalog/store-listing.json', JSON.stringify({ generatedAt: new Date().toISOString(), note: '价格留空，由用户定', items }, null, 2) + '\n');

const DELIVERY = { desktop: '桌面安装包', mirror: '上游安装包', launcher: '双击启动包', docker: 'Docker 部署', userscript: '油猴脚本', docs: '接入教程', android: '安卓 APK' };
const lines = ['# 应用区上架材料', '', '> 由 `scripts/gen-listing.mjs` 生成，不要手改。价格留空，由用户定。交付方式在 campfire 后台选「资源链接」，填仓库地址和下载地址。', ''];
for (const cat of [...new Set(items.map((i) => i.category))]) {
  const list = items.filter((i) => i.category === cat);
  lines.push(`## ${cat}（${list.length} 个）`, '', '| 编号 | 名称 | 一句话简介 | 交付形式 | 版本 | 截图 | 下载 | 价格 |', '|---|---|---|---|---|---|---|---|');
  for (const i of list) {
    const dl = i.downloads.length ? `[${[...new Set(i.downloads.map((d) => d.platform))].join(' / ')}](${i.releaseUrl})` : `[发布页](${i.releaseUrl})`;
    lines.push(`| ${i.id} | [${i.name}](${i.repoUrl}) | ${i.summary} | ${DELIVERY[i.delivery] ?? i.delivery} | ${i.version} | ${i.screenshot ? `[看图](${i.screenshot})` : '无'} | ${dl} |  |`);
  }
  lines.push('');
}
writeFileSync(root + 'catalog/store-listing.md', lines.join('\n'));
const noShot = items.filter((i) => !i.screenshot).map((i) => i.id);
const noDl = items.filter((i) => !i.downloads.length).map((i) => i.id);
console.log(`\n上架材料 ${items.length} 个；无截图 ${noShot.length} 个：${noShot.join(' ')}；无可识别下载附件：${noDl.join(' ') || '无'}`);
