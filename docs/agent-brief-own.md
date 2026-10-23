# 子任务说明：自研界面的工具（track = own / wrap）

在汇总仓库 `/Users/wumin/Project/small-project` 里做桌面小工具。开工前先读：本仓库 `CLAUDE.md`，以及 `docs/00-总方案.md` 第四节里的「每个工具的验收标准」。所有面向用户的文字一律用简体中文。

## 背景

- 每个工具都是独立的 Tauri 2 + React + TS 桌面应用，从模板 `tools/toolkit-template` 生成。
- **不要修改 `src/kit`**（界面框架）。缺能力就在最终报告里写明；kit 里已导出的东西可以直接 import 使用。工具逻辑只写在 `src/tool`。
- 先读这四个文件，弄清能用什么：
  - `src/kit/types.ts`：三种模式 batch / generate / custom；参数类型 segment / select / number / text / textarea / toggle / folder / file / multi，可用 `when` 按条件显示；整批收尾 `afterAll`；工具图标 `icon`；结果字段 `copyText` / `title`；生成型的 `itemName`。
  - `src/kit/platform.ts`：`httpFetch` 跨域请求、`settingsStore`、`openLink`、`ensureDir`。
  - `src/kit/settings.ts`：`chat()` 调大模型。
  - `src/kit/parts.tsx`：`useDroppedFiles` 让自定义型工具接收拖入的文件，另有 `CopyButton`、`FieldControl` 等小部件。
- **参考实现**（按需看）：

| 想做的事 | 参考工具 |
|---|---|
| 写法范例：纯函数 + 测试、模拟文件系统的流程测试、截图示例数据、生成示例文件、README 两节 | `tools/excel-split-merge` |
| 图片画布处理（**不要用 OffscreenCanvas**） | `tools/image-compressor` |
| 在应用内跑 ONNX 模型（onnxruntime-web，wasm 文件用 `?url` 引入；pnpm 11 的 `allowBuilds`；macOS 最低 13.3） | `tools/bg-remover-batch` |
| 调大模型并容错解析 JSON | `tools/ai-title-writer` |
| 自定义型界面 | `tools/banned-words-checker`、`tools/script-quick-reply` |
| 联网抓取（录制真实响应做测试） | `tools/trending-radar` |

## 规则

1. 在汇总仓库目录执行 `node scripts/new-tool.mjs <编号>`（**不要加 --push**），然后在工具目录 `pnpm install`。
2. 第三方库或模型只用 MIT / Apache / BSD / ISC 类许可证。用 `gh api repos/<owner>/<repo> --jq .license.spdx_id` 或 `npm view <包> license` 核实，写进该工具的 `THIRD_PARTY_LICENSES.md`。如果实际用的上游和总目录里写的不同，把 `tool.json` 的 `upstream` 改成实际使用的，并在报告里说明。
3. **不编造**：平台规则、接口地址、法规条文、尺寸和字数限制，只写核实过的；核实不了的不写，或明确标「未核实，以平台为准」。
4. **测试不访问真实网络**。网络请求用录制好的响应测试；大模型用假函数测试。
5. 工具声明里加 `icon`：从 lucide-react 选一个贴合用途的图标。
6. 必须全部通过：`node scripts/check-tools.mjs <编号> --build`，即类型检查、测试、构建三项。
7. 截图：
   - 写 `src/tool/preview.ts`。自定义型工具改为给主体准备逼真的默认示例状态。
   - 运行 `node scripts/shot.mjs <编号>` 生成截图，**用 Read 打开亲自检查**。
   - 另外抽查暗色和其他一两种布局：`pnpm exec vite --port <空闲端口>` 后打开 `preview.html?layout=d&mode=dark`，用 `node /private/tmp/claude-501/-Users-wumin-Project-small-project/36472b09-269d-4dbf-8fa1-3149cf155cd5/scratchpad/pw/page.mjs <地址> <截图路径>` 截图检查。
   - 截图会用于宣传，**不能出现真实人名、真实新闻、灾害事件、他人作品或商标图**。示例内容标明「示例」。
8. README：填「怎么用」和「验收用例」。验收用例用 `samples/` 里的文件，写清可执行的操作和应得到的结果。
9. **不要 git init、不要推送、不要建仓库**。用完自己起的开发服务要关掉。

## 最终报告（简短）

每个工具写：功能、库或模型及其许可证、测试数量、核实过的事实及核实方式、未核实的点、已知限制、需要 kit 增加的能力（如有）、截图路径。
