# 后做清单（26 个）

2026-10-23 拍板时标为「后做」的工具。重启某个工具时：把 `research/decisions.json` 里它的值改为 `do`，运行 `node scripts/gen-catalog.mjs && node scripts/gen-docs.mjs`，再按总方案「每个工具的验收标准」做。

## 微信私域

### w07 企微会话存档 AI 质检

- 做什么：查违规词、漏回复、响应时长（需开通会话存档并告知员工与客户）
- 基于：从零写；计划做法：从零写；形态：服务端；风险：中
- 计划仓库名：`campfire-code/wecom-archive-qa`
- 为什么后做：需要企业开通付费的会话存档，并告知员工与客户，前置条件多
- 重启第一步：确认公司企微是否开通会话存档，拿到测试企业的 secret 与私钥

### w14 群欢迎语 / 群公告模板

- 做什么：模板编辑，输出标准文本
- 基于：从零写；计划做法：从零写；形态：桌面；风险：低
- 计划仓库名：`campfire-code/group-welcome-templates`
- 为什么后做：功能薄，单独成仓价值低
- 重启第一步：考虑并入 w12「私域话术库快捷回复」作为一个模板分类

### w16 验证码 / 订单通知转发

- 做什么：手机短信和通知转发到企微、钉钉
- 基于：[pppscn/SmsForwarder](https://github.com/pppscn/SmsForwarder) · BSD-2；计划做法：fork 中文化 + 安装包；形态：手机；风险：中
- 计划仓库名：`campfire-code/sms-notify-forwarder`
- 为什么后做：手机端这一期不做；上游已是成熟安卓应用
- 重启第一步：fork 上游，中文 README 与配置示例，沿用上游 APK

### w18 小程序订阅消息调试

- 做什么：批量配置和测试订阅消息模板
- 基于：从零写；计划做法：从零写；形态：桌面；风险：低
- 计划仓库名：`campfire-code/mp-subscribe-msg-tester`
- 为什么后做：使用面窄，只对小程序开发者有用
- 重启第一步：用 w17 Webhook 调试器的界面框架加一个订阅消息页

### w22 一文多发插件

- 做什么：一篇文章同步到多个平台
- 基于：[wechatsync/Wechatsync](https://github.com/wechatsync/Wechatsync) · GPL-3.0；计划做法：fork 中文化 + 安装包；形态：浏览器插件；风险：中
- 计划仓库名：`campfire-code/multi-platform-sync`
- 为什么后做：GPL 浏览器插件，多平台适配维护量大
- 重启第一步：fork 上游，确认各平台适配是否仍可用后再中文化

## 内容生产

### c09 字幕断句校对翻译

- 做什么：AI 断句、校对、翻译字幕
- 基于：[WEIFENG2333/VideoCaptioner](https://github.com/WEIFENG2333/VideoCaptioner) · GPL-3.0；计划做法：fork 中文化 + 安装包；形态：桌面；风险：中
- 计划仓库名：`campfire-code/subtitle-proofreader`
- 为什么后做：与 c06 离线字幕、c08 翻译配音功能重叠
- 重启第一步：先看 c06、c08 的用户反馈，缺断句校对再做

### c13 数字人口播

- 做什么：照片 / 视频生成口播数字人
- 基于：[duixcom/Duix-Avatar](https://github.com/duixcom/Duix-Avatar) · 社区协议；计划做法：fork 中文化 + 安装包；形态：Windows（显卡）；风险：高
- 计划仓库名：`campfire-code/digital-human`
- 为什么后做：需要 NVIDIA 显卡，上游为社区协议有限制，肖像需授权
- 重启第一步：逐条阅读 Duix 社区协议，确认可再分发再决定

### c15 直播边录边切

- 做什么：录制同时标记高光并切片
- 基于：[Xinrea/bili-shadowreplay](https://github.com/Xinrea/bili-shadowreplay) · MIT；计划做法：fork 中文化 + 安装包；形态：桌面；风险：中
- 计划仓库名：`campfire-code/live-record-clipper`
- 为什么后做：与 c14 直播录制重叠
- 重启第一步：在 c14 基础上加「标记高光并切片」

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

### c27 多平台发布插件

- 做什么：浏览器里一键发到多个平台
- 基于：[leaperone/MultiPost-Extension](https://github.com/leaperone/MultiPost-Extension) · Apache-2.0；计划做法：fork 中文化 + 安装包；形态：浏览器插件；风险：中
- 计划仓库名：`campfire-code/multipost-extension`
- 为什么后做：与 c26 多平台发布重叠，插件形态
- 重启第一步：fork 上游，中文化后与 c26 互相引用

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

### o06 扫描 PDF 可搜索化

- 做什么：给扫描件加文字层
- 基于：[ocrmypdf/OCRmyPDF](https://github.com/ocrmypdf/OCRmyPDF) · MPL-2.0；计划做法：fork 中文化 + 安装包；形态：桌面；风险：低
- 计划仓库名：`campfire-code/searchable-pdf`
- 为什么后做：依赖 Tesseract，Windows 打包复杂
- 重启第一步：试用 RapidOCR 替代 Tesseract 生成文字层

### o09 银行流水转 Excel

- 做什么：PDF 流水识别成表格（各银行版式不同）
- 基于：从零写；计划做法：从零写；形态：桌面；风险：中
- 计划仓库名：`campfire-code/bank-statement-to-excel`
- 为什么后做：各银行流水版式不同，需要大量样本
- 重启第一步：收集 5 家常用银行的流水 PDF 样本

### o19 语音速记

- 做什么：按住快捷键说话，直接出文字
- 基于：[cjpais/Handy](https://github.com/cjpais/Handy) · MIT；计划做法：fork 中文化 + 安装包；形态：桌面；风险：低
- 计划仓库名：`campfire-code/voice-typing`
- 为什么后做：上游已有成熟安装包，中文化收益小
- 重启第一步：fork 上游，补中文界面与说明

### o20 音视频转图文

- 做什么：录屏、课程转成图文笔记
- 基于：[hanshuaikang/AI-Media2Doc](https://github.com/hanshuaikang/AI-Media2Doc) · MIT；计划做法：fork 中文化 + 安装包；形态：桌面；风险：低
- 计划仓库名：`campfire-code/media-to-article`
- 为什么后做：与 o16 录音转文字、o18 会议纪要重叠
- 重启第一步：在 o16 上加「生成图文」

### o22 PDF 双语翻译（保版式）

- 做什么：论文、说明书保留排版翻译
- 基于：[PDFMathTranslate/PDFMathTranslate](https://github.com/PDFMathTranslate/PDFMathTranslate) · AGPL-3.0；计划做法：fork 中文化 + 安装包；形态：桌面；风险：中
- 计划仓库名：`campfire-code/pdf-bilingual-translate`
- 为什么后做：AGPL，上游已有安装包
- 重启第一步：fork 上游，补中文说明与常用模型配置

### o23 本地知识库问答

- 做什么：产品手册、话术库本地问答
- 基于：[Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) · MIT；计划做法：fork 中文化 + 安装包；形态：桌面；风险：低
- 计划仓库名：`campfire-code/local-knowledge-qa`
- 为什么后做：安装包体积大，上游已成熟
- 重启第一步：fork 上游，预置「话术库 / 产品手册」模板

### o24 小店记账

- 做什么：收支记账与报表
- 基于：[mayswind/ezbookkeeping](https://github.com/mayswind/ezbookkeeping) · MIT；计划做法：fork 中文化 + 安装包；形态：桌面；风险：低
- 计划仓库名：`campfire-code/shop-bookkeeping`
- 为什么后做：与电商运营主线关联弱
- 重启第一步：fork 上游，加小店常用收支分类

### o25 图片去杂物

- 做什么：涂抹擦除画面里的杂物
- 基于：[Sanster/IOPaint](https://github.com/Sanster/IOPaint) · Apache-2.0（已归档）；计划做法：fork 中文化 + 安装包；形态：桌面；风险：中
- 计划仓库名：`campfire-code/image-inpaint`
- 为什么后做：上游已归档，去水印有版权争议
- 重启第一步：寻找仍在维护的替代项目

## AI 助手

### a02 后台批量操作机器人

- 做什么：自然语言驱动的后台批量操作
- 基于：[web-infra-dev/midscene](https://github.com/web-infra-dev/midscene) · MIT；计划做法：fork 中文化 + 安装包；形态：桌面；风险：中
- 计划仓库名：`campfire-code/backend-batch-bot`
- 为什么后做：需要大模型多模态能力，成本与稳定性待验证
- 重启第一步：用 midscene 跑一个真实后台的批量操作样例

### a03 竞品价格 / 资讯采集器

- 做什么：网页转结构化数据，定时采集
- 基于：[unclecode/crawl4ai](https://github.com/unclecode/crawl4ai) · Apache-2.0；计划做法：fork 中文化 + 安装包；形态：桌面；风险：中
- 计划仓库名：`campfire-code/web-data-collector`
- 为什么后做：与 a01 浏览器助手重叠，目标站合规需逐个确认
- 重启第一步：先确定 3 个合规的采集目标

### a05 浏览器助手（MCP）

- 做什么：让 AI 助手控制浏览器
- 基于：[microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) · Apache-2.0；计划做法：fork 中文化 + 安装包；形态：命令行；风险：低
- 计划仓库名：`campfire-code/browser-mcp`
- 为什么后做：上游已是官方成熟项目，二次封装价值低
- 重启第一步：只写中文接入教程，作为文档类条目

### a06 Word 批量生成（MCP）

- 做什么：让 AI 助手生成和修改 Word
- 基于：[GongRzhe/Office-Word-MCP-Server](https://github.com/GongRzhe/Office-Word-MCP-Server) · MIT（已归档）；计划做法：fork 中文化 + 安装包；形态：命令行；风险：低
- 计划仓库名：`campfire-code/word-mcp`
- 为什么后做：上游已归档
- 重启第一步：寻找仍在维护的替代项目，或并入 a04 Excel AI 助手

