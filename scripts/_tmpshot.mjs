// 给工具生成 README 截图：node scripts/shot.mjs <编号> [运行状态 running|done|empty]
// 启动该工具的开发预览页，用本机 Chrome 截一张亮色图到 tools/<slug>/docs/screenshot.png。
// 需要本机装有 Chrome（或设置环境变量 CHROME 指向浏览器可执行文件）。
import { spawn } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';
import { chromium } from 'playwright-core';

const root = new URL('..', import.meta.url).pathname;
const [id, state = 'running'] = process.argv.slice(2);
const t = JSON.parse(readFileSync(root + 'catalog/tools.json', 'utf8')).tools.find((x) => x.id === id);
if (!t) throw new Error(`总目录里没有编号 ${id}`);
const dir = `${root}tools/${t.slug}`;
const port = 1500 + Math.floor(Math.random() * 400);
const vite = spawn('pnpm', ['exec', 'vite', '--port', String(port), '--strictPort'], { cwd: dir, stdio: 'ignore' });
try {
  const url = `http://localhost:${port}/preview.html?state=${state}&mode=${process.env.MODE ?? "light"}`;
  for (let i = 0; i < 60; i++) {
    if (await fetch(url).then((r) => r.ok, () => false)) break;
    await new Promise((r) => setTimeout(r, 250));
  }
  const browser = await chromium.launch({ executablePath: process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const page = await browser.newPage({ viewport: { width: 1040, height: 700 }, deviceScaleFactor: 2 });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(url);
  await page.waitForTimeout(1200);
  mkdirSync(`${dir}/docs`, { recursive: true });
  await page.screenshot({ path: `/private/tmp/claude-501/-Users-wumin-Project-small-project/36472b09-269d-4dbf-8fa1-3149cf155cd5/scratchpad/w09-w11/${id}-${process.env.MODE ?? 'light'}.png`, fullPage: false });
  await browser.close();
  if (errors.length) throw new Error('预览页报错：\n' + errors.join('\n'));
  console.log(`已截图 /private/tmp/claude-501/-Users-wumin-Project-small-project/36472b09-269d-4dbf-8fa1-3149cf155cd5/scratchpad/w09-w11/${id}-${process.env.MODE ?? 'light'}.png`);
} finally {
  vite.kill();
}
