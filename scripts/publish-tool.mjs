// 把本地工具推到 campfire-code 组织：node scripts/publish-tool.mjs <编号>
// 首次：建公开仓库、加话题标签、推送；之后：提交改动并推送。总目录里状态改为 doing（发版后由 release-tool.mjs 改为 released）。
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const root = new URL('..', import.meta.url).pathname;
const ORG = 'campfire-code';
const CO = 'Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>';
const [id, ...rest] = process.argv.slice(2);
const message = rest.join(' ');
const catalogPath = root + 'catalog/tools.json';
const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
const t = catalog.tools.find((x) => x.id === id);
if (!t) throw new Error(`总目录里没有编号 ${id}`);
const dir = `${root}tools/${t.slug}`;
const sh = (cmd, args, opts = {}) => execFileSync(cmd, args, { cwd: dir, stdio: 'inherit', ...opts });
const out = (cmd, args) => execFileSync(cmd, args, { cwd: dir, encoding: 'utf8' }).trim();

if (!existsSync(`${dir}/.git`)) {
  sh('git', ['init', '-q', '-b', 'main']);
  sh('git', ['add', '-A']);
  sh('git', ['commit', '-q', '-m', message || `${t.name}：首个版本`, '-m', CO]);
  sh('gh', ['repo', 'create', `${ORG}/${t.slug}`, '--public', '--source', '.', '--push', '--description', `篝火出品 · ${t.name}：${t.desc}`.slice(0, 340)]);
  const topics = ['campfire-toolkit', { 电商运营: 'ecommerce', 微信私域: 'wechat', 内容生产: 'content-creation', 办公提效: 'productivity', 'AI 助手': 'ai-assistant' }[t.category], t.track === 'fork' ? 'chinese' : 'tauri'];
  sh('gh', ['repo', 'edit', `${ORG}/${t.slug}`, ...topics.flatMap((x) => ['--add-topic', x])]);
} else {
  sh('git', ['add', '-A']);
  if (out('git', ['status', '--porcelain'])) sh('git', ['commit', '-q', '-m', message || `更新 ${t.name}`, '-m', CO]);
  sh('git', ['push', '-q']);
}
t.repo = `${ORG}/${t.slug}`;
if (t.status === 'todo') t.status = 'doing';
writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n');
console.log(`已推送 https://github.com/${ORG}/${t.slug}`);
