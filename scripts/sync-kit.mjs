// 把模板里的公共部分同步到工具仓库：node scripts/sync-kit.mjs [编号...]（不写编号则同步 tools/ 下全部从模板生成的工具）
// 同步：src/kit、src/main.tsx、src/preview.tsx、preview.html、工作流引用、安装包的发布者与版权；工具自己的 src/tool 与 README 不动。
import { cpSync, existsSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';

const root = new URL('..', import.meta.url).pathname;
const tpl = root + 'tools/toolkit-template';
const { tools } = JSON.parse(readFileSync(root + 'catalog/tools.json', 'utf8'));
const ids = process.argv.slice(2);
const targets = tools.filter((t) => t.track !== 'fork' && existsSync(`${root}tools/${t.slug}/tool.json`) && (!ids.length || ids.includes(t.id)));

const FILES = ['src/main.tsx', 'src/preview.tsx', 'preview.html', '.github/workflows/release.yml', '.github/workflows/check.yml'];
const tplConf = JSON.parse(readFileSync(`${tpl}/src-tauri/tauri.conf.json`, 'utf8'));

for (const t of targets) {
  const dest = `${root}tools/${t.slug}`;
  rmSync(`${dest}/src/kit`, { recursive: true, force: true });
  cpSync(`${tpl}/src/kit`, `${dest}/src/kit`, { recursive: true });
  for (const f of FILES) cpSync(`${tpl}/${f}`, `${dest}/${f}`);
  const confPath = `${dest}/src-tauri/tauri.conf.json`;
  const conf = JSON.parse(readFileSync(confPath, 'utf8'));
  conf.bundle.publisher = tplConf.bundle.publisher;
  conf.bundle.copyright = tplConf.bundle.copyright;
  writeFileSync(confPath, JSON.stringify(conf, null, 2) + '\n');
  const meta = JSON.parse(readFileSync(`${dest}/tool.json`, 'utf8'));
  if (meta.license === 'MIT') cpSync(`${tpl}/LICENSE`, `${dest}/LICENSE`);
  console.log(`已同步 ${t.id} ${t.slug}`);
}
if (!targets.length) console.log('没有可同步的工具：', readdirSync(root + 'tools').join(', '));
