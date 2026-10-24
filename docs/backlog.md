# 后做清单（11 个）

2026-10-23 拍板时标为「后做」的工具。重启某个工具时：把 `research/decisions.json` 里它的值改为 `do`，运行 `node scripts/gen-catalog.mjs && node scripts/gen-docs.mjs`，再按总方案「每个工具的验收标准」做。

## 微信私域

### w07 企微会话存档 AI 质检

- 做什么：查违规词、漏回复、响应时长（需开通会话存档并告知员工与客户）
- 基于：从零写；计划做法：从零写；形态：服务端；风险：中
- 计划仓库名：`campfire-code/wecom-archive-qa`
- 为什么后做：需要企业开通付费的会话存档，并告知员工与客户，前置条件多
- 重启第一步：确认公司企微是否开通会话存档，拿到测试企业的 secret 与私钥

### w22 一文多发插件

- 做什么：一篇文章同步到多个平台
- 基于：[wechatsync/Wechatsync](https://github.com/wechatsync/Wechatsync) · GPL-3.0；计划做法：fork 中文化 + 安装包；形态：浏览器插件；风险：中
- 计划仓库名：`campfire-code/multi-platform-sync`
- 为什么后做：GPL 浏览器插件，多平台适配维护量大
- 重启第一步：fork 上游，确认各平台适配是否仍可用后再中文化

## 内容生产

### c13 数字人口播

- 做什么：照片 / 视频生成口播数字人
- 基于：[duixcom/Duix-Avatar](https://github.com/duixcom/Duix-Avatar) · 社区协议；计划做法：fork 中文化 + 安装包；形态：Windows（显卡）；风险：高
- 计划仓库名：`campfire-code/digital-human`
- 为什么后做：需要 NVIDIA 显卡，上游为社区协议有限制，肖像需授权
- 重启第一步：逐条阅读 Duix 社区协议，确认可再分发再决定

### c22 原创度 / 洗稿检测

- 做什么：与网上相似内容比对，给出改写建议
- 基于：从零写；计划做法：从零写；形态：桌面；风险：低
- 计划仓库名：`campfire-code/originality-checker`
- 为什么后做：需要全网相似内容检索，数据来源成本高
- 重启第一步：先定检索来源（搜索 API 还是本地语料），再写比对

### c25 字幕花字模板

- 做什么：SRT 一键套电商风格花字
- 基于：从零写；计划做法：从零写；形态：桌面；风险：低
- 计划仓库名：`campfire-code/subtitle-style-templates`
- 为什么后做：依赖剪映或字幕渲染方案
- 重启第一步：等 c04 剪映草稿生成器稳定后，作为其中的花字模板模块

### c28 小红书 AI 运营助手

- 做什么：让 AI 助手搜索、发布小红书
- 基于：[xpzouying/xiaohongshu-mcp](https://github.com/xpzouying/xiaohongshu-mcp) · Apache-2.0；计划做法：fork 中文化 + 安装包；形态：命令行；风险：高
- 计划仓库名：`campfire-code/xhs-ai-assistant`
- 为什么后做：登录态自动化，封号风险高
- 重启第一步：只做「搜索与分析」只读功能，不做自动发布

### c32 视频号 / 公众号数据日报

- 做什么：基于后台导出文件自动汇总
- 基于：从零写；计划做法：从零写；形态：桌面；风险：低
- 计划仓库名：`campfire-code/channels-mp-daily`
- 为什么后做：依赖各后台导出文件格式，格式常变
- 重启第一步：收集视频号、公众号后台导出样例文件后再写解析

## 办公提效

### o03 扫描件转 Word

- 做什么：复杂版面 PDF 转可编辑文档（模型较大）
- 基于：[opendatalab/MinerU](https://github.com/opendatalab/MinerU) · Apache-2.0（附加条款）；计划做法：fork 中文化 + 安装包；形态：桌面；风险：中
- 计划仓库名：`campfire-code/scan-to-word`
- 为什么后做：模型大；上游有附加商用条款
- 重启第一步：确认附加条款，评估只用 CPU 的小模型效果

### o09 银行流水转 Excel

- 做什么：PDF 流水识别成表格（各银行版式不同）
- 基于：从零写；计划做法：从零写；形态：桌面；风险：中
- 计划仓库名：`campfire-code/bank-statement-to-excel`
- 为什么后做：各银行流水版式不同，需要大量样本
- 重启第一步：收集 5 家常用银行的流水 PDF 样本

### o25 图片去杂物

- 做什么：涂抹擦除画面里的杂物
- 基于：[Sanster/IOPaint](https://github.com/Sanster/IOPaint) · Apache-2.0（已归档）；计划做法：fork 中文化 + 安装包；形态：桌面；风险：中
- 计划仓库名：`campfire-code/image-inpaint`
- 为什么后做：上游已归档，去水印有版权争议
- 重启第一步：寻找仍在维护的替代项目

## AI 助手

### a06 Word 批量生成（MCP）

- 做什么：让 AI 助手生成和修改 Word
- 基于：[GongRzhe/Office-Word-MCP-Server](https://github.com/GongRzhe/Office-Word-MCP-Server) · MIT（已归档）；计划做法：fork 中文化 + 安装包；形态：命令行；风险：低
- 计划仓库名：`campfire-code/word-mcp`
- 为什么后做：上游已归档
- 重启第一步：寻找仍在维护的替代项目，或并入 a04 Excel AI 助手

