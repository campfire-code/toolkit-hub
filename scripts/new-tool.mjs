// 从模板生成一个工具仓库：node scripts/new-tool.mjs <编号> [--push]
// 生成到 tools/<slug>，填好 tool.json、包名、窗口标题、安装包信息、README。
// --push：在 campfire-code 组织下建公开仓库并推送，同时把总目录里该工具的状态改为 doing。
import { cpSync, existsSync, readFileSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const root = new URL('..', import.meta.url).pathname;
const ORG = 'campfire-code';
const [id, ...flags] = process.argv.slice(2);
const push = flags.includes('--push');
const catalogPath = root + 'catalog/tools.json';
const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
const t = catalog.tools.find((x) => x.id === id);
if (!t) throw new Error(`总目录里没有编号 ${id}`);
if (t.track === 'fork') throw new Error(`${id} 是 fork 类工具，不从模板生成`);
if (!t.ui) throw new Error(`${id} 没有界面抽签结果，先运行 node scripts/gen-catalog.mjs`);

const tpl = root + 'tools/toolkit-template';
const dest = root + 'tools/' + t.slug;
if (existsSync(dest)) throw new Error(`${dest} 已存在`);

const SKIP = ['node_modules', 'dist', 'src-tauri/target', 'src-tauri/gen', '.git'];
cpSync(tpl, dest, {
  recursive: true,
  filter: (src) => !SKIP.some((s) => src === `${tpl}/${s}` || src.startsWith(`${tpl}/${s}/`)),
});

const json = (p, fn) => {
  const f = `${dest}/${p}`;
  const v = JSON.parse(readFileSync(f, 'utf8'));
  fn(v);
  writeFileSync(f, JSON.stringify(v, null, 2) + '\n');
};
json('tool.json', (v) => {
  Object.assign(v, { id: t.id, slug: t.slug, name: t.name, version: '0.1.0', repo: `${ORG}/${t.slug}`, ui: t.ui });
  v.upstream = t.upstream ? { repo: t.upstream.repo, license: t.upstream.license } : null;
  v.license = 'MIT';
});
json('package.json', (v) => { v.name = t.slug; v.version = '0.1.0'; });
json('src-tauri/tauri.conf.json', (v) => {
  v.productName = t.name.replace(/[\\/:*?"<>|]/g, ' ').trim();
  v.mainBinaryName = t.slug;
  v.identifier = `com.campfirecode.${t.slug.replace(/[^a-z0-9]/g, '')}`;
  v.version = '0.1.0';
  v.app.windows[0].title = t.name;
  v.bundle.shortDescription = t.name;
});

// 模板里的样例工具（图片批量压缩）只给 o13 保留；其他工具放一个待实现的骨架
if (t.id !== 'o13') {
  rmSync(`${dest}/src/tool`, { recursive: true, force: true });
  mkdirSync(`${dest}/src/tool`);
  writeFileSync(`${dest}/src/tool/core.ts`, '// 纯函数：不依赖界面和本机能力，便于单元测试。\n');
  writeFileSync(`${dest}/src/tool/core.test.ts`, "import { describe, it } from 'vitest';\n\ndescribe('core', () => {\n  it.todo('补充核心逻辑测试');\n});\n");
  writeFileSync(`${dest}/src/tool/index.ts`, `// 工具声明：${t.name}
import type { ToolDef } from '../kit/types';

const tool: ToolDef = {
  id: '${t.id}',
  name: '${t.name}',
  tagline: '${t.desc.replace(/'/g, "\\'")}',
  category: '${t.category}',
  type: '${t.uiType}',
  mode: 'batch',
  resultView: 'list',
  accept: { label: '文件', extensions: [] },
  params: [{ key: 'out', label: '保存到', type: 'folder', default: '' }],
  async run() {
    throw new Error('还没有实现');
  },
};

export default tool;
`);
}

const up = t.upstream
  ? `\n## 致谢\n\n本工具基于开源项目 [${t.upstream.repo}](https://github.com/${t.upstream.repo})（${t.upstream.license}）。\n`
  : '';
const risk = t.listing === 'repo-only'
  ? '\n> [!WARNING]\n> 本工具涉及第三方平台的自动化或内容获取，存在账号被限制、违反平台规则或侵权的风险，仅供学习研究。请遵守平台规则与法律法规，使用后果自负。\n'
  : '';
writeFileSync(`${dest}/README.md`, `# ${t.name}

> 篝火出品 · 收录于篝火 App 应用区
${risk}
${t.desc}

![界面截图](docs/screenshot.png)

## 下载

到 [Releases](https://github.com/${ORG}/${t.slug}/releases/latest) 下载对应安装包：

| 电脑 | 文件 |
|---|---|
| Windows 10 / 11 | \`${t.slug}_版本号_windows-x64-setup.exe\` |
| Mac（Apple 芯片） | \`${t.slug}_版本号_mac-arm64.dmg\` |
| Mac（Intel 芯片） | \`${t.slug}_版本号_mac-x64.dmg\` |

第一次打开：
- **Windows**：如果弹出「Windows 已保护你的电脑」，点「更多信息」→「仍要运行」。
- **Mac**：如果提示「无法验证开发者」，打开「系统设置 → 隐私与安全性」，在下方点「仍要打开」。

## 怎么用

<!-- 使用步骤 -->

## 验收用例

<!-- 用 samples/ 里的示例文件按步骤操作，应得到的结果 -->

## 自己编译

需要 Node.js 22、pnpm、Rust。

\`\`\`bash
pnpm install
pnpm test          # 单元测试
pnpm tauri dev     # 开发运行
pnpm tauri build   # 打包
\`\`\`

界面框架在 \`src/kit\`（所有 campfire-code 工具共用），本工具的逻辑在 \`src/tool\`。
${up}
## 归属

本工具由**篝火**出品，是篝火 App 应用区收录的开源工具之一，由篝火（GitHub 组织 [${ORG}](https://github.com/${ORG})）维护与更新。全部工具的目录见 [toolkit-hub](https://github.com/${ORG}/toolkit-hub)。

## 许可证

MIT，版权方为篝火（campfire-code）。
`);
writeFileSync(`${dest}/CHANGELOG.md`, '# 更新记录\n\n## 0.1.0\n\n- 首个版本。\n');
console.log(`已生成 ${dest}（界面 ${t.ui.layout.toUpperCase()} · ${t.ui.palette}）`);

if (push) {
  const sh = (cmd, args) => execFileSync(cmd, args, { cwd: dest, stdio: 'inherit' });
  sh('git', ['init', '-q', '-b', 'main']);
  sh('git', ['add', '-A']);
  sh('git', ['commit', '-q', '-m', `初始化：${t.name}（从 toolkit-template 生成）`, '-m', 'Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>']);
  sh('gh', ['repo', 'create', `${ORG}/${t.slug}`, '--public', '--source', '.', '--push', '--description', `${t.name}：${t.desc}`.slice(0, 340)]);
  const topics = ['campfire-toolkit', { 电商运营: 'ecommerce', 微信私域: 'wechat', 内容生产: 'content-creation', 办公提效: 'productivity', 'AI 助手': 'ai-assistant' }[t.category], 'tauri', 'desktop-app'];
  sh('gh', ['repo', 'edit', `${ORG}/${t.slug}`, ...topics.flatMap((x) => ['--add-topic', x])]);
  t.repo = `${ORG}/${t.slug}`;
  t.status = 'doing';
  writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n');
  console.log(`已推送 https://github.com/${ORG}/${t.slug}`);
}
