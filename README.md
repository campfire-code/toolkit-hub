# 篝火开源工具箱

> 篝火出品 · 全部工具收录于篝火 App 应用区

面向电商运营、微信私域、内容生产、办公提效的开源小工具合集。每个工具是 [campfire-code](https://github.com/campfire-code) 组织下的独立仓库，提供源码与 Windows / macOS 安装包。

- 计划做 127 个，已发布 116 个；另有 15 个后做，见 [docs/backlog.md](docs/backlog.md)
- 总方案：[docs/00-总方案.md](docs/00-总方案.md)
- 本页由 `node scripts/gen-docs.mjs` 根据 `catalog/tools.json` 生成，不要手改

## 电商运营（36）

| 编号 | 工具 | 能做什么 | 仓库 | 基于 | 风险 | 状态 | 安装包 |
|---|---|---|---|---|---|---|---|
| e01 | 1688→拼多多 / 抖店上架数据包 | 抓取 1688 商品，自动映射类目、SKU、运费模板，生成上架数据包；发布走开放平台接口或人工导入 | `1688-to-pdd-listing` | 从零写 | 中 | 待做 | — |
| e02 | Temu 半托管上品表格 | 按 Temu 模板批量生成核价表、属性表 | `temu-listing-sheet` | 从零写 | 低 | 待做 | — |
| e03 | 主图一键白底（批量） | 本地抠图，整个文件夹一次处理 | [bg-remover-batch](https://github.com/campfire-code/bg-remover-batch) | [danielgatis/rembg](https://github.com/danielgatis/rembg) · MIT | 低 | 已发布 | [下载](https://github.com/campfire-code/bg-remover-batch/releases/tag/v0.2.0) |
| e04 | 高清商品抠图 | 发丝、透明件等难抠的商品 | [hd-product-cutout](https://github.com/campfire-code/hd-product-cutout) | [ZhengPeng7/BiRefNet](https://github.com/ZhengPeng7/BiRefNet) · MIT | 低 | 已发布 | [下载](https://github.com/campfire-code/hd-product-cutout/releases/tag/v0.2.0) |
| e05 | 商品短视频去背景 | 视频逐帧去背景 | [video-bg-remover](https://github.com/campfire-code/video-bg-remover) | [danielgatis/rembg](https://github.com/danielgatis/rembg) · MIT | 低 | 已发布 | [下载](https://github.com/campfire-code/video-bg-remover/releases/tag/v0.2.0) |
| e06 | 详情图多语种翻译 | 识别图里的中文，翻译成英 / 泰 / 越文后回填 | [detail-image-translator](https://github.com/campfire-code/detail-image-translator) | [zyddnys/manga-image-translator](https://github.com/zyddnys/manga-image-translator) · GPL-3.0 | 中 | 已发布 | [下载](https://github.com/campfire-code/detail-image-translator/releases/tag/v0.2.0) |
| e07 | 主图多平台尺寸导出 | 一张图按各平台尺寸和大小要求一键导出 | [main-image-resizer](https://github.com/campfire-code/main-image-resizer) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/main-image-resizer/releases/tag/v0.2.0) |
| e08 | SKU 规格图拼图加水印 | 色卡、规格图自动排版加水印 | [sku-image-composer](https://github.com/campfire-code/sku-image-composer) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/sku-image-composer/releases/tag/v0.2.0) |
| e09 | AI 标题卖点批量生成 | Excel 进、Excel 出，可指定平台字数规则 | [ai-title-writer](https://github.com/campfire-code/ai-title-writer) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/ai-title-writer/releases/tag/v0.2.0) |
| e10 | 广告法违禁词检测 | 上架前自检标题、详情、文案里的广告法违禁词，标出风险并给修改建议 | [banned-words-checker](https://github.com/campfire-code/banned-words-checker) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/banned-words-checker/releases/tag/v0.2.0) |
| e11 | 多平台订单利润对账 | 导入各平台账单，扣成本、运费、佣金后算真实利润 | [order-profit-reconciler](https://github.com/campfire-code/order-profit-reconciler) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/order-profit-reconciler/releases/tag/v0.2.0) |
| e12 | 抖店批量改价改库存 | 一张表批量改多个店，走抖店官方接口 | [doudian-batch-price](https://github.com/campfire-code/doudian-batch-price) | [whalesky-labs/doudian-sdk](https://github.com/whalesky-labs/doudian-sdk) · MIT | 中 | 已发布 | [下载](https://github.com/campfire-code/doudian-batch-price/releases/tag/v0.2.0) |
| e13 | 虾皮批量改价改库存 | 走 Shopee 官方接口 | [shopee-batch-price](https://github.com/campfire-code/shopee-batch-price) | [congminh1254/shopee-sdk](https://github.com/congminh1254/shopee-sdk) · MIT | 中 | 已发布 | [下载](https://github.com/campfire-code/shopee-batch-price/releases/tag/v0.2.0) |
| e14 | 亚马逊订单库存导出 | 走亚马逊 SP-API | [amazon-order-export](https://github.com/campfire-code/amazon-order-export) | [saleweaver/python-amazon-sp-api](https://github.com/saleweaver/python-amazon-sp-api) · MIT | 中 | 已发布 | [下载](https://github.com/campfire-code/amazon-order-export/releases/tag/v0.2.0) |
| e15 | TikTok Shop 批量上品 | 走 TikTok Shop 官方接口 | [tiktokshop-listing](https://github.com/campfire-code/tiktokshop-listing) | [EcomPHP/tiktokshop-php](https://github.com/EcomPHP/tiktokshop-php) · Apache-2.0 | 中 | 已发布 | [下载](https://github.com/campfire-code/tiktokshop-listing/releases/tag/v0.2.0) |
| e16 | 东南亚多店调度 | 导入各店订单表和库存表，出多店汇总与 SKU 跨店对照 | [sea-multistore](https://github.com/campfire-code/sea-multistore) | 从零写 | 中 | 已发布 | [下载](https://github.com/campfire-code/sea-multistore/releases/tag/v0.2.0) |
| e17 | 跨境选品报告 | 导入商品表，按利润、需求、竞争、口碑打分排名并出选品报告 | [crossborder-product-research](https://github.com/campfire-code/crossborder-product-research) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/crossborder-product-research/releases/tag/v0.2.0) |
| e18 | 虾皮选品利润计算器 | 按你填的费率，算 Shopee 商品的佣金、物流、毛利、利润率和保本售价，可批量 | [shopee-profit-calculator](https://github.com/campfire-code/shopee-profit-calculator) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/shopee-profit-calculator/releases/tag/v0.2.0) |
| e19 | 亚马逊 ASIN 批量查询 | 批量 ASIN 走亚马逊官方 Creators API 查标题、价格，导出 Excel | [amazon-asin-lookup](https://github.com/campfire-code/amazon-asin-lookup) | 从零写 | 中 | 已发布 | [下载](https://github.com/campfire-code/amazon-asin-lookup/releases/tag/v0.2.0) |
| e20 | 差评归因分析 | 导入评论表格，AI 聚类出问题点和改进建议 | [review-insight](https://github.com/campfire-code/review-insight) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/review-insight/releases/tag/v0.2.0) |
| e21 | 快递异常件看板 | 导入运单表或用快递100 接口，列出停滞件、退回件并导出 | [express-exception-board](https://github.com/campfire-code/express-exception-board) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/express-exception-board/releases/tag/v0.2.0) |
| e22 | 采购单对账 | 油猴脚本：导出淘宝「已买到的宝贝」订单（不含 1688），用来和入库对账 | [purchase-order-export](https://github.com/campfire-code/purchase-order-export) | [Sky-seeker/BuyerOrdersExport](https://github.com/Sky-seeker/BuyerOrdersExport) · MIT | 低 | 已发布 | [下载](https://github.com/campfire-code/purchase-order-export/releases/tag/v2.0.4-campfire.1) |
| e23 | 闲鱼捡漏 / 竞品监控（仅开源） | 关键词监控新上架商品，AI 筛选 | [xianyu-monitor](https://github.com/campfire-code/xianyu-monitor) | [Usagi-org/ai-goofish-monitor](https://github.com/Usagi-org/ai-goofish-monitor) · MIT | 高 | 已发布 | [下载](https://github.com/campfire-code/xianyu-monitor/releases/tag/v2.5-campfire.1) |
| e24 | 闲鱼自动发货（仅开源） | 多账号自动发货、自动回复 | [xianyu-auto-delivery](https://github.com/campfire-code/xianyu-auto-delivery) | [Christ9038/Ydisks-Xianyu-Helper](https://github.com/Christ9038/Ydisks-Xianyu-Helper) · Apache-2.0 | 高 | 已发布 | [下载](https://github.com/campfire-code/xianyu-auto-delivery/releases/tag/v1.0.14-campfire.1) |
| e25 | 多平台 AI 客服（仅开源） | 拼多多 / 千牛 / 抖店客服窗口自动回复 | [ecom-ai-customer-service](https://github.com/campfire-code/ecom-ai-customer-service) | 从零写 | 高 | 已发布 | [下载](https://github.com/campfire-code/ecom-ai-customer-service/releases/tag/v0.1.0) |
| e26 | 直播间自动讲解 + 弹幕回复（仅开源） | 抖店 / 视频号 / 快手直播辅助 | [live-room-assistant](https://github.com/campfire-code/live-room-assistant) | [qiutongxue/oba-live-tool](https://github.com/qiutongxue/oba-live-tool) · MIT（附声明） | 高 | 已发布 | [下载](https://github.com/campfire-code/live-room-assistant/releases/tag/v1.6.3-campfire.1) |
| e27 | 直播弹幕关键词统计（仅开源） | 抓抖音弹幕统计下单意向 | [douyin-danmaku-stats](https://github.com/campfire-code/douyin-danmaku-stats) | 从零写 | 高 | 已发布 | [下载](https://github.com/campfire-code/douyin-danmaku-stats/releases/tag/v0.1.0) |
| e28 | 淘宝 / 京东 / 1688 比价采集（仅开源） | 关键词批量采集价格 | [price-compare-crawler](https://github.com/campfire-code/price-compare-crawler) | 从零写 | 高 | 已发布 | [下载](https://github.com/campfire-code/price-compare-crawler/releases/tag/v0.1.0) |
| e29 | 以图找同款货源（仅开源） | 上传图片在 1688 找同款 | [image-search-1688](https://github.com/campfire-code/image-search-1688) | 从零写 | 高 | 已发布 | [下载](https://github.com/campfire-code/image-search-1688/releases/tag/v0.1.0) |
| e30 | 电商多店 AI 连接器 | 让支持 MCP 的 AI 助手只读查询你自己店铺的订单、售后等数据 | [ecom-mcp-connector](https://github.com/campfire-code/ecom-mcp-connector) | [TonyWang-hub/mcp-cn-commerce](https://github.com/TonyWang-hub/mcp-cn-commerce) · MIT | 中 | 已发布 | [下载](https://github.com/campfire-code/ecom-mcp-connector/releases/tag/v0.1.6-campfire.2) |
| e31 | AI 详情页一键生成 | 输入卖点和商品图，生成整套详情页 | [ai-detail-page](https://github.com/campfire-code/ai-detail-page) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/ai-detail-page/releases/tag/v0.2.0) |
| e32 | 商品主图转短视频 | 多张商品图自动推拉运镜、加转场和标题，合成一条短视频 | [product-image-to-video](https://github.com/campfire-code/product-image-to-video) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/product-image-to-video/releases/tag/v0.2.0) |
| e33 | 一达通报关单填写助手 | 选客户 Excel，自动在阿里一达通填好报关草稿并校验，正式申报留给人工 | [alibaba-customs-filler](https://github.com/campfire-code/alibaba-customs-filler) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/alibaba-customs-filler/releases/tag/v0.1.0) |
| e34 | 外卖经营方法论手册 | 外卖、选址、抖音同城、开店的经营方法论资料包（已脱敏） | `waimai-ops-handbook` | 从零写 | 低 | 待做 | — |
| e35 | 美团点金调价助手 | 按昨日曝光分配每小时推广预算，给出点金出价建议，自动保存默认关闭 | [meituan-bid-pacer](https://github.com/campfire-code/meituan-bid-pacer) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/meituan-bid-pacer/releases/tag/v0.1.0) |
| e36 | 美团门店数据采集（安卓） | 在手机上读取美团商家后台的订单、商品、评价数据存本机，写操作默认关闭 | `meituan-store-collector` | 从零写 | 低 | 待做 | — |

## 微信私域（26）

| 编号 | 工具 | 能做什么 | 仓库 | 基于 | 风险 | 状态 | 安装包 |
|---|---|---|---|---|---|---|---|
| w01 | 公众号一键排版器 | Markdown 转公众号样式，多套主题 | [wechat-md-formatter](https://github.com/campfire-code/wechat-md-formatter) | [doocs/md](https://github.com/doocs/md) · WTFPL | 低 | 已发布 | [下载](https://github.com/campfire-code/wechat-md-formatter/releases/tag/v2.1.0-campfire.2) |
| w02 | AI 写稿直发公众号草稿箱 | 写稿、排版后推到草稿箱，走公众号官方接口 | [wechat-draft-publisher](https://github.com/campfire-code/wechat-draft-publisher) | [caol64/wenyan-mcp](https://github.com/caol64/wenyan-mcp) · Apache-2.0 | 低 | 已发布 | [下载](https://github.com/campfire-code/wechat-draft-publisher/releases/tag/v0.2.0) |
| w03 | 企微群 AI 答疑机器人 | 企业微信群机器人接大模型 + 知识库 | [wecom-group-ai-bot](https://github.com/campfire-code/wecom-group-ai-bot) | [easy-wx/wecom-bot-svr](https://github.com/easy-wx/wecom-bot-svr) · MIT | 低 | 已发布 | [下载](https://github.com/campfire-code/wecom-group-ai-bot/releases/tag/v0.3.4-campfire.1) |
| w04 | 企微 / 公众号 AI 客服 | 多渠道 AI 客服，只启用官方通道 | [wecom-ai-service](https://github.com/campfire-code/wecom-ai-service) | [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) · MIT | 低 | 已发布 | [下载](https://github.com/campfire-code/wecom-ai-service/releases/tag/v2.2.1-campfire.2) |
| w05 | Dify 知识库客服接入器 | 把 Dify 知识库接到企微 | [dify-wecom-connector](https://github.com/campfire-code/dify-wecom-connector) | [hanfangyuan4396/dify-on-wechat](https://github.com/hanfangyuan4396/dify-on-wechat) · MIT | 中 | 已发布 | [下载](https://github.com/campfire-code/dify-wecom-connector/releases/tag/v0.1.26-campfire.1) |
| w06 | 企微客户标签批量整理 | 官方接口拉客户，按规则或 AI 批量打标签 | [wecom-customer-tagger](https://github.com/campfire-code/wecom-customer-tagger) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/wecom-customer-tagger/releases/tag/v0.2.0) |
| w08 | 渠道活码与加粉统计 | 用官方「联系我」接口统计每个渠道的加粉来源 | [wecom-channel-qrcode](https://github.com/campfire-code/wecom-channel-qrcode) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/wecom-channel-qrcode/releases/tag/v0.2.0) |
| w09 | 客户流失预警清单 | 按最后互动时间（导入）或添加时间分级列出沉睡客户，同步对比发现流失 | [wecom-churn-alert](https://github.com/campfire-code/wecom-churn-alert) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/wecom-churn-alert/releases/tag/v0.2.0) |
| w10 | 公众号数据周报 | 官方数据接口，自动出阅读、涨粉图表 | [mp-weekly-report](https://github.com/campfire-code/mp-weekly-report) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/mp-weekly-report/releases/tag/v0.2.0) |
| w11 | 朋友圈文案日更 | 按商品信息和节日日历生成每天的朋友圈文案、配图建议和首评，导出排期表 | [moments-daily-writer](https://github.com/campfire-code/moments-daily-writer) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/moments-daily-writer/releases/tag/v0.2.0) |
| w12 | 私域话术库快捷回复 | 桌面小窗，按场景搜话术一键复制 | [script-quick-reply](https://github.com/campfire-code/script-quick-reply) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/script-quick-reply/releases/tag/v0.3.0) |
| w13 | 聊天截图转客户档案 | 截图 OCR 后抽取需求、预算、意向 | [chat-screenshot-to-crm](https://github.com/campfire-code/chat-screenshot-to-crm) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/chat-screenshot-to-crm/releases/tag/v0.2.0) |
| w14 | 群欢迎语 / 群公告模板 | 模板编辑，输出标准文本 | [group-welcome-templates](https://github.com/campfire-code/script-quick-reply) | 从零写 | 低 | 已并入其他工具 | [下载](https://github.com/campfire-code/script-quick-reply/releases/tag/v0.2.0) |
| w15 | 订单 / 库存告警推到微信 | 读库存表和订单表，异常时推到企微 / 钉钉 / 飞书群 | [wechat-alert-push](https://github.com/campfire-code/wechat-alert-push) | [easychen/wecomchan](https://github.com/easychen/wecomchan) · MIT | 低 | 已发布 | [下载](https://github.com/campfire-code/wechat-alert-push/releases/tag/v0.2.0) |
| w16 | 验证码 / 订单通知转发 | 手机短信和通知转发到企微、钉钉 | [sms-notify-forwarder](https://github.com/campfire-code/sms-notify-forwarder) | 从零写 | 中 | 已发布 | [下载](https://github.com/campfire-code/sms-notify-forwarder/releases/tag/v0.2.0) |
| w17 | 群机器人调试器 | 钉钉、飞书、企微机器人消息统一调试 | [bot-webhook-debugger](https://github.com/campfire-code/bot-webhook-debugger) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/bot-webhook-debugger/releases/tag/v0.2.0) |
| w18 | 小程序订阅消息调试 | 批量配置和测试订阅消息模板 | [mp-subscribe-msg-tester](https://github.com/campfire-code/mp-subscribe-msg-tester) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/mp-subscribe-msg-tester/releases/tag/v0.2.0) |
| w19 | 视频号直播话术生成 | 按商品生成直播讲解稿和互动话术 | [live-script-writer](https://github.com/campfire-code/live-script-writer) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/live-script-writer/releases/tag/v0.2.0) |
| w20 | 手机备份聊天导出（本人数据） | 把自己 iPhone 备份里的微信聊天记录，导出成 HTML、PDF 或文本 | [wechat-backup-exporter](https://github.com/campfire-code/wechat-backup-exporter) | [BlueMatthew/WechatExporter](https://github.com/BlueMatthew/WechatExporter) · GPL-2.0 | 中 | 已发布 | [下载](https://github.com/campfire-code/wechat-backup-exporter/releases/tag/v1.9.5.13-campfire.1) |
| w25 | 批量加好友 / 群发（仅开源） | 微信 4.0 界面自动化 | [wechat-bulk-rpa](https://github.com/campfire-code/wechat-bulk-rpa) | [Hello-Mr-Crab/pywechat](https://github.com/Hello-Mr-Crab/pywechat) · LGPL-2.1 | 高 | 已发布 | [下载](https://github.com/campfire-code/wechat-bulk-rpa/releases/tag/v1.9.8-campfire.1) |
| w26 | 企微群管家（安卓）（仅开源） | 安卓无障碍控制企微做群管理 | [wecom-group-manager-android](https://github.com/campfire-code/wecom-group-manager-android) | [gallonyin/worktool](https://github.com/gallonyin/worktool) · Apache-2.0 | 高 | 已发布 | [下载](https://github.com/campfire-code/wecom-group-manager-android/releases/tag/v2.8.0-campfire.1) |
| w27 | 视频号视频下载（仅开源） | 下载视频号视频 | [channels-video-downloader](https://github.com/campfire-code/channels-video-downloader) | [nobiyou/wx_channel](https://github.com/nobiyou/wx_channel) · MIT | 高 | 已发布 | [下载](https://github.com/campfire-code/channels-video-downloader/releases/tag/v5.7.13-campfire.1) |
| w28 | 机器人多账号管理后台 | 多个机器人账号集中管理 | [bot-hub](https://github.com/campfire-code/bot-hub) | [openilink/openilink-hub](https://github.com/openilink/openilink-hub) · MIT | 中 | 已发布 | [下载](https://github.com/campfire-code/bot-hub/releases/tag/v0.1.36-campfire.2) |
| w29 | 行业答题获客 | 可换题库、可换品牌的手机答题小游戏，答完看段位、领资料、引导加微信 | `quiz-lead-game` | 从零写 | 低 | 待做 | — |
| w30 | 群充值单识别记账 | 识别群里的充值文本和转账截图，登记对账并导出 Excel | [group-recharge-ledger](https://github.com/campfire-code/group-recharge-ledger) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/group-recharge-ledger/releases/tag/v0.1.0) |
| w31 | 个微消息助手（安卓） | 安卓无障碍读取个人微信新消息，按规则提醒与辅助回复（从零重写） | `wechat-message-assistant` | 从零写 | 低 | 待做 | — |

## 内容生产（29）

| 编号 | 工具 | 能做什么 | 仓库 | 基于 | 风险 | 状态 | 安装包 |
|---|---|---|---|---|---|---|---|
| c01 | 主题一键出短视频 | 输入主题，自动写文案、配音、配素材、合成成片 | [topic-to-short-video](https://github.com/campfire-code/topic-to-short-video) | [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) · MIT | 中 | 已发布 | [下载](https://github.com/campfire-code/topic-to-short-video/releases/tag/v1.3.9-campfire.3) |
| c02 | 影视解说一键成片（仅开源） | 解说文案 + 自动剪辑（影视素材版权风险高） | [film-commentary-maker](https://github.com/campfire-code/film-commentary-maker) | [linyqh/NarratoAI](https://github.com/linyqh/NarratoAI) · MIT | 高 | 已发布 | [下载](https://github.com/campfire-code/film-commentary-maker/releases/tag/v0.8.7-campfire.1) |
| c03 | 长视频一键切爆点 | 长视频自动切成多条短视频 | [long-video-clipper](https://github.com/campfire-code/long-video-clipper) | [zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip) · MIT | 中 | 已发布 | [下载](https://github.com/campfire-code/long-video-clipper/releases/tag/v1.5.6-campfire.1) |
| c04 | 剪映草稿批量生成器 | 批量生成剪映草稿，打开剪映即可微调 | [jianying-draft-generator](https://github.com/campfire-code/jianying-draft-generator) | [GuanYixuan/pyJianYingDraft](https://github.com/GuanYixuan/pyJianYingDraft) · Apache-2.0 | 中 | 已发布 | [下载](https://github.com/campfire-code/jianying-draft-generator/releases/tag/v0.2.0) |
| c05 | 批量混剪工厂 | 素材批量混剪出多条视频 | [batch-video-remix](https://github.com/campfire-code/batch-video-remix) | 从零写 | 中 | 已发布 | [下载](https://github.com/campfire-code/batch-video-remix/releases/tag/v0.2.0) |
| c06 | 离线视频转字幕 | 不联网、不用显卡，Mac 和 Windows 都能跑 | [offline-subtitle](https://github.com/campfire-code/offline-subtitle) | [huggingface/transformers.js](https://github.com/huggingface/transformers.js) · Apache-2.0 | 低 | 已发布 | [下载](https://github.com/campfire-code/offline-subtitle/releases/tag/v0.2.0) |
| c08 | 视频出海翻译配音 | 字幕翻译 + 配音一条龙 | [video-translate-dub](https://github.com/campfire-code/video-translate-dub) | [Huanshere/VideoLingo](https://github.com/Huanshere/VideoLingo) · Apache-2.0 | 中 | 已发布 | [下载](https://github.com/campfire-code/video-translate-dub/releases/tag/v3.1.1-campfire.2) |
| c09 | 字幕断句校对翻译 | AI 断句、校对、翻译字幕 | [subtitle-proofreader](https://github.com/campfire-code/subtitle-proofreader) | [WEIFENG2333/VideoCaptioner](https://github.com/WEIFENG2333/VideoCaptioner) · GPL-3.0 | 中 | 已发布 | [下载](https://github.com/campfire-code/subtitle-proofreader/releases/tag/v1.4.2-campfire.2) |
| c10 | 文案转配音 | 离线合成中英混读配音（Kokoro 多音色），导出 MP3 / WAV 和对齐字幕 | [text-to-speech](https://github.com/campfire-code/text-to-speech) | [k2-fsa/sherpa-onnx](https://github.com/k2-fsa/sherpa-onnx) · Apache-2.0 | 中 | 已发布 | [下载](https://github.com/campfire-code/text-to-speech/releases/tag/v0.2.0) |
| c12 | 声音克隆配音（仅开源） | 少量样本克隆声音（需显卡、需本人授权、需加 AI 标识） | [voice-clone](https://github.com/campfire-code/voice-clone) | [RVC-Boss/GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS) · MIT | 高 | 已发布 | [下载](https://github.com/campfire-code/voice-clone/releases/tag/v20250606v2pro-campfire.1) |
| c14 | 自家直播自动录制存档 | 监控直播间状态，开播自动录制，录完可转成 mp4 | [live-recorder](https://github.com/campfire-code/live-recorder) | [ihmily/StreamCap](https://github.com/ihmily/StreamCap) · Apache-2.0 | 中 | 已发布 | [下载](https://github.com/campfire-code/live-recorder/releases/tag/v1.0.3-campfire.1) |
| c15 | 直播边录边切 | 录制同时标记高光并切片 | [live-record-clipper](https://github.com/campfire-code/live-record-clipper) | [Xinrea/bili-shadowreplay](https://github.com/Xinrea/bili-shadowreplay) · MIT | 中 | 已发布 | [下载](https://github.com/campfire-code/live-record-clipper/releases/tag/v2.24.2-campfire.1) |
| c16 | 去硬字幕 / 去水印（仅开源） | 视频去字幕和水印（需显卡，侵权风险） | [subtitle-watermark-remover](https://github.com/campfire-code/subtitle-watermark-remover) | [YaoFANGUK/video-subtitle-remover](https://github.com/YaoFANGUK/video-subtitle-remover) · Apache-2.0 | 高 | 已发布 | [下载](https://github.com/campfire-code/subtitle-watermark-remover/releases/tag/v1.4.0-campfire.1) |
| c17 | 小红书图文卡片生成 | 输入正文自动分页，生成整套小红书图文卡片，导出 1080×1440 PNG | [xhs-card-maker](https://github.com/campfire-code/xhs-card-maker) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/xhs-card-maker/releases/tag/v0.2.0) |
| c18 | 封面工坊 | 公众号、视频封面模板批量出图 | [cover-studio](https://github.com/campfire-code/cover-studio) | [weizwz/cover](https://github.com/weizwz/cover) · MIT | 低 | 已发布 | [下载](https://github.com/campfire-code/cover-studio/releases/tag/v0.2.0) |
| c19 | 全网热点雷达 | 一次看 14 个中文热榜，按关键词高亮命中的热点，可导出 Excel | [trending-radar](https://github.com/campfire-code/trending-radar) | [newsnext/newsnow](https://github.com/newsnext/newsnow) · MIT | 低 | 已发布 | [下载](https://github.com/campfire-code/trending-radar/releases/tag/v0.2.0) |
| c20 | 爆款标题 A/B 生成 | 按平台风格批量出标题并打分 | [title-ab-generator](https://github.com/campfire-code/title-ab-generator) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/title-ab-generator/releases/tag/v0.2.0) |
| c21 | 竞品视频拆解卡 | 粘贴文案或导入字幕，AI 拆成钩子、分镜、话术节奏表 | [video-breakdown](https://github.com/campfire-code/video-breakdown) | 从零写 | 中 | 已发布 | [下载](https://github.com/campfire-code/video-breakdown/releases/tag/v0.2.0) |
| c23 | AI 内容标识器 | 按《人工智能生成合成内容标识办法》一键加显式标识和元数据 | [ai-content-labeler](https://github.com/campfire-code/ai-content-labeler) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/ai-content-labeler/releases/tag/v0.2.0) |
| c24 | 素材库查重 | 扫描图片文件夹，找出完全相同和近似重复的图片，一键移到待删除文件夹 | [asset-dedup](https://github.com/campfire-code/asset-dedup) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/asset-dedup/releases/tag/v0.2.0) |
| c26 | 一键多平台发布（仅开源） | 抖音、视频号、小红书、快手、B 站自动上传 | [social-auto-upload](https://github.com/campfire-code/social-auto-upload) | [dreammis/social-auto-upload](https://github.com/dreammis/social-auto-upload) · MIT | 高 | 已发布 | [下载](https://github.com/campfire-code/social-auto-upload/releases/tag/v1.0.0-campfire.1) |
| c27 | 多平台发布插件 | 浏览器里一键发到多个平台 | [multipost-extension](https://github.com/campfire-code/multipost-extension) | [leaperone/MultiPost-Extension](https://github.com/leaperone/MultiPost-Extension) · Apache-2.0 | 中 | 已发布 | [下载](https://github.com/campfire-code/multipost-extension/releases/tag/v1.5.0-campfire.1) |
| c29 | 全网视频下载器（仅开源） | 各平台视频下载 | [video-downloader](https://github.com/campfire-code/video-downloader) | [yt-dlp/yt-dlp](https://github.com/yt-dlp/yt-dlp) · Unlicense | 高 | 已发布 | [下载](https://github.com/campfire-code/video-downloader/releases/tag/v0.1.0) |
| c30 | 抖音无水印下载（仅开源） | 解析抖音 / TikTok 无水印视频 | [douyin-downloader](https://github.com/campfire-code/douyin-downloader) | [Evil0ctal/Douyin_TikTok_Download_API](https://github.com/Evil0ctal/Douyin_TikTok_Download_API) · Apache-2.0 | 高 | 已发布 | [下载](https://github.com/campfire-code/douyin-downloader/releases/tag/v5.1.7-campfire.1) |
| c31 | 评论情绪与需求分析 | 分析自有账号导出的评论数据 | [comment-insight](https://github.com/campfire-code/comment-insight) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/comment-insight/releases/tag/v0.2.0) |
| c33 | 直播语速告警器 | 直播时实时测说话快慢，太快就响铃提醒，纯本地不录音 | [live-speech-pace](https://github.com/campfire-code/live-speech-pace) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/live-speech-pace/releases/tag/v0.1.0) |
| c34 | 抖音直播复盘分析 | 导出每场直播的话术与每分钟人数，标出留人和掉人的时段 | [douyin-live-review](https://github.com/campfire-code/douyin-live-review) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/douyin-live-review/releases/tag/v0.1.0) |
| c35 | AI 装修效果图 | 上传房间照片，选材质和风格，用自填的图像模型生成装修效果图 | [ai-room-render](https://github.com/campfire-code/ai-room-render) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/ai-room-render/releases/tag/v0.1.0) |
| c36 | 知识星球发帖助手 | 扫码登录知识星球后，一篇篇发图文帖并存档，可 AI 配图 | [zsxq-post-helper](https://github.com/campfire-code/zsxq-post-helper) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/zsxq-post-helper/releases/tag/v0.1.0) |

## 办公提效（26）

| 编号 | 工具 | 能做什么 | 仓库 | 基于 | 风险 | 状态 | 安装包 |
|---|---|---|---|---|---|---|---|
| o01 | 发票批量转报销表 | 电子发票 PDF / OFD 批量读取，导出报销 Excel | `invoice-to-expense` | 从零写 | 低 | 待做 | — |
| o02 | PDF 百宝箱 | PDF 合并、拆分、删页、加水印、转图片，全在本机完成 | [pdf-toolbox](https://github.com/campfire-code/pdf-toolbox) | [Hopding/pdf-lib](https://github.com/Hopding/pdf-lib) · MIT | 低 | 已发布 | [下载](https://github.com/campfire-code/pdf-toolbox/releases/tag/v0.2.0) |
| o04 | 文档转 Markdown | Word、PPT、Excel、PDF 转成 AI 能读的文本 | [doc-to-markdown](https://github.com/campfire-code/doc-to-markdown) | [mwilliamson/mammoth.js](https://github.com/mwilliamson/mammoth.js) · BSD-2-Clause | 低 | 已发布 | [下载](https://github.com/campfire-code/doc-to-markdown/releases/tag/v0.2.0) |
| o05 | 批量图片 OCR | 离线识别，结果导出 Excel / TXT | [batch-ocr](https://github.com/campfire-code/batch-ocr) | [RapidAI/RapidOCR](https://github.com/RapidAI/RapidOCR) · Apache-2.0 | 低 | 已发布 | [下载](https://github.com/campfire-code/batch-ocr/releases/tag/v0.2.0) |
| o06 | 扫描 PDF 可搜索化 | 给扫描件加文字层 | [searchable-pdf](https://github.com/campfire-code/searchable-pdf) | [ocrmypdf/OCRmyPDF](https://github.com/ocrmypdf/OCRmyPDF) · MPL-2.0 | 低 | 已发布 | [下载](https://github.com/campfire-code/searchable-pdf/releases/tag/v17.13.0-campfire.2) |
| o07 | Excel 拆分与合并 | 按列拆成多个文件（如按门店），多表合并 | [excel-split-merge](https://github.com/campfire-code/excel-split-merge) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/excel-split-merge/releases/tag/v0.2.0) |
| o08 | Excel 批量套 Word 模板 | 批量生成合同、证书、通知 | [excel-to-word-batch](https://github.com/campfire-code/excel-to-word-batch) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/excel-to-word-batch/releases/tag/v0.2.0) |
| o10 | 微信 / 支付宝账单对账 | 多份账单合并、分类、汇总 | [bill-reconciler](https://github.com/campfire-code/bill-reconciler) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/bill-reconciler/releases/tag/v0.2.0) |
| o11 | OFD 转 PDF | 国产版式文件转 PDF | [ofd-to-pdf](https://github.com/campfire-code/ofd-to-pdf) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/ofd-to-pdf/releases/tag/v0.2.0) |
| o12 | 按表格批量改文件名 | 按 Excel 映射表批量重命名 | [batch-rename](https://github.com/campfire-code/batch-rename) | [ayoisaiah/f2](https://github.com/ayoisaiah/f2) · MIT | 低 | 已发布 | [下载](https://github.com/campfire-code/batch-rename/releases/tag/v0.2.0) |
| o13 | 图片批量压缩转格式 | 压缩、转 WebP / JPG，保持清晰 | [image-compressor](https://github.com/campfire-code/image-compressor) | [GoogleChromeLabs/squoosh](https://github.com/GoogleChromeLabs/squoosh) · Apache-2.0 | 低 | 已发布 | [下载](https://github.com/campfire-code/image-compressor/releases/tag/v0.2.0) |
| o14 | 证件照换底排版 | AI 证件照，换底色、排版打印 | [id-photo](https://github.com/campfire-code/id-photo) | [Zeyi-Lin/HivisionIDPhotos](https://github.com/Zeyi-Lin/HivisionIDPhotos) · Apache-2.0 | 低 | 已发布 | [下载](https://github.com/campfire-code/id-photo/releases/tag/v0.2.0) |
| o15 | 批量二维码标签 | 带编号的二维码批量生成，排版成可打印 PDF | [batch-qrcode-labels](https://github.com/campfire-code/batch-qrcode-labels) | [soldair/node-qrcode](https://github.com/soldair/node-qrcode) · MIT | 低 | 已发布 | [下载](https://github.com/campfire-code/batch-qrcode-labels/releases/tag/v0.2.0) |
| o16 | 录音转文字 | 本机离线转写录音，导出带时间戳的 TXT / Word / SRT（不区分说话人） | [speech-to-text](https://github.com/campfire-code/speech-to-text) | [huggingface/transformers.js](https://github.com/huggingface/transformers.js) · Apache-2.0 | 低 | 已发布 | [下载](https://github.com/campfire-code/speech-to-text/releases/tag/v0.2.0) |
| o17 | 电话录音质检 | 转写后检查话术命中、违禁词 | [call-qa](https://github.com/campfire-code/call-qa) | [huggingface/transformers.js](https://github.com/huggingface/transformers.js) · Apache-2.0 | 低 | 已发布 | [下载](https://github.com/campfire-code/call-qa/releases/tag/v0.2.0) |
| o18 | 会议纪要助手 | 在自己电脑上录会议、实时转写，再用大模型生成会议摘要与待办 | [meeting-minutes](https://github.com/campfire-code/meeting-minutes) | [Zackriya-Solutions/meetily](https://github.com/Zackriya-Solutions/meetily) · MIT | 低 | 已发布 | [下载](https://github.com/campfire-code/meeting-minutes/releases/tag/v0.4.1-campfire.2) |
| o19 | 语音速记 | 按住快捷键说话，直接出文字 | [voice-typing](https://github.com/campfire-code/voice-typing) | [cjpais/Handy](https://github.com/cjpais/Handy) · MIT | 低 | 已发布 | [下载](https://github.com/campfire-code/voice-typing/releases/tag/v0.9.8-campfire.1) |
| o20 | 音视频转图文 | 录屏、课程转成图文笔记 | [media-to-article](https://github.com/campfire-code/media-to-article) | [hanshuaikang/AI-Media2Doc](https://github.com/hanshuaikang/AI-Media2Doc) · MIT | 低 | 已发布 | [下载](https://github.com/campfire-code/media-to-article/releases/tag/v0.8.0-campfire.2) |
| o21 | 截图识字翻译 | 截图 OCR 后用大模型翻译 | [screenshot-translate](https://github.com/campfire-code/screenshot-translate) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/screenshot-translate/releases/tag/v0.2.0) |
| o22 | PDF 双语翻译（保版式） | 论文、说明书保留排版翻译 | [pdf-bilingual-translate](https://github.com/campfire-code/pdf-bilingual-translate) | [PDFMathTranslate/PDFMathTranslate](https://github.com/PDFMathTranslate/PDFMathTranslate) · AGPL-3.0 | 中 | 已发布 | [下载](https://github.com/campfire-code/pdf-bilingual-translate/releases/tag/v1.9.11-campfire.2) |
| o23 | 本地知识库问答 | 产品手册、话术库本地问答 | [local-knowledge-qa](https://github.com/campfire-code/local-knowledge-qa) | [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) · MIT | 低 | 已发布 | [下载](https://github.com/campfire-code/local-knowledge-qa/releases/tag/v1.18.0-campfire.1) |
| o24 | 小店记账 | 收支记账与报表 | [shop-bookkeeping](https://github.com/campfire-code/shop-bookkeeping) | [mayswind/ezbookkeeping](https://github.com/mayswind/ezbookkeeping) · MIT | 低 | 已发布 | [下载](https://github.com/campfire-code/shop-bookkeeping/releases/tag/v2.1.1-campfire.2) |
| o26 | 无界 | 一套键盘鼠标控制两台电脑（Mac ↔ Mac、Mac ↔ Windows），鼠标推到屏幕边缘即切换，自动同步剪贴板 | [Boundless](https://github.com/campfire-code/Boundless) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/Boundless/releases/tag/v0.2.0) |
| o27 | 主播复盘入表台 | 上传抖音、视频号、快手直播复盘截图，识别关键指标一键写进飞书多维表格 | [live-review-to-feishu](https://github.com/campfire-code/live-review-to-feishu) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/live-review-to-feishu/releases/tag/v0.1.0) |
| o28 | 笔记知识星图 | 导入自己的笔记，生成能点能拖的知识星空图，看清知识之间的联系 | [notes-star-map](https://github.com/campfire-code/notes-star-map) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/notes-star-map/releases/tag/v0.1.0) |
| o29 | 定时任务看板 | 监控本机定时脚本的运行日志与产出文件，30 天运行热力图 | [cron-task-board](https://github.com/campfire-code/cron-task-board) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/cron-task-board/releases/tag/v0.1.0) |

## AI 助手（9）

| 编号 | 工具 | 能做什么 | 仓库 | 基于 | 风险 | 状态 | 安装包 |
|---|---|---|---|---|---|---|---|
| a01 | 网页自动填表 / 采集助手 | 用一句话让 AI 操作浏览器完成重复操作 | [browser-agent](https://github.com/campfire-code/browser-agent) | [browser-use/web-ui](https://github.com/browser-use/web-ui) · MIT | 中 | 已发布 | [下载](https://github.com/campfire-code/browser-agent/releases/tag/v3.0.0-campfire.2) |
| a02 | 后台批量操作机器人 | 自然语言驱动的后台批量操作 | [backend-batch-bot](https://github.com/campfire-code/backend-batch-bot) | [web-infra-dev/midscene](https://github.com/web-infra-dev/midscene) · MIT | 中 | 已发布 | [下载](https://github.com/campfire-code/backend-batch-bot/releases/tag/v1.17.0-campfire.2) |
| a03 | 竞品价格 / 资讯采集器 | 网页转结构化数据，定时采集 | [web-data-collector](https://github.com/campfire-code/web-data-collector) | [unclecode/crawl4ai](https://github.com/unclecode/crawl4ai) · Apache-2.0 | 中 | 已发布 | [下载](https://github.com/campfire-code/web-data-collector/releases/tag/v0.9.5-campfire.2) |
| a04 | Excel AI 助手 | 让 Claude 等 AI 助手直接读写 Excel（MCP） | [excel-mcp](https://github.com/campfire-code/excel-mcp) | [haris-musa/excel-mcp-server](https://github.com/haris-musa/excel-mcp-server) · MIT | 低 | 已发布 | [下载](https://github.com/campfire-code/excel-mcp/releases/tag/v2.2.2-campfire.1) |
| a05 | 浏览器助手（AI 接入教程） | 让 AI 助手控制浏览器 | [browser-mcp](https://github.com/campfire-code/browser-mcp) | [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) · Apache-2.0 | 低 | 已发布 | [下载](https://github.com/campfire-code/browser-mcp/releases/tag/v0.0.83-campfire.1) |
| a07 | AI 编程工具一键安装器 | 双击装好 Claude Code、Codex 等 AI 编程工具，自填接口自动配好，安装报错有引导 | [ai-coding-installer](https://github.com/campfire-code/ai-coding-installer) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/ai-coding-installer/releases/tag/v0.1.0) |
| a08 | 安卓自动化底座 | 装在安卓手机上，电脑配对后远程点击、滑动、截图，每步留日志 | [android-automation-base](https://github.com/campfire-code/android-automation-base) | 从零写 | 低 | 进行中 | — |
| a09 | AI 落地方法论手册 | AI 工具安装、上手与落地方法论资料包（已脱敏） | `ai-adoption-handbook` | 从零写 | 低 | 待做 | — |
| a10 | OKX 合约监控与策略 | 监控 OKX 合约持仓与盈亏，策略默认只给信号不下单，模拟盘与实盘需手动开启 | [okx-contract-monitor](https://github.com/campfire-code/okx-contract-monitor) | 从零写 | 低 | 已发布 | [下载](https://github.com/campfire-code/okx-contract-monitor/releases/tag/v0.1.0) |

## 许可证

全部工具归属篝火（GitHub 组织 campfire-code），由篝火维护与更新。我们自己写的工具使用 MIT，版权方为篝火；基于 GPL / AGPL 项目的工具沿用上游协议，以各仓库 LICENSE 为准。标「仅开源」的工具存在封号、违反平台规则或侵权风险，仅供学习研究，使用后果自负。
