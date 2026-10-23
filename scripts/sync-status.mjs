// 以 GitHub 上的实际情况为准刷新总目录状态：node scripts/sync-status.mjs
// 组织下存在仓库 → 至少 doing；有正式发布且三个安装包齐全（或 fork 类有任意正式发布）→ released。
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const root = new URL('..', import.meta.url).pathname;
const ORG = 'campfire-code';
const catalogPath = root + 'catalog/tools.json';
const gh = (args) => { try { return execFileSync('gh', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { return ''; } };
const repos = new Set(gh(['repo', 'list', ORG, '--limit', '500', '--json', 'name', '--jq', '.[].name']).split('\n').filter(Boolean));
const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
let changed = 0;
for (const t of catalog.tools) {
  if (!repos.has(t.slug)) continue;
  const before = JSON.stringify(t);
  t.repo = `${ORG}/${t.slug}`;
  if (t.status === 'todo' || t.status === 'backlog') t.status = 'doing';
  const rel = gh(['release', 'view', '-R', t.repo, '--json', 'tagName,url,isDraft,assets', '--jq', '{tag: .tagName, url: .url, draft: .isDraft, names: [.assets[].name]}']);
  if (rel) {
    const r = JSON.parse(rel);
    const complete = t.track === 'fork' ? r.names.length > 0 : ['mac-arm64.dmg', 'mac-x64.dmg', 'windows-x64-setup.exe'].every((s) => r.names.some((n) => n.endsWith(s)));
    if (!r.draft && complete) Object.assign(t, { status: 'released', version: r.tag.replace(/^v/, ''), release: r.url });
  }
  if (JSON.stringify(t) !== before) { changed++; console.log(`${t.id} ${t.name}：${t.status}${t.version ? ' ' + t.version : ''}`); }
}
writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n');
console.log(`组织下 ${repos.size} 个仓库，更新了 ${changed} 个工具的状态`);
