// 批量发版：node scripts/release-many.mjs <编号...>，同时最多 5 个（受 GitHub macOS 并发限制）
import { spawn } from 'node:child_process';

const root = new URL('..', import.meta.url).pathname;
const queue = process.argv.slice(2);
const LIMIT = 5;
const results = [];
const one = (id) => new Promise((done) => {
  const p = spawn('node', [root + 'scripts/release-tool.mjs', id], { cwd: root });
  let out = '';
  p.stdout.on('data', (d) => (out += d));
  p.stderr.on('data', (d) => (out += d));
  p.on('close', (code) => {
    const last = out.trim().split('\n').filter((l) => /已发布|失败|Error|不完整/.test(l)).pop() ?? out.trim().split('\n').pop();
    results.push(`${code === 0 ? '✅' : '❌'} ${id} ${last}`);
    console.log(results[results.length - 1]);
    done();
  });
});
const workers = Array.from({ length: LIMIT }, async () => {
  for (let id; (id = queue.shift()); ) await one(id);
});
await Promise.all(workers);
console.log(`\n共 ${results.length} 个，成功 ${results.filter((r) => r.startsWith('✅')).length} 个`);
