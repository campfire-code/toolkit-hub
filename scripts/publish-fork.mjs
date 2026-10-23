// 推送 fork 类工具：node scripts/publish-fork.mjs <编号> [提交说明]
// tools/<slug> 是上游仓库的本地克隆，改动已提交在当前分支上。首次会在 campfire-code 下 fork 上游，然后推送当前分支到 fork 的默认分支。
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const root = new URL('..', import.meta.url).pathname;
const ORG = 'campfire-code';
const CO = 'Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>';
const [id, ...rest] = process.argv.slice(2);
const catalogPath = root + 'catalog/tools.json';
const t = JSON.parse(readFileSync(catalogPath, 'utf8')).tools.find((x) => x.id === id);
if (!t) throw new Error(`总目录里没有编号 ${id}`);
const dir = `${root}tools/${t.slug}`;
const meta = JSON.parse(readFileSync(`${dir}/tool.json`, 'utf8'));
const up = meta.upstream?.repo;
if (!up) throw new Error('tool.json 里没有 upstream.repo');
const sh = (cmd, args, opts = {}) => execFileSync(cmd, args, { cwd: dir, stdio: 'inherit', ...opts });
const out = (cmd, args) => { try { return execFileSync(cmd, args, { cwd: dir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { return ''; } };

// 图标：桌面壳工程还是默认图标时生成篝火图标
const appDir = existsSync(`${dir}/apps/desktop/src-tauri`) ? `${dir}/apps/desktop` : existsSync(`${dir}/src-tauri`) ? dir : null;
if (appDir && !existsSync(`${appDir}/src-tauri/icons/.campfire`)) execFileSync('node', [root + 'scripts/make-icon.mjs', id, appDir.slice(root.length)], { stdio: 'inherit' });

sh('git', ['add', '-A']);
if (out('git', ['status', '--porcelain'])) sh('git', ['commit', '-q', '--no-verify', '-m', rest.join(' ') || `chore: campfire packaging for ${t.slug}`, '-m', CO]);

const repo = `${ORG}/${t.slug}`;
if (!out('gh', ['repo', 'view', repo, '--json', 'name', '--jq', '.name'])) {
  sh('gh', ['repo', 'fork', up, '--org', ORG, '--fork-name', t.slug, '--clone=false']);
  execFileSync('sleep', ['5']);
}
const branch = out('gh', ['repo', 'view', repo, '--json', 'defaultBranchRef', '--jq', '.defaultBranchRef.name']) || 'main';
if (!out('git', ['remote', 'get-url', 'campfire'])) sh('git', ['remote', 'add', 'campfire', `https://github.com/${repo}.git`]);
sh('git', ['push', '-q', 'campfire', `HEAD:${branch}`]);
sh('gh', ['api', '-X', 'PUT', `repos/${repo}/actions/permissions`, '-F', 'enabled=true', '-f', 'allowed_actions=all'], { stdio: 'ignore' });
const topics = ['campfire-toolkit', { 电商运营: 'ecommerce', 微信私域: 'wechat', 内容生产: 'content-creation', 办公提效: 'productivity', 'AI 助手': 'ai-assistant' }[t.category], 'chinese'];
sh('gh', ['repo', 'edit', repo, '--description', `篝火出品 · ${t.name}（基于 ${up}）：${t.desc}`.slice(0, 340), ...topics.flatMap((x) => ['--add-topic', x])], { stdio: 'ignore' });

const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
const ft = catalog.tools.find((x) => x.id === id);
ft.repo = repo;
if (ft.status === 'todo') ft.status = 'doing';
writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n');
console.log(`已推送 https://github.com/${repo}（分支 ${branch}）`);
