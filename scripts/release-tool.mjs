// 发版：node scripts/release-tool.mjs <编号>
// 按 tool.json 的版本打标签并推送，等云端三平台出包完成，核对安装包齐全后把总目录里的状态改为 released。
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const root = new URL('..', import.meta.url).pathname;
const ORG = 'campfire-code';
const id = process.argv[2];
const catalogPath = root + 'catalog/tools.json';
const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
const t = catalog.tools.find((x) => x.id === id);
if (!t) throw new Error(`总目录里没有编号 ${id}`);
const dir = `${root}tools/${t.slug}`;
const repo = `${ORG}/${t.slug}`;
const out = (cmd, args) => execFileSync(cmd, args, { cwd: dir, encoding: 'utf8' }).trim();
const { version } = JSON.parse(readFileSync(`${dir}/tool.json`, 'utf8'));
const tag = `v${version}`;

if (out('git', ['status', '--porcelain'])) throw new Error('有未提交的改动，先运行 publish-tool.mjs');
if (!out('git', ['tag', '-l', tag])) {
  execFileSync('git', ['tag', tag], { cwd: dir });
  execFileSync('git', ['push', '-q', 'origin', tag], { cwd: dir });
}
let runId = '';
for (let i = 0; i < 30 && !runId; i++) {
  execFileSync('sleep', ['4']);
  runId = out('gh', ['run', 'list', '-R', repo, '--workflow', 'release', '--branch', tag, '--limit', '1', '--json', 'databaseId', '--jq', '.[0].databaseId // ""']);
}
if (!runId) throw new Error('没有找到出包流程');
console.log(`出包中：https://github.com/${repo}/actions/runs/${runId}`);
try {
  execFileSync('gh', ['run', 'watch', runId, '-R', repo, '--exit-status', '--interval', '30'], { stdio: 'ignore' });
} catch {
  throw new Error(`出包失败，查看 https://github.com/${repo}/actions/runs/${runId}`);
}
const assets = JSON.parse(out('gh', ['release', 'view', tag, '-R', repo, '--json', 'assets,url,isDraft']));
const want = ['mac-arm64.dmg', 'mac-x64.dmg', 'windows-x64-setup.exe'];
const missing = want.filter((w) => !assets.assets.some((a) => a.name.endsWith(w)));
if (missing.length || assets.isDraft) throw new Error(`发布不完整：缺 ${missing.join('、') || '（仍是草稿）'}`);
// 写回前重新读取，避免覆盖同时进行的其他发版的结果
const fresh = JSON.parse(readFileSync(catalogPath, 'utf8'));
Object.assign(fresh.tools.find((x) => x.id === id), { status: 'released', version, release: assets.url, repo });
writeFileSync(catalogPath, JSON.stringify(fresh, null, 2) + '\n');
console.log(`已发布 ${t.name} ${version}：${assets.url}`);
