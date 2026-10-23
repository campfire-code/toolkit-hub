// 批量检查工具：node scripts/check-tools.mjs <编号...> [--build]
// 对每个工具跑类型检查与单元测试（加 --build 再跑前端构建），最后列出结果表。
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const root = new URL('..', import.meta.url).pathname;
const args = process.argv.slice(2);
const build = args.includes('--build');
const ids = args.filter((a) => !a.startsWith('--'));
const { tools } = JSON.parse(readFileSync(root + 'catalog/tools.json', 'utf8'));
const run = (cwd, cmd, a) => {
  const r = spawnSync(cmd, a, { cwd, encoding: 'utf8' });
  return { ok: r.status === 0, out: (r.stdout || '') + (r.stderr || '') };
};
const rows = [];
for (const id of ids) {
  const t = tools.find((x) => x.id === id);
  if (!t) { rows.push([id, '-', '总目录里没有']); continue; }
  const dir = `${root}tools/${t.slug}`;
  const tsc = run(dir, 'pnpm', ['exec', 'tsc', '--noEmit']);
  const test = run(dir, 'pnpm', ['test']);
  const passed = (test.out.match(/Tests\s+(\d+) passed/) || [])[1] ?? '?';
  const b = build ? run(dir, 'pnpm', ['build']) : { ok: true };
  const errs = (tsc.out.match(/error TS\d+/g) || []).length;
  rows.push([id, t.slug, `${tsc.ok ? '类型✓' : `类型✗(${errs})`} ${test.ok ? `测试✓(${passed})` : '测试✗'}${build ? (b.ok ? ' 构建✓' : ' 构建✗') : ''}`]);
  if (!tsc.ok) console.log(`--- ${t.slug} 类型错误（前 5 条）\n` + tsc.out.split('\n').filter((l) => l.includes('error TS')).slice(0, 5).join('\n'));
  if (!test.ok) console.log(`--- ${t.slug} 测试失败\n` + test.out.split('\n').filter((l) => /FAIL|Error|expected/.test(l)).slice(0, 8).join('\n'));
}
console.log(rows.map((r) => r.join('  ')).join('\n'));
