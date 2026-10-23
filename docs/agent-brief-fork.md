# 子任务说明：fork 类工具（track = fork）

把一个上游开源项目整理成篝火工具：本地准备好改动，交给总控审核后发布。开工前先读汇总仓库 `/Users/wumin/Project/small-project` 的 `CLAUDE.md`。所有面向用户的文字一律用简体中文。

## 已有范例

| 交付方式 | 适用的上游 | 范例 | 关键文件 |
|---|---|---|---|
| `desktop` 桌面壳 | 纯网页应用 | `tools/wechat-md-formatter` | `apps/desktop`、`tool.json`、release.yml 带 `app-dir` |
| `mirror` 转发布 | 上游已提供安装包 | `tools/meeting-minutes` | 转发布上游安装包，release.yml 调 `mirror-release.yml` |
| `launcher` 启动脚本包 | Python 应用 | — | 模板在 `ci/launcher/`，复用流程 `.github/workflows/launcher-release.yml` |
| `docker` | 服务端（机器人、后台） | — | 复用流程 `.github/workflows/docker-release.yml`，发布说明模板 `ci/docker-notes.md` |

四个复用流程都在汇总仓库的 `.github/workflows/` 下，打 `v*-campfire.*` 标签时触发。

## 步骤

1. **克隆上游**：`git clone --depth 30 https://github.com/<上游>.git tools/<slug>`，slug 见 `catalog/tools.json`。不要 fork、不要推送，fork 和推送由总控做。
2. **选交付方式**：
   - 先用 `gh api repos/<上游>/releases/latest` 看上游有没有现成安装包，有就选 `mirror`。
   - 没有安装包时按项目形态选：Python 应用选 `launcher`，服务端选 `docker`，纯网页应用选 `desktop`。
   - 选择理由写进报告。
3. **工作流**：移除上游的全部工作流（它们依赖上游的密钥），只放我们的 `.github/workflows/release.yml`，内容是 `on: push: tags: ['v*-campfire.*']`，`uses: campfire-code/toolkit-hub/.github/workflows/<对应流程>.yml@v1`。
4. **工具信息**：根目录放 `tool.json`。字段有：`id`、`slug`、`name`、`version`（`<上游版本>-campfire.1`）、`repo`、`license`（与上游相同）、`delivery`，以及 `upstream`（`repo`、`license`；mirror 方式还要写 `tag`）。
5. **按交付方式准备**：
   - **mirror**：用 `exclude` 正则排除签名文件、自动更新清单、重复格式；在报告里列出最终会转发布哪些附件。
   - **launcher**：
     - 把 `ci/launcher/启动.bat` 和 `启动.command` 复制到 `campfire/`，填好占位符：`{{NAME}}` 工具名、`{{PY_VERSION}}` 上游要求的 Python 版本、`{{INSTALL_CMD}}`（例如 `uv pip install -r requirements.txt`）、`{{RUN_CMD}}`（例如 `python main.py` 或 `streamlit run app.py`）、`{{OPEN_URL}}`（网页界面的地址，没有就留空）。
     - 安装和启动命令以上游 README 为准。**在本机实际跑一次**：用 uv 建环境、装依赖、启动后确认能访问。
     - 上游依赖 ffmpeg 等系统软件时，在 README 写清楚怎么装。
     - 打包时会删掉 `campfire/` 目录。启动脚本要调用的辅助脚本放在仓库根目录（如 `campfire_install.py`），脚本里按自己的实际位置计算项目根路径。
     - 上游默认的大模型接口指向某个合作方服务时，改成通用默认值（如 `https://api.openai.com/v1`），模型名留空。
   - **docker**：
     - 上游有 Dockerfile 就先在本机 build；上游的构建不了（例如基础镜像已停止维护）就复制一份 `docker/Dockerfile.campfire` 改到能用，release.yml 传 `dockerfile`。
     - 检查上游启动日志会不会明文打印密钥，会的话在 fork 里改掉。
     - 写 `campfire/docker-compose.yml`，镜像用 `ghcr.io/campfire-code/<slug>:latest`；需要配置时再写 `campfire/.env.example`。
     - **本机实际 `docker build` 一次**，能启动就做一次健康检查。
     - release.yml 里按需要传 `context`、`dockerfile`。
   - **desktop**：照 `tools/wechat-md-formatter/apps/desktop` 的做法，并本机 `pnpm tauri build --bundles app` 一次确认能启动。网页里如果有统计或追踪脚本，在桌面版里去掉。
6. **README**：在上游 README 的最上方插入篝火中文说明，上游原文完整保留在下面。
   - 中文说明的结构参照 `tools/meeting-minutes/README.md`：标题、篝火归属行、一句话说明、下载或部署、怎么用、验收用例、和上游的区别、归属与许可证。
   - 内容必须基于读过的上游文档，**不编造功能**。界面是英文的要写明；需要账号、密钥、显卡的也要写明。
7. **高风险工具**（`catalog/tools.json` 里 `risk = high`）：在中文说明的最顶部加风险提示，参照 `scripts/new-tool.mjs` 里 `risk` 那段文字，写明可能导致封号、违反平台规则或侵权，仅供学习研究，使用后果自负。这些工具只开源，不上架应用区。
8. **许可证**：
   - 保留上游 LICENSE。
   - 上游没有许可证，或是非商用 / 自定义协议（例如 Commons Clause、BSL、CC BY-NC）的，**停下来**，在报告里说明，不要做。
9. **提交**：可以在本地提交（`git add -A && git commit`），提交信息按上游仓库的规范写。**不要推送**。

## 最终报告（简短）

每个工具写：交付方式及选择理由、上游版本或标签、转发布的附件清单或本机验证结果、README 里写明的前置条件（账号、显卡、系统软件）、已知问题、需要总控处理的事。
