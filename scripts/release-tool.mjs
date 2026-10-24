// 发版：node scripts/release-tool.mjs <编号>
// 按 tool.json 的版本打标签并推送，等云端三平台出包完成，核对安装包齐全后把总目录里的状态改为 released。
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
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
const { version, delivery = 'desktop' } = JSON.parse(readFileSync(`${dir}/tool.json`, 'utf8'));
const tag = `v${version}`;

if (out('git', ['status', '--porcelain'])) throw new Error('有未提交的改动，先运行 publish-tool.mjs');
// 打包声明了 ffmpeg 但 tool.json 没开 ffmpeg 时，出包流程不会下载它，打包必然失败
const confPath = `${dir}/src-tauri/tauri.conf.json`;
if (delivery === 'desktop' && existsSync(confPath)) {
  const bins = JSON.parse(readFileSync(confPath, 'utf8')).bundle?.externalBin ?? [];
  const meta = JSON.parse(readFileSync(`${dir}/tool.json`, 'utf8'));
  if (bins.includes('binaries/ffmpeg') && !meta.ffmpeg) throw new Error('tauri.conf.json 声明了 ffmpeg，但 tool.json 没有 "ffmpeg": true；不用 ffmpeg 就删掉 externalBin 和 resources');
}
// fork 类工具的 origin 指向上游作者的仓库，标签只能推到 campfire 远程
const remotes = out('git', ['remote']).split('\n');
const remote = remotes.includes('campfire') ? 'campfire' : 'origin';
const remoteUrl = out('git', ['remote', 'get-url', remote]);
if (!remoteUrl.includes(`github.com/${ORG}/`)) throw new Error(`远程 ${remote}（${remoteUrl}）不是 ${ORG} 组织的仓库，拒绝推送`);
if (!out('git', ['tag', '-l', tag])) execFileSync('git', ['tag', tag], { cwd: dir });
// docs 文档类条目没有出包流程：直接建一个只含说明的发布
if (delivery === 'docs') {
  execFileSync('git', ['push', '-q', remote, tag], { cwd: dir });
  const url = out('gh', ['release', 'create', tag, '-R', repo, '--title', `${t.name} ${version}`, '--notes', `中文接入教程见仓库首页：https://github.com/${repo}#readme`]);
  const fresh = JSON.parse(readFileSync(catalogPath, 'utf8'));
  Object.assign(fresh.tools.find((x) => x.id === id), { status: 'released', version, release: url, repo });
  writeFileSync(catalogPath, JSON.stringify(fresh, null, 2) + '\n');
  console.log(`已发布 ${t.name} ${version}：${url}`);
  process.exit(0);
}
// 只认推送之后新建的运行，避免把同一标签上一次失败的运行当成这次
const pushedAt = new Date(Date.now() - 60_000).toISOString();
execFileSync('git', ['push', '-q', remote, tag], { cwd: dir });
let runId = '';
for (let i = 0; i < 30 && !runId; i++) {
  execFileSync('sleep', ['4']);
  runId = out('gh', ['run', 'list', '-R', repo, '--workflow', 'release', '--branch', tag, '--limit', '5', '--json', 'databaseId,createdAt', '--jq', `[.[] | select(.createdAt > "${pushedAt}")][0].databaseId // ""`]);
}
if (!runId) throw new Error('没有找到出包流程');
console.log(`出包中：https://github.com/${repo}/actions/runs/${runId}`);
try {
  execFileSync('gh', ['run', 'watch', runId, '-R', repo, '--exit-status', '--interval', '30'], { stdio: 'ignore' });
} catch {
  throw new Error(`出包失败，查看 https://github.com/${repo}/actions/runs/${runId}`);
}
const assets = JSON.parse(out('gh', ['release', 'view', tag, '-R', repo, '--json', 'assets,url,isDraft']));
// 不同交付方式要求的产物：desktop 三个安装包；mirror 至少一个上游安装包；launcher 启动脚本包；docker 部署文件；userscript 油猴脚本（docs 文档类在上面已单独处理）
const WANT = {
  desktop: ['mac-arm64.dmg', 'mac-x64.dmg', 'windows-x64-setup.exe'],
  mirror: ['SHA256SUMS.txt'],
  launcher: ['_portable.zip'],
  docker: ['docker-compose.yml'],
  userscript: ['.user.js', 'SHA256SUMS.txt'],
};
const want = WANT[delivery] ?? WANT.desktop;
const missing = want.filter((w) => !assets.assets.some((a) => a.name.endsWith(w)));
if (delivery === 'mirror' && assets.assets.length < 2) missing.push('上游安装包');
if (missing.length || assets.isDraft) throw new Error(`发布不完整：缺 ${missing.join('、') || '（仍是草稿）'}`);
// 写回前重新读取，避免覆盖同时进行的其他发版的结果
const fresh = JSON.parse(readFileSync(catalogPath, 'utf8'));
Object.assign(fresh.tools.find((x) => x.id === id), { status: 'released', version, release: assets.url, repo });
writeFileSync(catalogPath, JSON.stringify(fresh, null, 2) + '\n');
console.log(`已发布 ${t.name} ${version}：${assets.url}`);
