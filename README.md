# 篝火开源工具箱

> 篝火出品 · 全部工具收录于篝火 App 应用区

面向电商运营、微信私域、内容生产、办公提效的开源小工具合集。每个工具是 [campfire-code](https://github.com/campfire-code) 组织下的独立仓库，提供源码与 Windows / macOS 安装包。

- 计划做 96 个，已发布 0 个；另有 26 个后做，见 [docs/backlog.md](docs/backlog.md)
- 总方案：[docs/00-总方案.md](docs/00-总方案.md)
- 本页由 `node scripts/gen-docs.mjs` 根据 `catalog/tools.json` 生成，不要手改

## 电商运营（32）

| 编号 | 工具 | 能做什么 | 仓库 | 基于 | 风险 | 状态 | 安装包 |
|---|---|---|---|---|---|---|---|
| e01 | 1688→拼多多 / 抖店上架数据包 | 抓取 1688 商品，自动映射类目、SKU、运费模板，生成上架数据包；发布走开放平台接口或人工导入 | `1688-to-pdd-listing` | 从零写 | 中 | 待做 | — |
| e02 | Temu 半托管上品表格 | 按 Temu 模板批量生成核价表、属性表 | `temu-listing-sheet` | 从零写 | 低 | 待做 | — |
| e03 | 主图一键白底（批量） | 本地抠图，整个文件夹一次处理 | `bg-remover-batch` | [danielgatis/rembg](https://github.com/danielgatis/rembg) · MIT | 低 | 待做 | — |
| e04 | 高清商品抠图 | 发丝、透明件等难抠的商品 | `hd-product-cutout` | [ZhengPeng7/BiRefNet](https://github.com/ZhengPeng7/BiRefNet) · MIT | 低 | 待做 | — |
| e05 | 商品短视频去背景 | 视频逐帧去背景 | `video-bg-remover` | [nadermx/backgroundremover](https://github.com/nadermx/backgroundremover) · MIT | 低 | 待做 | — |
| e06 | 详情图多语种翻译 | 识别图里的中文，翻译成英 / 泰 / 越文后回填 | `detail-image-translator` | [zyddnys/manga-image-translator](https://github.com/zyddnys/manga-image-translator) · GPL-3.0 | 中 | 待做 | — |
| e07 | 主图多平台尺寸导出 | 一张图按各平台尺寸和大小要求一键导出 | `main-image-resizer` | 从零写 | 低 | 待做 | — |
| e08 | SKU 规格图拼图加水印 | 色卡、规格图自动排版加水印 | `sku-image-composer` | 从零写 | 低 | 待做 | — |
| e09 | AI 标题卖点批量生成 | Excel 进、Excel 出，可指定平台字数规则 | `ai-title-writer` | 从零写 | 低 | 待做 | — |
| e10 | 广告法违禁词检测 | 标题、详情、文案、字幕上架前自检，标出极限词 | `banned-words-checker` | 从零写 | 低 | 待做 | — |
| e11 | 多平台订单利润对账 | 导入各平台账单，扣成本、运费、佣金后算真实利润 | `order-profit-reconciler` | 从零写 | 低 | 待做 | — |
| e12 | 抖店批量改价改库存 | 一张表批量改多个店，走抖店官方接口 | `doudian-batch-price` | [whalesky-labs/doudian-sdk](https://github.com/whalesky-labs/doudian-sdk) · MIT | 中 | 待做 | — |
| e13 | 虾皮批量改价改库存 | 走 Shopee 官方接口 | `shopee-batch-price` | [congminh1254/shopee-sdk](https://github.com/congminh1254/shopee-sdk) · MIT | 中 | 待做 | — |
| e14 | 亚马逊订单库存导出 | 走亚马逊 SP-API | `amazon-order-export` | [saleweaver/python-amazon-sp-api](https://github.com/saleweaver/python-amazon-sp-api) · MIT | 中 | 待做 | — |
| e15 | TikTok Shop 批量上品 | 走 TikTok Shop 官方接口 | `tiktokshop-listing` | [EcomPHP/tiktokshop-php](https://github.com/EcomPHP/tiktokshop-php) · Apache-2.0 | 中 | 待做 | — |
| e16 | 东南亚多店调度 | Lazada / Shopee / TikTok 多店统一管理 | `sea-multistore` | [easycb/easycb-go](https://github.com/easycb/easycb-go) · MIT | 中 | 待做 | — |
| e17 | 跨境选品报告 | TikTok / 亚马逊选品分析报告 | `crossborder-product-research` | [nexscope-ai/eCommerce-Skills](https://github.com/nexscope-ai/eCommerce-Skills) · MIT | 低 | 待做 | — |
| e18 | 虾皮选品利润计算器 | 商品页一键算毛利、佣金和运费 | `shopee-profit-calculator` | 从零写 | 低 | 待做 | — |
| e19 | 亚马逊 ASIN 批量查询 | 批量查商品信息与价格 | `amazon-asin-lookup` | [tducret/amazon-scraper-python](https://github.com/tducret/amazon-scraper-python) · MIT | 中 | 待做 | — |
| e20 | 差评归因分析 | 导入评论表格，AI 聚类出问题点和改进建议 | `review-insight` | 从零写 | 低 | 待做 | — |
| e21 | 快递异常件看板 | 接快递查询接口，提醒停滞件、退回件 | `express-exception-board` | 从零写 | 低 | 待做 | — |
| e22 | 采购单对账 | 导出淘宝 / 1688 买家订单，与入库对账 | `purchase-order-export` | [Sky-seeker/BuyerOrdersExport](https://github.com/Sky-seeker/BuyerOrdersExport) · MIT | 低 | 待做 | — |
| e23 | 闲鱼捡漏 / 竞品监控（仅开源） | 关键词监控新上架商品，AI 筛选 | `xianyu-monitor` | [Usagi-org/ai-goofish-monitor](https://github.com/Usagi-org/ai-goofish-monitor) · MIT | 高 | 待做 | — |
| e24 | 闲鱼自动发货（仅开源） | 多账号自动发货、自动回复 | `xianyu-auto-delivery` | [Christ9038/Ydisks-Xianyu-Helper](https://github.com/Christ9038/Ydisks-Xianyu-Helper) · Apache-2.0 | 高 | 待做 | — |
| e25 | 多平台 AI 客服（仅开源） | 拼多多 / 千牛 / 抖店客服窗口自动回复 | `ecom-ai-customer-service` | [cs-lazy-tools/ChatGPT-On-CS](https://github.com/cs-lazy-tools/ChatGPT-On-CS) · AGPL-3.0 | 高 | 待做 | — |
| e26 | 直播间自动讲解 + 弹幕回复（仅开源） | 抖店 / 视频号 / 快手直播辅助 | `live-room-assistant` | [qiutongxue/oba-live-tool](https://github.com/qiutongxue/oba-live-tool) · MIT（附声明） | 高 | 待做 | — |
| e27 | 直播弹幕关键词统计（仅开源） | 抓抖音弹幕统计下单意向 | `douyin-danmaku-stats` | [saermart/DouyinLiveWebFetcher](https://github.com/saermart/DouyinLiveWebFetcher) · AGPL-3.0 | 高 | 待做 | — |
| e28 | 淘宝 / 京东 / 1688 比价采集（仅开源） | 关键词批量采集价格 | `price-compare-crawler` | [zhangjiancong/MarketSpider](https://github.com/zhangjiancong/MarketSpider) · MIT | 高 | 待做 | — |
| e29 | 以图找同款货源（仅开源） | 上传图片在 1688 找同款 | `image-search-1688` | [Carmenliukang/1688_crawler-image_search_products](https://github.com/Carmenliukang/1688_crawler-image_search_products) · GPL-3.0 | 高 | 待做 | — |
| e30 | 电商多店 AI 连接器 | 让 AI 助手直接查多个国内平台店铺数据（MCP） | `ecom-mcp-connector` | [TonyWang-hub/mcp-cn-commerce](https://github.com/TonyWang-hub/mcp-cn-commerce) · MIT | 中 | 待做 | — |
| e31 | AI 详情页一键生成 | 输入卖点和商品图，生成整套详情页 | `ai-detail-page` | 从零写 | 低 | 待做 | — |
| e32 | 商品主图转短视频 | 多张图自动运镜、配字幕和配音 | `product-image-to-video` | 从零写 | 低 | 待做 | — |

## 微信私域（23）

| 编号 | 工具 | 能做什么 | 仓库 | 基于 | 风险 | 状态 | 安装包 |
|---|---|---|---|---|---|---|---|
| w01 | 公众号一键排版器 | Markdown 转公众号样式，多套主题 | `wechat-md-formatter` | [doocs/md](https://github.com/doocs/md) · WTFPL | 低 | 待做 | — |
| w02 | AI 写稿直发公众号草稿箱 | 写稿、排版后推到草稿箱，走公众号官方接口 | `wechat-draft-publisher` | [caol64/wenyan-mcp](https://github.com/caol64/wenyan-mcp) · Apache-2.0 | 低 | 待做 | — |
| w03 | 企微群 AI 答疑机器人 | 企业微信群机器人接大模型 + 知识库 | `wecom-group-ai-bot` | [easy-wx/wecom-bot-svr](https://github.com/easy-wx/wecom-bot-svr) · MIT | 低 | 待做 | — |
| w04 | 企微 / 公众号 AI 客服 | 多渠道 AI 客服，只启用官方通道 | `wecom-ai-service` | [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) · MIT | 低 | 待做 | — |
| w05 | Dify 知识库客服接入器 | 把 Dify 知识库接到企微 | `dify-wecom-connector` | [hanfangyuan4396/dify-on-wechat](https://github.com/hanfangyuan4396/dify-on-wechat) · MIT | 中 | 待做 | — |
| w06 | 企微客户标签批量整理 | 官方接口拉客户，按规则或 AI 批量打标签 | `wecom-customer-tagger` | 从零写 | 低 | 待做 | — |
| w08 | 渠道活码与加粉统计 | 用官方「联系我」接口统计每个渠道的加粉来源 | `wecom-channel-qrcode` | [openscrm/api-server](https://github.com/openscrm/api-server) · Apache-2.0 | 低 | 待做 | — |
| w09 | 客户流失预警清单 | 按最后互动时间生成跟进清单 | `wecom-churn-alert` | 从零写 | 低 | 待做 | — |
| w10 | 公众号数据周报 | 官方数据接口，自动出阅读、涨粉图表 | `mp-weekly-report` | 从零写 | 低 | 待做 | — |
| w11 | 朋友圈文案日更 | 按商品库和节日日历生成一周文案和九宫格配图，手动发布 | `moments-daily-writer` | 从零写 | 低 | 待做 | — |
| w12 | 私域话术库快捷回复 | 桌面小窗，按场景搜话术一键复制 | `script-quick-reply` | 从零写 | 低 | 待做 | — |
| w13 | 聊天截图转客户档案 | 截图 OCR 后抽取需求、预算、意向 | `chat-screenshot-to-crm` | 从零写 | 低 | 待做 | — |
| w15 | 订单 / 库存告警推到微信 | 通过企业微信应用推送到个人微信 | `wechat-alert-push` | [easychen/wecomchan](https://github.com/easychen/wecomchan) · MIT | 低 | 待做 | — |
| w17 | 机器人 Webhook 调试器 | 钉钉、飞书、企微机器人消息统一调试 | `bot-webhook-debugger` | 从零写 | 低 | 待做 | — |
| w19 | 视频号直播话术生成 | 按商品生成直播讲解稿和互动话术 | `live-script-writer` | 从零写 | 低 | 待做 | — |
| w20 | 手机备份聊天导出（本人数据） | 从手机备份导出本人聊天记录，全程本地 | `wechat-backup-exporter` | [BlueMatthew/WechatExporter](https://github.com/BlueMatthew/WechatExporter) · GPL-2.0 | 中 | 待做 | — |
| w21 | 竞品公众号文章采集（仅开源） | 批量下载公众号文章及阅读数 | `mp-article-exporter` | [wechat-article/wechat-article-exporter](https://github.com/wechat-article/wechat-article-exporter) · MIT | 高 | 待做 | — |
| w23 | 个微自动回复（桌面）（仅开源） | 操作 Windows 微信界面自动回复 | `wechat-auto-reply-rpa` | [cluic/wxauto](https://github.com/cluic/wxauto) · Apache-2.0 | 高 | 待做 | — |
| w24 | 个微 Hook 机器人（仅开源） | 注入微信进程收发消息 | `wechat-hook-bot` | [lich0821/WeChatFerry](https://github.com/lich0821/WeChatFerry) · MIT（已归档） | 高 | 待做 | — |
| w25 | 批量加好友 / 群发（仅开源） | 微信 4.0 界面自动化 | `wechat-bulk-rpa` | [Hello-Mr-Crab/pywechat](https://github.com/Hello-Mr-Crab/pywechat) · LGPL-2.1 | 高 | 待做 | — |
| w26 | 企微群管家（安卓）（仅开源） | 安卓无障碍控制企微做群管理 | `wecom-group-manager-android` | [gallonyin/worktool](https://github.com/gallonyin/worktool) · Apache-2.0 | 高 | 待做 | — |
| w27 | 视频号视频下载（仅开源） | 下载视频号视频 | `channels-video-downloader` | [nobiyou/wx_channel](https://github.com/nobiyou/wx_channel) · MIT | 高 | 待做 | — |
| w28 | 机器人多账号管理后台 | 多个机器人账号集中管理 | `bot-hub` | [openilink/openilink-hub](https://github.com/openilink/openilink-hub) · MIT | 中 | 待做 | — |

## 内容生产（23）

| 编号 | 工具 | 能做什么 | 仓库 | 基于 | 风险 | 状态 | 安装包 |
|---|---|---|---|---|---|---|---|
| c01 | 主题一键出短视频 | 输入主题，自动写文案、配音、配素材、合成成片 | `topic-to-short-video` | [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) · MIT | 中 | 待做 | — |
| c02 | 影视解说一键成片（仅开源） | 解说文案 + 自动剪辑（影视素材版权风险高） | `film-commentary-maker` | [linyqh/NarratoAI](https://github.com/linyqh/NarratoAI) · MIT | 高 | 待做 | — |
| c03 | 长视频一键切爆点 | 长视频自动切成多条短视频 | `long-video-clipper` | [zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip) · MIT | 中 | 待做 | — |
| c04 | 剪映草稿批量生成器 | 批量生成剪映草稿，打开剪映即可微调 | `jianying-draft-generator` | [GuanYixuan/pyJianYingDraft](https://github.com/GuanYixuan/pyJianYingDraft) · Apache-2.0 | 中 | 待做 | — |
| c05 | 批量混剪工厂 | 素材批量混剪出多条视频 | `batch-video-remix` | [ddean2009/MoneyPrinterPlus](https://github.com/ddean2009/MoneyPrinterPlus) · GPL-3.0 | 中 | 待做 | — |
| c06 | 离线视频转字幕 | 不联网、不用显卡，Mac 和 Windows 都能跑 | `offline-subtitle` | [ggml-org/whisper.cpp](https://github.com/ggml-org/whisper.cpp) · MIT | 低 | 待做 | — |
| c08 | 视频出海翻译配音 | 字幕翻译 + 配音一条龙 | `video-translate-dub` | [Huanshere/VideoLingo](https://github.com/Huanshere/VideoLingo) · Apache-2.0 | 中 | 待做 | — |
| c10 | 文案转配音 | 多音色配音，免费（使用微软非官方接口，可能失效） | `text-to-speech` | [rany2/edge-tts](https://github.com/rany2/edge-tts) · LGPL-3.0 | 中 | 待做 | — |
| c11 | 手机离线配音 / 识别 | 手机上离线语音识别和合成 | `offline-voice` | [k2-fsa/sherpa-onnx](https://github.com/k2-fsa/sherpa-onnx) · Apache-2.0 | 低 | 待做 | — |
| c12 | 声音克隆配音（仅开源） | 少量样本克隆声音（需显卡、需本人授权、需加 AI 标识） | `voice-clone` | [RVC-Boss/GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS) · MIT | 高 | 待做 | — |
| c14 | 自家直播自动录制存档 | 直播开播自动录制，用于自家回放和切片 | `live-recorder` | [ihmily/StreamCap](https://github.com/ihmily/StreamCap) · Apache-2.0 | 中 | 待做 | — |
| c16 | 去硬字幕 / 去水印（仅开源） | 视频去字幕和水印（需显卡，侵权风险） | `subtitle-watermark-remover` | [YaoFANGUK/video-subtitle-remover](https://github.com/YaoFANGUK/video-subtitle-remover) · Apache-2.0 | 高 | 待做 | — |
| c17 | 小红书图文卡片生成 | 输入主题生成整套图文卡片（参考项目为非商用，代码自己写） | `xhs-card-maker` | 从零写 | 低 | 待做 | — |
| c18 | 封面工坊 | 公众号、视频封面模板批量出图 | `cover-studio` | [weizwz/cover](https://github.com/weizwz/cover) · MIT | 低 | 待做 | — |
| c19 | 全网热点雷达 | 聚合各平台热榜，按关键词提醒 | `trending-radar` | [newsnext/newsnow](https://github.com/newsnext/newsnow) · MIT | 低 | 待做 | — |
| c20 | 爆款标题 A/B 生成 | 按平台风格批量出标题并打分 | `title-ab-generator` | 从零写 | 低 | 待做 | — |
| c21 | 竞品视频拆解卡 | 输入视频，输出分镜、钩子、话术结构表 | `video-breakdown` | 从零写 | 中 | 待做 | — |
| c23 | AI 内容标识器 | 按《人工智能生成合成内容标识办法》一键加显式标识和元数据 | `ai-content-labeler` | 从零写 | 低 | 待做 | — |
| c24 | 素材库查重 | 图片 / 视频指纹比对，避免重复发布被判搬运 | `asset-dedup` | 从零写 | 低 | 待做 | — |
| c26 | 一键多平台发布（仅开源） | 抖音、视频号、小红书、快手、B 站自动上传 | `social-auto-upload` | [dreammis/social-auto-upload](https://github.com/dreammis/social-auto-upload) · MIT | 高 | 待做 | — |
| c29 | 全网视频下载器（仅开源） | 各平台视频下载 | `video-downloader` | [yt-dlp/yt-dlp](https://github.com/yt-dlp/yt-dlp) · Unlicense | 高 | 待做 | — |
| c30 | 抖音无水印下载（仅开源） | 解析抖音 / TikTok 无水印视频 | `douyin-downloader` | [Evil0ctal/Douyin_TikTok_Download_API](https://github.com/Evil0ctal/Douyin_TikTok_Download_API) · Apache-2.0 | 高 | 待做 | — |
| c31 | 评论情绪与需求分析 | 分析自有账号导出的评论数据 | `comment-insight` | 从零写 | 低 | 待做 | — |

## 办公提效（16）

| 编号 | 工具 | 能做什么 | 仓库 | 基于 | 风险 | 状态 | 安装包 |
|---|---|---|---|---|---|---|---|
| o01 | 发票批量转报销表 | 电子发票 PDF / OFD 批量读取，导出报销 Excel | `invoice-to-expense` | 从零写 | 低 | 待做 | — |
| o02 | PDF 百宝箱 | 合并、拆分、压缩、加水印、转图 | `pdf-toolbox` | [py-pdf/pypdf](https://github.com/py-pdf/pypdf) · BSD-3 | 低 | 待做 | — |
| o04 | 文档转 Markdown | Word、PPT、Excel、PDF 转成 AI 能读的文本 | `doc-to-markdown` | [microsoft/markitdown](https://github.com/microsoft/markitdown) · MIT | 低 | 待做 | — |
| o05 | 批量图片 OCR | 离线识别，结果导出 Excel / TXT | `batch-ocr` | [RapidAI/RapidOCR](https://github.com/RapidAI/RapidOCR) · Apache-2.0 | 低 | 待做 | — |
| o07 | Excel 拆分与合并 | 按列拆成多个文件（如按门店），多表合并 | `excel-split-merge` | 从零写 | 低 | 待做 | — |
| o08 | Excel 批量套 Word 模板 | 批量生成合同、证书、通知 | `excel-to-word-batch` | 从零写 | 低 | 待做 | — |
| o10 | 微信 / 支付宝账单对账 | 多份账单合并、分类、汇总 | `bill-reconciler` | 从零写 | 低 | 待做 | — |
| o11 | OFD 转 PDF | 国产版式文件转 PDF | `ofd-to-pdf` | 从零写 | 低 | 待做 | — |
| o12 | 按表格批量改文件名 | 按 Excel 映射表批量重命名 | `batch-rename` | [ayoisaiah/f2](https://github.com/ayoisaiah/f2) · MIT | 低 | 待做 | — |
| o13 | 图片批量压缩转格式 | 压缩、转 WebP / JPG，保持清晰 | [image-compressor](https://github.com/campfire-code/image-compressor) | [GoogleChromeLabs/squoosh](https://github.com/GoogleChromeLabs/squoosh) · Apache-2.0 | 低 | 进行中 | — |
| o14 | 证件照换底排版 | AI 证件照，换底色、排版打印 | `id-photo` | [Zeyi-Lin/HivisionIDPhotos](https://github.com/Zeyi-Lin/HivisionIDPhotos) · Apache-2.0 | 低 | 待做 | — |
| o15 | 批量二维码标签 | 带编号的二维码批量生成，排版成可打印 PDF | `batch-qrcode-labels` | [pdfme/pdfme](https://github.com/pdfme/pdfme) · MIT | 低 | 待做 | — |
| o16 | 录音转文字 | 中文识别准，支持说话人区分 | `speech-to-text` | [SYSTRAN/faster-whisper](https://github.com/SYSTRAN/faster-whisper) · MIT | 低 | 待做 | — |
| o17 | 电话录音质检 | 转写后检查话术命中、违禁词 | `call-qa` | [modelscope/FunASR](https://github.com/modelscope/FunASR) · MIT | 低 | 待做 | — |
| o18 | 会议纪要助手 | 本地录音生成纪要和待办 | `meeting-minutes` | [Zackriya-Solutions/meetily](https://github.com/Zackriya-Solutions/meetily) · MIT | 低 | 待做 | — |
| o21 | 截图识字翻译 | 截图 OCR 后用大模型翻译 | `screenshot-translate` | 从零写 | 低 | 待做 | — |

## AI 助手（2）

| 编号 | 工具 | 能做什么 | 仓库 | 基于 | 风险 | 状态 | 安装包 |
|---|---|---|---|---|---|---|---|
| a01 | 网页自动填表 / 采集助手 | 用一句话让 AI 操作浏览器完成重复操作 | `browser-agent` | [browser-use/browser-use](https://github.com/browser-use/browser-use) · MIT | 中 | 待做 | — |
| a04 | Excel AI 助手 | 让 Claude 等 AI 助手直接读写 Excel（MCP） | `excel-mcp` | [haris-musa/excel-mcp-server](https://github.com/haris-musa/excel-mcp-server) · MIT | 低 | 待做 | — |

## 许可证

全部工具归属篝火（GitHub 组织 campfire-code），由篝火维护与更新。我们自己写的工具使用 MIT，版权方为篝火；基于 GPL / AGPL 项目的工具沿用上游协议，以各仓库 LICENSE 为准。标「仅开源」的工具存在封号、违反平台规则或侵权风险，仅供学习研究，使用后果自负。
