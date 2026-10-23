# 项目规则：campfire-code 开源工具箱（汇总仓库）

> 本目录汇总 100+ 个开源小工具。每个工具是 GitHub 组织 `campfire-code` 下的独立仓库，交付源码 + Windows / macOS 安装包，最终上架 campfire 小程序的应用区（`/Users/wumin/Project/campfire`）。本目录推到组织下名为 `toolkit-hub`。

## 当前主线

**新会话先读 `docs/进度交接.md`**（当前进度、做到一半的工具、等用户提供的资料），再看 `docs/00-总方案.md` 第四节「阶段与验收」。**额度：5 小时窗口用到 80% 就停，等重置再继续；并行子任务约 3 个；真实额度读 `~/.claude/usage-tap.json`。**

## 文件分工

- `catalog/tools.json`：全部 122 个候选工具的唯一清单。包括用户的选择（`decision`）、做法（`track`：own 从零写 / wrap 自研界面 + 开源库 / fork 中文化 + 安装包）、是否上架（`listing`）、进度（`status` / `repo` / `version` / `release`）。
- `research/decisions.json`：用户在拍板页的选择副本，来源是 https://claude.ai/artifact/5r6mavUV5zM6ptrAn5Zkfi 数据库 `decisions/plan`。要改选择就改这个文件，然后重新生成。
- `scripts/gen-catalog.mjs`：用拍板页候选 + 选择生成 `catalog/tools.json`，已有的进度字段会保留。
- `scripts/gen-docs.mjs`：生成 `README.md` 总目录和 `docs/backlog.md`。**这两个文件不要手改。**
- `research/`：2026-10-23 的 4 份 GitHub 调研。
- `design/toolbox-plan.html`：拍板页源文件。

## 规则

1. 工具做完必须满足总方案里「每个工具的验收标准」五条，满足后才能把 `status` 改为 `released`。
2. `listing = repo-only` 的 19 个高风险工具只开源、不上架应用区；README 顶部写明风险与免责，批量和高频操作默认关闭。
3. 许可证：自研用 MIT；fork 或复制了 GPL / AGPL 代码的工具沿用上游协议；非商用协议或没有许可证的项目只借思路，不复制代码。每个仓库附 THIRD_PARTY_LICENSES。
4. 用到大模型的工具一律由用户在设置页自己填接口地址、密钥和模型名（兼容 OpenAI 接口格式）。密钥只存在本机，代码和日志里不出现密钥。
5. 应用区价格由用户定，上架材料里价格留空。
6. 仓库都加 topic `campfire-toolkit`。
