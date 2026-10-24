// 列出某分类自研工具当前的界面布局与主色：node scripts/layout-map.mjs [分类]
import { existsSync, readFileSync } from 'node:fs';

const root = new URL('..', import.meta.url).pathname;
const tools = JSON.parse(readFileSync(root + 'catalog/tools.json', 'utf8')).tools;
const cat = process.argv[2];
const count = {};
for (const t of tools) {
  if (cat && t.category !== cat) continue;
  const f = `${root}tools/${t.slug}/tool.json`;
  if (t.track === 'fork' || !existsSync(f)) continue;
  const m = JSON.parse(readFileSync(f, 'utf8'));
  const mode = (readFileSync(`${root}tools/${t.slug}/src/tool/index.ts${existsSync(`${root}tools/${t.slug}/src/tool/index.ts`) ? '' : 'x'}`, 'utf8').match(/mode:\s*'(\w+)'/) ?? [])[1];
  count[m.ui.layout] = (count[m.ui.layout] ?? 0) + 1;
  console.log(`${t.id}  ${t.name}  布局 ${m.ui.layout}  ${mode ?? ''}  主色 ${m.ui.accent ?? m.ui.palette}`);
}
console.log('布局用量：', Object.entries(count).sort().map(([k, v]) => `${k}×${v}`).join('  '));
